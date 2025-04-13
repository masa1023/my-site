---
title: 'GitHub の MCP Server を Go で構築する'
description: 'Anthropic 発の MCP が急速に注目を集めています。本記事では、GitHub の MCP Server を Go で構築し、Claudeから呼びたすところまで解説しています。'
date: '2025-04-12'
tags: ['MCP', 'Go', 'Claude']
---

# GitHub の MCP Server を Go で構築する

AI 開発が進む中で、LLM と様々なデータソース・ツールを連携させる標準的な方法が求められています。  
そんな中、Claude を開発する Anthropic 発の MCP (Model Context Protocol) が急速に注目を集めています。

新しい技術をキャッチアップするには手を動かしてみるのが一番！  
ということで本記事では、GitHub 公式の GitHub MCP Server を Go で構築する方法を解説します。

## MCP とは？

MCP は、アプリケーションが LLM にコンテキストを提供するためのプロトコルです。  
USB-C が様々なデバイスを接続する標準規格であるように、「MCP は AI 開発における USB-C ポート」と例えられることもあります。

### MCP のアーキテクチャ

MCP は次の主要コンポーネントで構成されています：

![Image](/images/blog/github-mcp-server-5.png)
(_引用：_[_https://modelcontextprotocol.io/introduction_](https://modelcontextprotocol.io/introduction))

- **MCP Host** - MCP を通じてデータにアクセスするプログラム (Claude や VS Code など)
- **MCP Server** - 特定の機能を MCP を通じて提供するプログラム
- **Data Source** - ローカルのファイル、データベース、API など、MCP Server がアクセスするリソース

その他の詳細については、MCP 公式ドキュメントを参照してください。
[https://modelcontextprotocol.io/introduction](https://modelcontextprotocol.io/introduction)

## 今回のアーキテクチャ

日本時間 4 月 5 日に、本家 GitHub が Go 製の GitHub MCP Server をオープンソースで公開しました！

- [GitHub MCP Server リポジトリ](https://github.com/github/github-mcp-server)
- [GitHub の X ポスト](https://x.com/github/status/1908252589424337278)
- [リリースノート](https://github.blog/changelog/2025-04-04-github-mcp-server-public-preview/)

この記事では、そのリリースされたばかりの GitHub MCP Server を Claude Desktop から利用します。

つまり

- MCP Host - Claude Desktop
- MCP Server - GitHub MCP Server
- Data Source - GitHub API

という構成になります。

![Image](/images/blog/github-mcp-server-4.png)

## Go の環境構築

[README](https://github.com/github/github-mcp-server) にある通り Docker で動かせますが、新しいマシンで Go の環境構築もしておきたかったので、今回は macOS で進めます。

### Go のインストール（macOS）

Homebrew で Go をインストールします。

```bash
brew install go
```

インストールとバージョンを確認。

```bash
which go
# -> /opt/homebrew/bin/go
go version
# -> go version go1.24.2 darwin/arm64
```

### Go の環境設定

ワークスペースを作成。

```bash
mkdir -p ./go/{bin,pkg,src}
cd ./go/src
```

環境変数を設定し、パスを通す。

```bash
# ~/.zshrc など
export GOPATH=$HOME/go
export PATH=$PATH:$GOPATH/bin
```

設定を反映。

```bash
source ~/.zshrc
```

これで Go の開発環境が整いました。  
次に GitHub MCP Server を構築していきましょう。

## GitHub MCP Server のセットアップ

### 準備

GitHub のアクセストークンが必要となるので、[README](https://github.com/github/github-mcp-server?tab=readme-ov-file#prerequisites) を参考に作成しておいてください。

### リポジトリのクローン

まずは GitHub が公開している MCP Server の[リポジトリ](https://github.com/github/github-mcp-server)をクローンします：

```bash
# リポジトリをクローン
cd ./go/src
git clone git@github.com:github/github-mcp-server.git
cd github-mcp-server
```

### ビルド

ソースをビルドします。
カレントディレクトリに `github-mcp-server` というバイナリが生成されます。

```bash
go build ./cmd/github-mcp-server
```

### サーバーを起動

バイナリを実行して MCP Server が正常に起動するか確認しておきます。  
サーバーは Claude Desktop が自動で起動するので停止しておいてください。

```bash
export GITHUB_PERSONAL_ACCESS_TOKEN="YOUR_GITHUB_PERSONAL_ACCESS_TOKEN"
./github-mcp-server stdio
# -> GitHub MCP Server running on stdio
```

これでローカルマシンで MCP Server が起動できるようになりました！

## Claude Desktop での MCP Server の設定

VS Code や Cline など MCP に対応した MCP Host はいくつかありますが、今回は MCP の生みの親である Anthropic が開発する Claude Desktop (以下 Claude) を利用します。

### Claude のインストール

Web 版は MCP に対応していないので、こちらから Claude のデスクトップアプリをインストールしてください。

[https://claude.ai/download](https://claude.ai/download)

### MCP Server の設定方法

ログインが完了したら、Claude のアプリ選択中に表示されるメニューから Settings > Developer > Edit Config を選択してください。

![Image](/images/blog/github-mcp-server-1.png)

設定ファイル `claude_desktop_config.json` を任意のエディタで開いたら、以下の設定を追加してください。

```json
{
  "mcpServers": {
    "github": {
      "command": "/Users/your-name/go/src/github-mcp-server/github-mcp-server",
      "args": ["stdio"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_GITHUB_PERSONAL_ACCESS_TOKEN"
      }
    }
  }
}
```

設定が完了したら、変更を反映するためにアプリを再起動してください。

### GitHub MCP Server の利用方法

設定が正しくできていれば、チャット入力欄にハンマーアイコンが表示されているはずです。  
横の数字は利用可能な機能 (Tool) の数です。  
クリックすると Tool の一覧が表示されます。

![Image](/images/blog/github-mcp-server-2.png)

あとはいつも通り Claude に話しかけると、依頼内容に応じて Claude が MCP Server 経由で GitHub にアクセスし、必要な情報を取ってきてくれたり、処理を実行してくれたりします。

たとえば「指定したリポジトリに Issue 作って」とお願いするとこの通り。

![Image](/images/blog/github-mcp-server-3.png)

他にも

- リポジトリの最近のコミット履歴を表示して
- リポジトリの Issue 一覧を取得して

など GitHub API が提供している機能は、ほとんどチャットインターフェースで実行できちゃいます。

自然言語をもとによしなに処理を実行する様子は、やはり何度見てもワクワクしますし、一気にエージェント感が増しますね！

## MCP の将来性

MCP が広まることで以下のような変化が起きそうだなと考えています。

- 標準規格化によりデベロッパー体験が改善され、MCP Server の開発が加速する
- LLM でできることが飛躍的に増え、それを利用する一般ユーザーも増えていく
- アプリや Web ブラウザの接触時間が減り、LLM アプリが主要なユーザーインターフェースになっていく

レイテンシーが改善されれば、音声がメインになるかも？  
いずれにしても今後が楽しみです！

## 次のステップ

今回は MCP Server 自体は実装していないので、今度はそちらも紹介してみたいと思います。

ちなみに、LLM をフル活用して MCP Server を実装するベストプラクティスも確立してきているようです。

[https://modelcontextprotocol.io/tutorials/building-mcp-with-llms](https://modelcontextprotocol.io/tutorials/building-mcp-with-llms)

上記ドキュメントを参考にワンプロンプトで生成した Google Calendar の MCP Server がこちら。

[https://github.com/masa1023/google-calendar-mcp-server](https://github.com/masa1023/google-calendar-mcp-server)

紹介されていた LLM に与えるコンテキストのクオリティが素晴らしく、一撃でかなり精度高くコードが生成されました。  
プロンプトエンジニアリング恐るべし。

雰囲気だけ掴みたい方は、以下の動画を指定時間から 2 分ほど視聴してみてください。

[https://youtu.be/v_6EXt6T83I?si=1ew0RdtCiLTbS0p4&t=957](https://youtu.be/v_6EXt6T83I?si=1ew0RdtCiLTbS0p4&t=957)

このように実装方法に型がもたらされたことで、LLM による実装がしやすくなったというのも MCP の大きなメリットですね。

## まとめ

この記事では、GitHub の MCP Server を Go で構築する方法を解説しました。  
MCP の基本概念から始まり、Go の開発環境の構築、MCP Server のセットアップ、Claude での設定方法まで一連のプロセスを紹介しました。

自分が実装した MCP Server が世界中の人に使われる可能性があるのも、このアーリーフェーズの醍醐味だと思います。

既存の MCP Server を活用しつつ、足りないものは自分で作ってもっと LLM を便利にしていきましょうー！

## 参考リソース

- [GitHub MCP Server リポジトリ](https://github.com/github/github-mcp-server)
- [Go 公式サイト](https://golang.org/)
- [Model Context Protocol 公式サイト](https://modelcontextprotocol.io/introduction)
- [Claude Desktop の設定](https://modelcontextprotocol.io/quickstart/user)
- [LLM で MCP 実装を実装するベストプラクティス](https://modelcontextprotocol.io/tutorials/building-mcp-with-llms)
- [LLM で MCP 実装するデモ動画](https://youtu.be/v_6EXt6T83I?si=1ew0RdtCiLTbS0p4&t=957)
