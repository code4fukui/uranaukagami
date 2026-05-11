# uranaukagami うらなうかがみ

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A web-based "fortune-telling mirror" that uses AI to analyze faces from your camera in real-time. It can provide personality readings for a single person or analyze the compatibility between multiple people.

## Features

- **Real-time Face Detection**: Uses your webcam to detect faces in the browser.
- **Dynamic AI Prompts**:
    - For a **single person**, it "divines" their age, gender, occupation, and a lucky item.
    - For **multiple people**, it estimates their compatibility.
- **Switchable AI Backends**: Easily toggle between two powerful vision models:
    - **Google Gemma 3**: Runs locally via [Ollama](https://ollama.com/) for privacy and offline use.
    - **OpenAI GPT-5.3**: Uses the OpenAI API for cloud-based analysis.
- **Simple Web Interface**: A clean, fullscreen experience that overlays the AI's response on the camera feed.

## Getting Started

### Prerequisites

- [Deno](https://deno.land/manual/getting_started/installation) (v1.38+)
- [Ollama](https://ollama.com/download) (Required only for using the Gemma 3 model)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/uranaukagami.git
cd uranaukagami
```

### 2. Configure the AI Model

You can choose to run the application with a local model (Gemma 3) or a cloud-based one (GPT-5.3).

#### Option A: Use Gemma 3 (Default)

This is the default configuration.

1.  Install Ollama and pull the Gemma 3 model:
    ```sh
    ollama run gemma3:4b
    ```
2.  No code changes are needed. The application is ready to run.

#### Option B: Use GPT-5.3 (OpenAI)

1.  Get an API key from [OpenAI](https://platform.openai.com/api-keys).

2.  Create a `.env` file in the root of the project and add your API key. For more details, see [openai-imagerecog](https://github.com/code4fukui/openai-imagerecog/).
    ```
    # .env
    OPENAI_API_KEY="sk-..."
    ```

3.  In `uranaukagami.js`, change the active model by commenting out the Gemma line and uncommenting the GPT line:
    ```javascript
    // const model = "Gemma3/Google";
    const model = "GPT5.3/OpenAI";
    ```

### 3. Run the Application

Start the web server using Deno:

```sh
deno serve -A --port 8000 --host "[::]" uranaukagami.js
```

Now, open your browser and navigate to **http://localhost:8000/**. Grant camera permissions when prompted.

## How It Works

-   **Frontend**: The user interface is a single HTML page that uses the [MediaPipe Face Mesh](https://google.github.io/mediapipe/solutions/face_mesh.html) library to perform fast, in-browser face detection. When a face (or faces) is held steady, it captures a frame and sends it to the backend.
-   **Backend**: A simple web server built with [Deno](https://deno.land/). It exposes an API endpoint (`/api/imagerecog`) that receives the image and a prompt, then forwards the request to the configured AI model.
-   **AI Integration**: