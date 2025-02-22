# bcd-article-parser

Basic Express API to run an article URL through Postlight parser.

## Use

This project is used as a helper for the BCD Good Morning Daily Email Bot. It's used to pass article URLs through to generate details used by an LLM to generate a summary.

## How to run

The project contains a Dockerfile which starts an Express API on port 3000.

### Running with Docker

1. Build the Docker image:
    ```sh
    docker build -t bcd-article-parser .
    ```

2. Run the Docker container:
    ```sh
    docker run -p 3000:3000 bcd-article-parser
    ```

### Running locally

1. Install dependencies:
    ```sh
    pnpm install
    ```

2. Start the application:
    ```sh
    node app.js
    ```

## API Endpoints

### POST /parse

Send a POST request to `/parse` with a JSON body containing the `url` parameter to parse the article.

#### Request

```json
{
  "url": "https://example.com/article"
}
```