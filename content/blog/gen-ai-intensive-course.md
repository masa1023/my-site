---
title: '参加レポート: 5-Day Gen AI Intensive Course with Google'
description: 'Exploring how ScholarAgent uses Generative AI, RAG, and LangGraph to make complex machine learning research papers more accessible and interactive for learners.'
date: '2025-04-22'
tags: ['Generative AI', 'AI Agents', 'RAG']
---

2025年3月31日から4月4日まで開催された Google 主催の 5-Day Gen AI Intensive Course with Google に参加してきました！

コースを通して生成 AI の最前線とその活用について、大きな学びを得ることができました。

本記事では、5日間のコースを日ごとに振り返りながら、そこで得た学びについてまとめたいと思います。

読者の皆さまの次回の参加に繋がったり AI に興味を持つきっかけになれば幸いです！

## 「5-Day Gen AI Intensive Course with Google」とは？

![Image](/images/blog/gen-ai-intensive-course-1.png)

[5-Day Gen AI Intensive Course with Google](https://www.kaggle.com/learn-guide/5-day-genai) とは、Google 主催の生成 AI に特化した 5 日間の短期集中オンライン講義です。

今回は世界中から約 25 万人が参加したとのことです！すごい！

### コースの特徴

- AI 領域の第一線で活躍する Google の機械学習エンジニア・研究者がコンテンツを作成・監修
- Google の社員 10 名弱がその日のテーマについてディスカッションしたり質問にこたえる YouTube LIVE が 5 日間毎日開催
- 期間中 Discord で Google 社員や、他の参加者とコミュニケーションが可能
- Capstone Project と呼ばれる総仕上げプロジェクトに取り組めば Kaggle バッジと修了証がもらえる

### 一日の流れ

1. 5 日間毎日、特定のテーマについて解説した 50 ページ以上の Whitepaper(PDF)が届く
1. PDF を元に NotebookLM で作成された Podcast(約 30 分)を YouTube 上で聴きながら Whitepaper を読む
1. その日のテーマの実践として Kaggle Notebook でドキュメントを読みつつコードを実行
1. 日本時間深夜 3 時頃に YouTube LIVE 開始。翌朝アーカイブを視聴(約 1 時間)

### 取り組んでみての感想

一日の PDF のボリュームがかなりあり、PDF と Notebook が複数ある日もあったので仕事と並行して進めるのはなかなか大変でした。しかも全コンテンツ英語！

内容についても「LLM の基礎的な仕組みとプロンプトエンジニアリングの応用を学ぶくらいでしょ？」と思っていたら、プログラミングや機械学習の基礎知識を前提にしたかなり技術に踏み込んだコンテンツがほとんどでした。

英語 + 新しい技術領域なので初日にどっと疲れ、これは三日坊主コースかもと思いましたが、最先端の領域を学んでいくうちにどんどん楽しくなってきて、気がつけば 5 日間のコースを完走していました！

特に YouTube LIVE を通して、AI プロダクトの開発に第一線で携わっている Google 社員のセッションに参加できたのは刺激的でした！

![Image](/images/blog/gen-ai-intensive-course-2.png)
_(YouTube LIVE の様子)_

ラフに自宅から参加されている方が多かったので、Zoom ミーティングにお邪魔しているような感覚に近く、オンラインとはいえ現場の臨場感を味わうことができました。

それでは、以下に 5 日間で学んだ内容についてざっくりまとめます。  
利用した教材のほとんどがオンラインで公開されており、誰でも閲覧可能なので、それらのリソースへのリンクも一緒にまとめていきます。

## Day 1: LLM の基礎とプロンプトエンジニアリング

### 学習リソース

- Whitepaper:
  - [https://www.kaggle.com/whitepaper-foundational-llm-and-text-generation](https://www.kaggle.com/whitepaper-foundational-llm-and-text-generation)
  - [https://www.kaggle.com/whitepaper-prompt-engineering](https://www.kaggle.com/whitepaper-prompt-engineering)
- Podcast:
  - [https://www.youtube.com/watch?v=Na3O4Pkbp-U](https://www.youtube.com/watch?v=Na3O4Pkbp-U)
  - [https://www.youtube.com/watch?v=CFtX0ZyLSAY](https://www.youtube.com/watch?v=CFtX0ZyLSAY)
- Kaggle Notebook:
  - [https://www.kaggle.com/code/markishere/day-1-prompting](https://www.kaggle.com/code/markishere/day-1-prompting)
  - [https://www.kaggle.com/code/markishere/day-1-evaluation-and-structured-output](https://www.kaggle.com/code/markishere/day-1-evaluation-and-structured-output)
- YouTube Live: [https://www.youtube.com/watch?v=WpIfAeCIFc0](https://www.youtube.com/watch?v=WpIfAeCIFc0)

### 大規模言語モデル（LLM）

初日は LLM の基礎概念と使用されている技術の解説から始まりました。

LLM の中核技術である **Transformer アーキテクチャ** や **Attention** の仕組み、データの入力処理（トークン化、埋め込み、位置エンコーディングなど）、およびその進化の歴史（GPT、BERT、Gemini など多様なモデルファミリー） についての詳細な解説がありました。

Whitepaper では、モデルの **ファインチューニング手法**（SFT、RLHF、PEFT など） や、**プロンプトエンジニアリング**、サンプリング技術 についても説明がありました。

また、推論の **高速化技術**（量子化、投機的デコーディングなど） や、LLM の多様な応用例(テキスト生成、コード、翻訳、要約、質疑応答、マルチモーダル応用など) も紹介されています。

### プロンプトエンジニアリング

初日の 2 つ目のトピックとして、LLM から期待通りの出力を得るために不可欠な **プロンプトエンジニアリング** が取り上げられました。

ChatGPT や Gemini のようなチャットボットとの対話は簡単なプロンプトで行えますが、Google AI Studio や API 経由でモデルを利用することで、temperature、Top-K/Top-P、Max Token Limit などのパラメータをより細かく制御できることを学びました。

具体的なプロンプトエンジニアリングのテクニックとして

- Zero-shot Prompting：タスクの説明のみを与えるだけの最もシンプルな手法
- System Prompting：出力形式に JSON を指定するなど、モデルに追加のコンテキストや指示を与える
- Few-shot Prompting：モデルにタスクの実行方法を示すために、プロンプト内に少数の例を含める手法
- Chain-of-Thought (CoT) Prompting：複雑な問題に対して、一連の中間的な推論ステップを促す
- ReAct (Reasoning and Acting)：推論ステップと外部ツールへのアクセスなどのアクションを組み合わせる
- Automatic Prompt Engineering (APE)：プロンプトの生成と評価を自動化する

などの手法や、プロンプトエンジニアリングのベストプラクティスについて学びました。

### Day 1: Kaggle Notebook

- [Prompting](https://www.kaggle.com/code/markishere/day-1-prompting): パラメータを調整したりプロンプトエンジニアリングを活用しつつ、Python で Gemini 2.0 Flash の API を叩いてみるという内容。Enum mode や JSON mode で出力を固定する手法やモデルにコードの生成・実行をさせる方法の紹介も。
- [Evaluation and structured output](https://www.kaggle.com/code/markishere/day-1-evaluation-and-structured-output):Pointwise evaluation と Pairwise evaluation を用いてモデルの性能評価を行った。

## Day 2: Embeddings と Vector Stores

### 学習リソース

- Whitepaper: [https://www.kaggle.com/whitepaper-embeddings-and-vector-stores](https://www.kaggle.com/whitepaper-embeddings-and-vector-stores)
- Podcast: [https://www.youtube.com/watch?v=xCAVsst6WJ8](https://www.youtube.com/watch?v=xCAVsst6WJ8)
- Kaggle Notebook:
  - [https://www.kaggle.com/code/markishere/day-2-document-q-a-with-rag](https://www.kaggle.com/code/markishere/day-2-document-q-a-with-rag)
  - [https://www.kaggle.com/code/markishere/day-2-embeddings-and-similarity-scores](https://www.kaggle.com/code/markishere/day-2-embeddings-and-similarity-scores)
  - [https://www.kaggle.com/code/markishere/day-2-classifying-embeddings-with-keras](https://www.kaggle.com/code/markishere/day-2-classifying-embeddings-with-keras)
- YouTube Live: [https://www.youtube.com/watch?v=AjpjCHdIINU](https://www.youtube.com/watch?v=AjpjCHdIINU)

2 日目の資料「Embeddings & Vector Stores」では、様々な種類のデータを統一された **ベクトル表現（Embedding）** に変換し、それらを効率的に管理・検索するための技術について、解説しています。

まず、**Embedding(埋め込み表現)** とは、テキスト、画像、音声などの実世界のデータを **低次元の数値ベクトル** に変換したもので、ベクトル空間上での距離が元のデータの **意味的な類似性** を反映するように設計されています。

これにより、大規模なデータの効率的な処理と保存、そして意味に基づいた比較や検索が可能になります。

資料では、以下のようないくつかの主要な Embedding 手法が紹介されました:

- Text embeddings
- Image & multimodal embeddings
- Structured data embeddings
- Graph embeddings

Embedding の学習には、デュアルエンコーダー構造や Contrastive Loss が一般的に用いられ、基盤モデルからのファインチューニングも行われます。

次に、生成された Embedding を効率的に検索するための **ベクトル検索** について説明されています。これは、厳密なキーワード一致ではなく、ベクトル間の類似性（ユークリッド距離、コサイン類似度など）に基づいて検索を行うものです。

大規模データセットでは、線形検索は非効率なため、**近似最近傍探索（ANN）** アルゴリズムが不可欠です。資料では、LSH(Locality sensitive hashing)、ツリーベース（Kd-tree, Ball-tree）、HNSW(Hierarchical navigable small worlds)、ScaNN といった主要な ANN アルゴリズムが紹介されています。

これらの Embedding とベクトル検索を大規模かつ本番環境で管理するために **ベクトルデータベース** が使用されます。ベクトルデータベースは、ベクトル、関連するメタデータ、元のコンテンツを格納し、ANN アルゴリズムによる高速検索を可能にします。Vertex AI Vector Search のようなマネージドサービスや、Weaviate、ChromaDB などのオープンソースの選択肢が挙げられています。

最後に、Embedding とベクトルデータベースの **応用例** が示されています。特に重要なのが **RAG (Retrieval Augmented Generation)** であり、Embedding 検索で取得した関連情報を LLM へのプロンプトに含めることで、LLM の回答の精度を高め、ハルシネーションを抑制し、情報の出典を提供できるようになります。その他の応用には、検索、レコメンデーションシステム、異常検知、分類、リランキングなどがあります。

### Day 2: Kaggle Notebook

- [Document Q&A with RAG](https://www.kaggle.com/code/markishere/day-2-document-q-a-with-rag): ハードコードしたテキストを情報ソースとして RAG を実装し、Embedding、ベクトル検索、プロンプトへのテキスト埋め込み、ソースを元にモデルが回答、といった RAG の基本動作を確認。
- [Embeddings and similarity scores](https://www.kaggle.com/code/markishere/day-2-embeddings-and-similarity-scores): Gemini API(text-embedding-004)を使ってテキスト間の類似度スコアの算出を行った。
- [Classifying embeddings with Keras](https://www.kaggle.com/code/markishere/day-2-classifying-embeddings-with-keras): 同じく text-embedding-004 を用いて文章のカテゴリー分類を行った。具体的には、Keras を用いて 1 つの隠れ層のみのニューラルネットワークを構築し、ベクトル変換を行った文章を説明変数、カテゴリラベルを目的変数として学習させたモデルを作成し、テストデータで性能評価を行った。

## Day 3:

### 学習リソース

- Whitepaper: https://www.kaggle.com/whitepaper-agents
- Podcast: https://www.youtube.com/watch?v=D3Kaqz7VW28
- Kaggle Notebook:
  - https://www.kaggle.com/code/markishere/day-3-function-calling-with-the-gemini-api
  - https://www.kaggle.com/code/markishere/day-3-building-an-agent-with-langgraph
- YouTube Live: https://www.youtube.com/watch?v=g6MVIEzFTjY

3 日目の資料「Agents」では、Generative AI の能力を拡張するためのアプリケーションである AI エージェントについて解説されています。

AI エージェントの定義は、**目標を達成するために、ツールを用いて外部の世界を観察し、それに基づいて自律的に行動するアプリケーション**です。  
モデル単体では、知識がトレーニングデータに限定され、外部世界と直接的に対話する能力がありませんが、エージェントは **ツール** を介することで、リアルタイム情報へのアクセスや外部システムとの連携を実現します。

AI エージェントの動作を規定するのは「**認知アーキテクチャ**」と呼ばれる構造であり、主に以下の 3 つのコンポーネントで構成されます:

1.  **モデル**: エージェントプロセスにおいて意思決定を司る言語モデル。
2.  **ツール**: 基盤モデルと外部世界とのギャップを埋める要素であり、外部データやサービスとの対話を可能にする。エージェント側で API を実行する Extensions、クライアント側での実行指示を行う Functions、外部データアクセスを可能にする Data Stores といった種類がある。
3.  **オーケストレーションレイヤー**: 情報を取り込み、内部で推論を行い、その結果に基づいて次の行動や意思決定を判断する循環的なプロセスを担う。ReAct や Chain-of-Thought といった「**推論フレームワーク**」が利用される。

これらのコンポーネントが連携することで、エージェントはモデル単体では困難な、複雑なタスクの計画・実行や、常に最新の情報を活用した応答が可能となります。

将来的には、特定分野に特化した複数のエージェントを組み合わせることで、より高度で複雑な問題への対応が期待されています。

### Day 3: Kaggle Notebook

- [Function calling with the Gemini API](https://www.kaggle.com/code/markishere/day-3-function-calling-with-the-gemini-api): ツールとして SQL の実行ができる関数を定義し、自然言語でデータベースの参照ができるエージェントを実装。後半では Python のプログラムの生成・実行もできるようにし、seaborn による実行結果の可視化を行った。
- [Building an agent with LangGraph](https://www.kaggle.com/code/markishere/day-3-building-an-agent-with-langgraph): メニュー表を元にカフェの注文管理を対話的に行う AI エージェントを LangGraph を用いて実装した。

## Day 4:

### 学習リソース

- Whitepaper: https://www.kaggle.com/whitepaper-solving-domains-specific-problems-using-llms
- Podcast: https://www.youtube.com/watch?v=MWqspvVvNzA
- Kaggle Notebook:
  - https://www.kaggle.com/code/markishere/day-4-fine-tuning-a-custom-model
  - https://www.kaggle.com/code/markishere/day-4-google-search-grounding
- YouTube Live: https://www.youtube.com/watch?v=AN2tpHi26OE

4 日目の資料「Solving Domain-Specific Problems Using LLMs」では、サイバーセキュリティや医療のような専門分野における複雑な課題解決への LLM の応用について取り上げられました。

サイバーセキュリティ分野では、常に変化する攻撃手法や人材不足といった課題が存在します。

これに対し、SecLM というセキュリティに特化した LLM が提案されています。SecLM は、専門家がセキュリティリスクをより効果的に分析・対応できるよう支援することを目指しており、自然言語での質問応答や、セキュリティツール・データとの連携を可能にします。

このアプローチでは、セキュリティ特化の LLM に加え、ツール、信頼性のあるデータストア、推論、行動計画を管理する柔軟なプランニングフレームワーク（推論フレームワーク含む）を組み合わせることが重要視されています。

特に、最新の攻撃手法や脆弱性、ユーザー固有データに対応するため、RAG や PET(parameter-efficient tuning)などの技術が活用されています。

一方、医療分野は、膨大かつ絶えず変化する知識、そして状況依存的な判断の必要性といった課題があります。
MedLM は、この医療分野のためにファインチューニングされた LLM の一種です。
Med-PaLM はその初期バージョンであり、医療に関する質問応答タスクにおいて、米国の医師国家試験（USMLE）スタイルの問題で専門家レベルの性能を達成しています。
医療における生成 AI は、トリアージ、問診プロセスの改善、医師への情報提供など、多様な応用可能性が示されています。

結論として、特定の専門分野に特化した LLM は、それぞれの分野での課題解決において大きな可能性を秘めていますが、その効果的な運用には、単に技術の進化だけでなく、各分野の専門家との密な連携、そして厳格な評価と責任ある導入プロセスが重要であると述べられています。

### Day 4: Kaggle Notebook

- [Fine tuning a custom model](https://www.kaggle.com/code/markishere/day-4-fine-tuning-a-custom-model): 文章の分類モデルのファインチューニングを行った。トレーニングデータと共に、従来の機械学習で用いるバッチサイズ、エポック数、Learning Rate といったハイパーパラメータを指定するだけでチューニングが完了し、正答率が 37% → 87% ほどまで向上した。
- [Google Search grounding](https://www.kaggle.com/code/markishere/day-4-google-search-grounding): 特定の情報源に基づいて LLM の生成内容を裏付ける Grounding というテクニックの実装例を確認した。具体的には、Gemini のツールとして Google Search を指定し、Google 検索の結果をもとに回答を行うプログラムを作成した。

## Day 5:

### 学習リソース

- Whitepaper: https://www.kaggle.com/whitepaper-operationalizing-generative-ai-on-vertex-ai-using-mlops
- Podcast: https://www.youtube.com/watch?v=Hbk8UXavHrk
- Kaggle Notebook: なし
- YouTube Live: https://www.youtube.com/watch?v=eZ-8UQ_t4YM

5 日目の Whitepaper は、生成 AI システムを安定的かつ継続的に運用するために、開発、評価、デプロイ、監視、ガバナンスといった従来のシステム開発のライフサイクル全体における MLOps のプラクティスの拡張方法についての解説が中心でした。

以下に生成 AI システムのライフサイクルにおける主要なステップについて簡単にまとめます。

- Discover: 多数の基盤モデルを品質・コスト・法的観点から評価して選定
- Develop & Experiment: プロンプト設計とファインチューニングを繰り返し評価メトリクスを蓄積
  - Chain & Augment: RAG やエージェントなど複数モデルや外部 API と連携し客観性・推論力を補完
  - Tuning & Training: 複雑なタスクには SFT や RLHF を行う。モデル圧縮・量子化などで計算資源を最適化
  - Data Practices: プロンプト、ベクトルデータベース、合成データなど様々なデータを統合し、バージョン管理・追跡・再現可能な形で扱えるパイプラインの構築が必要
  - Evaluate: 手動評価と自動評価のトレードオフを理解した上でユースケースに即した評価手法を設計
- Deploy: プロンプトや外部データセット、チューニング済みモデルなど、生成 AI 独自のリソースを含む CI/CD、インフラ構築、モデル最適化が必要
- チェーン要素およびその構成要素も新たなアセットとして捉え、開発からデプロイ、モニタリングまでのライフサイクルを通じてガバナンスが必要

## Capstone Project

**Capstone Project** はコースの集大成として任意で取り組むことができるプロジェクトです。

各回の Kaggle Notebook は事前に用意されたコードの実行ボタンを押していくだけでよく、その日学んだことの理解が本当に定着しているのか怪しかったので、私も Capstone Project にも取り組み、アウトプットとコース全体の総復習として活用しました。

Capstone Project の概要は以下の通りです:

[https://www.kaggle.com/competitions/gen-ai-intensive-course-capstone-2025q1/overview](https://www.kaggle.com/competitions/gen-ai-intensive-course-capstone-2025q1/overview)

- **目標:** コースで学んだ生成 AI の機能を少なくとも 3 つ以上デモンストレーションする
- **形式:** Kaggle Notebook でコードを提出する
- **テーマ:** ユースケースは自由であり、創造的で現実世界の問題解決を目指すことが推奨される
- **評価:** Notebook がエラーなく実行可能で、最低 3 つの生成 AI の機能を利用していることを最低限の条件とし、ユースケースの革新性、ドキュメントの質などが評価される。任意でブログ記事と YouTube 動画を作成すれば加点対象になる。

私は、指定した論文の QA を自然言語でやりとりできる **ScholarAgent** という AI エージェントを開発し、RAG, Agent, Function calling, Vector search, Vector DB などの技術のデモンストレーションを行いました。

詳細は別記事で解説しているのでぜひご覧ください。

- [ブログ記事(英語)](https://masa373.work/blog/gen-ai-intensive-capstone)
- [Kaggle Notebook](https://www.kaggle.com/code/masa373dev/capstone-scholaragent)

## 結論

生成 AI の最前線の知識を吸収することに5日間がっつりと集中でき、非常に有意義な時間となりました！
こんなに良質なコンテンツを無償で提供してくれた Google さんには感謝しかないです。
AIにより言語格差がなくなってきているので、翻訳ツールの助けも借りながら、最新のAI情報は英語でどんどんキャッチアップしていきたいですね！
