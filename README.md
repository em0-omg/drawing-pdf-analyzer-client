# Drawing PDF Analyzer Client

※デモ用

PDF 図面の解析機能を提供する Web クライアントアプリケーション

## 概要

このアプリケーションは、建築・工事図面の PDF ファイルをアップロードして、AI（Gemini）を使用した自動解析や記号検出を行うデモアプリケーションです。

## 主な機能

- **PDF 図面アップロード**: PDF 形式の図面ファイルをドラッグ&ドロップまたはファイル選択でアップロード
- **AI 解析（analyze_pdf）**: Gemini AI を使用した PDF 内のテキストや図面要素の解析
- **記号検出（find_symbols）**: 特定の記号（target1-4）の自動検出機能
- **分割処理**: PDF を 2/4/8/16 分割して処理精度を向上
- **リアルタイム結果表示**: 解析結果のリアルタイム表示とハイライト画像の表示

## 技術スタック

- **フレームワーク**: Next.js 15.5.3 (React 19.1.0)
- **スタイリング**: Tailwind CSS 4.0
- **言語**: TypeScript
- **ビルドツール**: Turbopack

## セットアップ

### 必要要件

- Node.js (推奨版本: 20 以上)
- npm / yarn / pnpm / bun

### インストール

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

### 環境設定

`.env.local.example`を参考に`.env.local`ファイルを作成してください。

## 使用方法

1. ブラウザで [http://localhost:3000](http://localhost:3000) にアクセス
2. API エンドポイントを選択:
   - **テキスト検出（analyze_pdf）**: PF100/PF150 等のテキスト要素を検出
   - **記号検出（find_symbols）**: target1-4 の記号を検出
3. 分割数を選択（2/4/8/16 分割）
4. PDF ファイルを選択してアップロード
5. 解析結果を確認

## API エンドポイント

- `POST /api/analyze_pdf`: Gemini AI による PDF 解析
- `POST /api/find_symbols`: 記号検出処理

## プロジェクト構成

```
src/
├── app/
│   ├── api/                 # APIルート
│   │   ├── analyze_pdf/     # PDF解析API
│   │   └── find_symbols/    # 記号検出API
│   ├── globals.css          # グローバルスタイル
│   ├── layout.tsx           # レイアウトコンポーネント
│   └── page.tsx             # メインページ
├── components/
│   ├── APIEndpointSelector.tsx  # APIエンドポイント選択
│   ├── PDFUpload.tsx           # PDFアップロード
│   ├── ResultDisplay.tsx       # 結果表示
│   └── SplitCountSelector.tsx  # 分割数選択
└── services/
    └── api.ts              # API通信ロジック
```

## 開発

```bash
# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバー起動
npm run start
```

## デモ

`demo.html`ファイルには、このアプリケーションのスタンドアロン版が含まれており、バックエンド API（http://localhost:8080）に直接接続して動作確認ができます。
