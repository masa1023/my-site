---
title: 'Claude Code で Nano Banana の画像生成を使う — 自前 MCP サーバー + Skill で構築してみた'
description: 'Google の画像生成モデル Nano Banana を Claude Code に組み込み、会話の流れの中で画像を生成できる環境を構築した方法を紹介します。'
date: '2026-03-28'
tags: ['Claude Code', 'Nano Banana', 'MCP', 'AI']
---

Claude Code で作業していると「ここにちょうどいい画像が欲しい」という場面がよくあります。

記事のアイキャッチや SNS 投稿用の画像を作りたいとき、別のツールに切り替えると今の作業コンテキストが途切れてしまい、画像生成ツール側に改めて「こういう記事で、こういう雰囲気の画像が欲しくて……」と説明し直すのが面倒でした。

そこで、Google の画像生成モデル Nano Banana を Claude Code に組み込んでみました。自前の MCP サーバーを FastMCP で書き、Skill と組み合わせることで、会話の流れの中で画像を生成できる環境を構築しています。
完成した MCP サーバーは [GitHub で公開](https://github.com/masa1023/nanobanana-mcp)しています。

たとえばこの記事を書きながら「アイキャッチを作って。コンテキストスイッチングで悩んでいる開発者の before/after 画像で」と伝えたら、こうなりました。

![Before/After アイキャッチ](/images/blog/claude-code-nano-banana-mcp-1.png)

プロンプトは日本語で雑に伝えただけです。Nano Banana に直接プロンプトを書く場合、構図やスタイルを英語で細かく指定しないとイメージ通りの画像は出てきません。Claude Code 経由なら、会話の文脈を汲み取って詳細な英語プロンプトに自動変換してくれるので、生成する画像の品質が格段に上がります。

この記事ではこの構成を選んだ経緯と、実際の構築方法を紹介します。

---

## Nano Banana とは

Nano Banana は Gemini の画像生成機能の名称です。テキストから画像を生成したり、既存の画像を編集したりできます。

現在は以下の 3 モデルが利用可能です。

| モデル                           | 特徴                               |
| -------------------------------- | ---------------------------------- |
| `gemini-2.5-flash-image`         | 高速。普段使い向け                 |
| `gemini-3.1-flash-image-preview` | 4K 対応。高解像度が必要な場面に    |
| `gemini-3-pro-image-preview`     | 高品質。テキスト描画や複雑な構図に |

API は REST で公開されていて、無料枠もあります。[Google AI Studio](https://aistudio.google.com/apikey) でキーを取得すればすぐに使い始められます。

> 参照：[Nano Banana image generation - Google AI for Developers](https://ai.google.dev/gemini-api/docs/image-generation)

---

## 選択肢を比較する

Claude Code から Nano Banana を使う方法を調べたところ、大きく 3 つの選択肢がありました。

![3つの選択肢の比較](/images/blog/claude-code-nano-banana-mcp-2.png)

### 1. サードパーティの MCP サーバー

GitHub には [nanobanana-mcp-server](https://github.com/zhongweili/nanobanana-mcp-server)（Python）や [mcp-image](https://github.com/shinpr/mcp-image)（Node.js）など、すぐに使える MCP サーバーが複数公開されています。`.mcp.json` に数行書くだけで動くので、最も手軽です。

ただ、サードパーティに依存するとアップデートで壊れたり、メンテナンスが止まったりするリスクがあります。Gemini の REST API 自体はシンプルなので、自分で書いても大した量にならないと感じました。

### 2. Gemini CLI の Extensions

Gemini CLI には [Nano Banana Extension](https://github.com/gemini-cli-extensions/nanobanana) が公式で公開されていて、`/generate` コマンドから画像生成ができます。ただし、これは Gemini CLI の世界で完結する機能です。Claude Code の MCP として使える公式サーバーは提供されておらず、サードパーティの [mcp-gemini-cli](https://github.com/choplin/mcp-gemini-cli) などを経由する必要があります。

### 3. 自前 MCP サーバー + Skill

MCP サーバーを自分で書き、Skill はプロンプト最適化やパラメータ判断だけを担当する構成です。

**選んだのは 3 です。** サードパーティに依存せず自分でコントロールでき、Claude Code の MCP ツールとして動くので Gemini CLI を経由する必要もありません。Gemini の API は `urllib` だけで叩けるシンプルさなので、自前で書くコストも十分低いと判断しました。

---

## 全体の構成

以下のような構成になっています。

![全体のアーキテクチャ](/images/blog/claude-code-nano-banana-mcp-3.png)

ポイントは MCP サーバーと Skill の役割を分けているところです。

- **MCP サーバー** は Gemini API の薄いラッパー。`generate_image` と `edit_image` の 2 ツールを提供する
- **Skill** は「画像生成して」「アイキャッチ作って」で発動し、日本語プロンプトの英語変換やパラメータの自動選択を担当する

```
[別リポジトリ] ~/code/mcp-servers/nanobanana/
├── server.py            # FastMCP MCP サーバー（Gemini API を直接呼び出し）
├── .env                 # GEMINI_API_KEY
└── pyproject.toml       # uv プロジェクト（依存: fastmcp のみ）

[メインリポジトリ]
├── .mcp.json            # MCP サーバーの登録
├── .claude/skills/image-gen/
│   └── SKILL.md         # プロンプト最適化 + パラメータ判断
└── nanobanana-output/   # 生成画像の出力先
```

MCP サーバーは汎用的に保ち、Skill 側で業務固有のロジックを吸収する設計です。

---

## MCP サーバーの実装

FastMCP を使っています。依存パッケージは `fastmcp` のみ。Gemini API の呼び出しは標準ライブラリの `urllib` で行っているので、外部 HTTP ライブラリも不要です。

画像生成ツールの定義はこのような形になります。

```python
from fastmcp import FastMCP
from fastmcp.utilities.types import Image

mcp = FastMCP("nanobanana")

@mcp.tool
def generate_image(
    prompt: str,
    suffix: str = "generated",
    aspect_ratio: str = "1:1",
    size: str = "1K",
    model: str = "gemini-2.5-flash-image",
    output_dir: str = "nanobanana-output",
) -> Image:
    """テキストプロンプトから画像を生成する."""
    image_bytes, _ = _call_gemini(prompt, model, aspect_ratio, size)
    _save_image(image_bytes, output_dir, suffix=suffix)
    return Image(data=image_bytes, format="png")
```

### MCP サーバーの登録

`.mcp.json` に以下を追加します。`uv run` で起動するので、仮想環境を手動で管理する必要はありません。

```json
{
  "mcpServers": {
    "nanobanana": {
      "command": "uv",
      "args": [
        "run",
        "--directory",
        "/path/to/nanobanana",
        "python",
        "server.py"
      ]
    }
  }
}
```

---

## Skill の実装

SKILL.md のフロントマターはこのような内容です。

```yaml
---
name: image-gen
description: Nano Bananaで画像を生成・編集する。「画像生成して」「画像作って」「アイキャッチ作って」で発動。
---
```

Skill の本体には、用途ごとのパラメータ選択テーブルやプロンプト変換のガイドラインを記述しています。

冒頭の画像も、この Skill 経由で生成したものです。日本語で指示を出すだけで、Skill が英語プロンプトへの変換、アスペクト比や解像度の選択、MCP ツールの呼び出しまでを自動で行います。

---

## いざ実演

実際の動作を見てみます。この記事で使用している比較図と概要図を生成したときの様子です。

プロンプトは日本語で雑に指示を出しているだけですが、Skill が文脈を汲み取って英語の詳細なプロンプトに変換し、アスペクト比やモデルも自動で選択しています。

![Skill 実行の様子 1](/images/blog/claude-code-nano-banana-mcp-4.png)

![Skill 実行の様子 2](/images/blog/claude-code-nano-banana-mcp-5.png)

生成された画像はファイルとして保存され、記事への挿入まで Claude Code が行ってくれました。

---

## まとめ

この記事では、Nano Banana の画像生成を Claude Code に組み込む方法を紹介しました。自前の MCP サーバーを FastMCP で書き、Skill でプロンプト最適化を担当させる構成です。

ちなみに、今回の MCP サーバーも Skill も、Claude Code との対話の中で作っています。MCP サーバーは「Nano Banana で画像生成する MCP を作りたい」と伝えるところから始まり、API の調査、コードの実装、デバッグまですべて会話ベースで進めました。Skill は skill-creator スキルを使って、テストケースの作成や description の最適化まで含めて構築しています。

自分でゼロからコードを書く場面はほとんどなく、方針を決めてフィードバックを返すのが主な作業でした。REST API を叩ける程度の知識があれば、どんな外部サービスでも MCP ツールとして Claude Code に統合できると思います。

今回作った MCP サーバーは GitHub で公開しているので、よろしければご活用ください。

[https://github.com/masa1023/nanobanana-mcp](https://github.com/masa1023/nanobanana-mcp)

既存の MCP サーバーを活用しつつ、足りないものは自分で作ってどんどん Claude Code を便利にしていきましょうー！
