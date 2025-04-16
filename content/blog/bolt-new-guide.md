---
title: 'フルスタック AI 開発エージェント Bolt.new でモダンな個人ブログを爆速構築'
description: 'フルスタック AI 開発エージェントとして再注目のBolt.newで、Next.jsのブログサイトを作成し、Cloudflare Pagesにデプロイするまでの流れを解説するハンズオン。'
date: '2025-04-16'
tags: ['Bolt.new', 'AI Agents', 'Next.js', 'Cloudflare']
---

# フルスタック AI 開発エージェント Bolt.new でモダンな個人ブログを爆速構築

プロンプトをもとにアプリケーションのコードベースをゼロから生成してくれる AI 開発エージェントが注目を集めています。

中でも StackBlitz 社が提供する Bolt.new はフルスタックの AI 開発エージェントとして人気が高まっており、数々の導入事例が報告されています。

今回はその Bolt.new を利用して個人サイト(このサイト)を作成したので、その手順をステップバイステップで解説します。

個人サイト：[https://masa373.work](https://masa373.work)

## Bolt.new について

### Bolt.new とは？

Bolt.new は、Web/モバイルアプリのコードベースをゼロから作成してくれるフルスタック AI 開発エージェントです。

![Image](/images/blog/bolt-new-guide-1.png)

[https://bolt.new](https://bolt.new)

自然言語による指示だけで、フロントエンドからバックエンドまで含めたフルスタックの Web アプリケーションを短時間で構築できます。

また、Bolt.new のブラウザ上で作成中の Web アプリを起動することもできます。  
一発で思い通りのアウトプットを得るのは難しくエラーも発生するので、ブラウザ上で Bolt.new の AI にデザイン修正やデバッグをしてもらえるのは大きなメリットです。

### 類似サービスとの比較

アプリケーションの生成ツールは Bolt.new の他にもあります。  
Gemini Deep Research で比較表を作成したのでよろしければご活用ください。

![Image](/images/blog/bolt-new-guide-2.png)
_Gemini Deep Research より作成。最新情報は各公式サイトをご参照ください。_

そしてこの記事を書いている間に Google が Firebase Studio を発表しましたね。

[https://firebase.studio/](https://firebase.studio/)

ついに Big Tech 参戦ということで触ってみましたが、UI がいかにも Google(Material UI)という感じでまだ実戦投入は難しいかなという印象でした。  
良い感じに作れたという方がいればぜひ教えてください！

しかし Google さんのことなので急速に改善していくでしょう。  
今後の Firebase Studio のアップデートは要チェックです。

## 今回のアジェンダ

いよいよ本題です。以下の流れで進めていきます。

- ChatGPT でプロンプトを作成
- プロンプトをもとに Bolt.new でコード生成、修正
- コードをダウンロードしてローカル環境で動かす
- Cloudflare Pages にデプロイ
- ドメインの設定

## Bolt.new 用のプロンプトを作成

Bolt.new は無料プランだと 150,000 トークン / 日の利用制限があるため、雑に依頼してしまうと修正を重ねていくうちにすぐに制限に引っかかってしまいます。  
\*月の上限は 1,000,000 トークン

そのためまず Bolt.new に投げるプロンプトを ChatGPT や Claude などで作成するのがおすすめです。  
意図通りのプロンプトになるように、ここで繰り返し修正するのが重要です。  
またこのプロセスで仕様周りの抜け漏れもかなり防げます。

最終的に私は以下の内容で ChatGPT にプロンプトを作ってもらいました。

**プロンプト作成依頼**

```
以下の内容でブログサイトを作成したい。
そのための英文プロンプトを作成してください。

[条件]
- 抜け漏れがあった場合は補足してください
- 作成したプロンプトをワンクリックでコピーできるように出力してください

---

# Tech stack:
- Framework: Next.js, React, TypeScript
- UI: shadcn/ui, Tailwind, Markdoc
- Test: Vitest, React Testing Library, Happy DOM
- Linter: ESLint
- Formatter: Prettier
- Package manager: pnpm
- Other tools: sonner, zod
- Server: Cloudflare Pages

# Requirements:
- 画像はpublicディレクトリで管理
- 見た目はモダンな感じ
- packageは最新のものを利用
- アイコンはlucide-react
- ブランドロゴはFont Awesome
- レスポンシブ対応
- SEO対応
- README.mdを英語で作成 (プロジェクトの概要、インストール手順、使用方法、利用技術を含む)

# Features:
- Blog list (top page)
- Blog detail page
- Author profile section on the top page
- Markdown rendering with Markdoc
- Custom components for Markdoc (like callout, alert, code block)
- Code block syntax highlighting for Markdoc using shiki
- Dark mode toggle (light/dark)
```

**作成されたプロンプト**

```
You are an expert Next.js developer.

Please build a modern, responsive blog site based on the following specifications.

## Tech Stack
- Framework: Next.js, React, TypeScript
- UI Library: shadcn/ui, Tailwind CSS, Markdoc
- Testing: Vitest, React Testing Library, Happy DOM
- Linter: ESLint
- Formatter: Prettier
- Package Manager: pnpm
- Utilities: sonner, zod
- Hosting: Cloudflare Pages
- Icons: lucide-react
- Brand Logo: Font Awesome
- Syntax Highlighting: shiki for Markdoc code blocks

## Requirements
- Store all images in the `/public` directory.
- Modern and stylish UI design.
- Always use the latest stable versions of all packages.
- Responsive design for desktop and mobile.
- Implement SEO best practices (meta tags, Open Graph, structured data, etc.).
- Use lucide-react for icons.
- Use Font Awesome for the brand logo.
- Provide a toggle for light/dark mode.
- Optimize the project for deployment on Cloudflare Pages.

## Features
- Blog list page (Top page)
- Blog detail page
- Author profile section on the top page
- Markdown rendering with Markdoc
- Custom Markdoc components such as:
  - Callout
  - Alert
  - Code block
- Syntax highlighting for code blocks using shiki
- Responsive layout across all pages
- Clean and maintainable code structure

## Deliverables
- All source code
- `README.md` written in English, including:
  - Project Overview
  - Installation Steps
  - Usage Instructions
  - Tech Stack Description

## Notes
- Follow best practices for performance, accessibility, and SEO.
- Ensure proper folder structure and file naming conventions.
- Use pnpm as the package manager.
- Prepare the project ready for deployment on Cloudflare Pages.
```

## Bolt.new で開発

上記プロンプトを Bolt.new に投げ、コードを生成してもらいます。

![Image](/images/blog/bolt-new-guide-3.png)

一撃でこのクオリティ。すごい...

生成したコードのプレビューや要素の Inspect 、プロンプトによる修正依頼もできるので簡単な修正ならブラウザ上で完結します。  
エラーが出る場合は、Fix ボタンが画面左に表示されるので、ポチポチ押していくだけでだいたいのエラーは解消できます。

![Image](/images/blog/bolt-new-guide-4.png)

バグが解消でき、デザインも問題なければ画面右上からソースコードをダウンロードします。

## ローカル環境で起動

ダウンロードしたコードをローカル環境で起動し、ダミーデータを修正していきます。  
コマンドも一通り走らせてみて test, linter, formatter, build 等が通るかも確認しておきます。

## デプロイ

### Deep Research で技術選定

余談ですがこのサーバーの選定も LLM にサポートしてもらいました。

![Image](/images/blog/bolt-new-guide-5.png)

ツールやライブラリ、サービスの機能や価格の比較のために、各公式ページにアクセスして必要な情報を集めるのって結構な手間なんですよね。  
LLM が比較テーブルを作ってくれることで、同じ尺度で比較ができますし、比較軸の抜け漏れも一定減らせます。

もちろん情報が正しくなかったり古かったりする可能性も大いにあるのでダブルチェックは必須ですが、一から調べる大変さに比べたら全体像の事前インプットがあるだけでだいぶ負荷が軽減されます。

### Cloudflare を使う

今回は Next.js の [Static Exports](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports) を使って静的ファイルをビルドするのでホスティングサーバーが利用できます。  
S3 や Vercel などいくつか選択肢はありますが、今回は技術検証も兼ねて無料枠でも十分な機能を備えている [Cloudflare Pages](https://pages.cloudflare.com) を使ってみます。

![Image](/images/blog/bolt-new-guide-6.png)

以下の流れで進めます。

1. GitHub のリポジトリに Push
1. Cloudflare Pages でプロジェクト作成、GitHub 連携
1. ドメインレジストラでネームサーバーを変更
1. ドメインを Cloudflare Pages のプロジェクトと紐づける

### GitHub のリポジトリに Push

パブリックもしくはプライベートリポジトリにプロジェクトを Push します。  
私はパブリックリポジトリにしました。

[https://github.com/masa1023/my-site](https://github.com/masa1023/my-site)

### Cloudflare Pages でプロジェクト作成、GitHub と連携

Cloudflare Pages でプロジェクトを作成します。  
Next.js の Static Exports 版の設定方法については Cloudflare の公式ドキュメントで詳しく解説されているので、これに従って進めれば OK です。

[https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/)

この手順に従って進めれば GitHub と連携されるので、以降は main ブランチに Push するだけで自動でビルドが走り本番デプロイが完了します。

このあたりの開発体験の素晴らしさは本家 Vercel に匹敵するものでした！

### ドメイン周りの設定

ここは本記事のメインテーマから外れるので割愛します。  
基本的に Cloudflare のダッシュボード上のチュートリアルに従ってポチポチ操作を進めていけば大丈夫かと思います。

こちらの記事ではかなり丁寧に Cloudflare でのドメイン設定について説明されていますので、必要に応じてご参照ください。

[https://uhiyama-lab.com/blog/webdev/nextjs-cloudflare-custom-domain/](https://uhiyama-lab.com/blog/webdev/nextjs-cloudflare-custom-domain/)

## 実装してみた感想と学び

Bolt.new を使ってブログサイトを構築してみて、特に印象的だった点は以下の通りです。

### 良かった点

1. **圧倒的な開発速度**: 要件が明確であれば通常なら数日かかる実装がわずか数分で完了
1. **統合開発環境**: ブラウザ上でシームレスに Web アプリの起動、修正が簡単に行える
1. **コード、デザインの品質**: プロンプトの内容の再現度が高く、コードと UI の品質が高い
1. **価格**: 小規模プロジェクトかつプロンプトを作り込めば無料枠でも十分利用可能

### 課題点

1. **細かいカスタマイズ**: 一部プロンプト通りにコードが生成されないことがある
1. **バグ、スタイル崩れ**: 最初の指示だけで完璧なシステムを作るのは難しい。初回生成時はだいたいバグやスタイル崩れがある
1. **修正の手間**: ブラウザ上でバグやデザインの修正を繰り返すとすぐにトークン制限に到達。非エンジニアが GUI で全て修正するのは難しい。

## まとめ

総じて Bolt.new も Cloudflare も素晴らしい開発体験でした！  
おかげで数時間でサイト構築から本番デプロイまで完了することができました。

自分が使用する技術スタックに精通しているという前提で、今後プロジェクトの立ち上げ時はこういったフルスタック AI エージェントでベースを作成するというのが主流になりそうです！  
そして以降の開発は GitHub Copilot や Cline、Cursor などのエディタ統合型エージェントを使っていくと。

![Image](/images/blog/bolt-new-guide-7.png)
_ディストピア感のある画像が生成された_

まだまだ荒削りな部分はありますが、競争が激化している領域なので、あっという間に改善されていくでしょう。

またこういったツール自体の開発にも AI がフル活用されているはずなので、今後ますます開発スピードは加速していくと思われます。  
この自己再生産による進化のインフレ、シンギュラリティっぽい！

Google も Firebase Studio で参戦してきたりと、今後もこの開発の自動化領域からは目が離せないですね！

## 参考リソース

- [今回作成した個人サイト](https://github.com/masa1023/my-site)
- [Bolt.new 公式サイト](https://bolt.new)
- [Cloudflare 公式サイト - Next.js アプリのデプロイ方法](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/)
- [Next.js 公式サイト - Static Exports](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports)
- [Firebase Studio 公式サイト](https://firebase.studio/)
