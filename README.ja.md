# uranaukagami うらなうかがみ

カメラの映像からリアルタイムで顔を分析する、AIを活用したウェブベースの「占いの鏡」です。1人の場合は性格診断（占い）を、複数人の場合は相性分析を行うことができます。

## 機能

- **リアルタイム顔検出**: ウェブカメラを使用し、ブラウザ上で顔を検出します。
- **動的なAIプロンプト**:
  - **1人の場合**: 年齢、性別、職業、ラッキーアイテムを「占います」。
  - **複数人の場合**: 相性を推定します。
- **切り替え可能なAIバックエンド**: 2つの強力なビジョンモデルを簡単に切り替え可能です。
  - **Google Gemma 3**: [Ollama](https://ollama.com/)を使用してローカルで実行し、プライバシーを保護しつつオフラインで利用できます。
  - **OpenAI GPT-5.3**: OpenAI APIを使用してクラウドベースの分析を行います。
- **シンプルなウェブインターフェース**: カメラ映像にAIの応答をオーバーレイ表示する、すっきりとしたフルスクリーンUIです。

## はじめに

### 前提条件

- [Deno](https://deno.land/manual/getting_started/installation) (v1.38+)
- [Ollama](https://ollama.com/download) (Gemma 3モデルを使用する場合のみ必要)

### 1. リポジトリのクローン

```bash
git clone https://github.com/your-username/uranaukagami.git
cd uranaukagami
```

### 2. AIモデルの設定

ローカルモデル（Gemma 3）またはクラウドモデル（GPT-5.3）のいずれかを選択してアプリケーションを実行できます。

#### オプションA: Gemma 3を使用する（デフォルト）

これがデフォルトの設定です。

1. Ollamaをインストールし、Gemma 3モデルをプルします。
    ```sh
    ollama run gemma3:4b
    ```
2. コードの変更は不要です。これでアプリケーションを実行する準備が整いました。

#### オプションB: GPT-5.3を使用する（OpenAI）

1. [OpenAI](https://platform.openai.com/api-keys)からAPIキーを取得します。

2. プロジェクトのルートディレクトリに`.env`ファイルを作成し、APIキーを追加します。詳細については、[openai-imagerecog](https://github.com/code4fukui/openai-imagerecog/)を参照してください。
    ```
    # .env
    OPENAI_API_KEY="sk-..."
    ```

3. `uranaukagami.js`を開き、Gemmaの行をコメントアウトし、GPTの行のコメントを解除して、使用するモデルを変更します。
    ```javascript
    // const model = "Gemma3/Google";
    const model = "GPT5.3/OpenAI";
    ```

### 3. アプリケーションの実行

Denoを使用してウェブサーバーを起動します。

```sh
deno serve -A --port 8000 --host "[::]" uranaukagami.js
```

ブラウザを開き、**http://localhost:8000/** にアクセスします。プロンプトが表示されたら、カメラのアクセス権限を許可してください。

## 仕組み

- **フロントエンド**: ユーザーインターフェースは単一のHTMLページで構成されており、[MediaPipe Face Mesh](https://google.github.io/mediapipe/solutions/face_mesh.html)ライブラリを使用してブラウザ内で高速な顔検出を行います。顔（または複数の顔）が静止した状態になると、フレームをキャプチャしてバックエンドに送信します。
- **バックエンド**: [Deno](https://deno.land/)で構築されたシンプルなウェブサーバーです。画像とプロンプトを受け取るAPIエンドポイント（`/api/imagerecog`）を公開し、設定されたAIモデルにリクエストを転送します。
- **AI統合**:
