# uranaukagami うらなうかがみ

## setup

### with Gemma3:4b

set up [ollama](https://ollama.com/download) and [gemma3:4b](https://huggingface.co/google/gemma-3-4b-it)
```sh
ollama run gemma3:4b
```

### with GPT5.3

get API_KEY from OpenAI, and prepare .env (see [openai-imagerecog](https://github.com/code4fukui/openai-imagerecog/))

## how to run

```sh
deno serve -A --port 8000 --host "[::]" uranaukagami.js
```

open http://localhost:8000/
