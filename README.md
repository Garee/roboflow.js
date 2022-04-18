# Roboflow.js

A JavaScript package for the Roboflow API.

## API Key

Read the Roboflow [documentation](https://docs.roboflow.com/rest-api#obtaining-your-api-key) on instructions for obtaining an API key.

## Usage

Install:

```bash
npm install --save @garyblackwood/roboflow.js
```

Use:

```javascript
import { RoboflowClient } from "@garyblackwood/roboflow.js";

const roboflow = RoboflowClient(process.env.ROBOFLOW_API_KEY);
const status = roboflow.root();
const workspace = roboflow.workspace("my-workspace");
```

## Development Quick Start

Install dependencies:

```bash
npm install
```

Build:

```bash
npm run build
```

Run unit tests:

```bash
# Populate `ROBOFLOW_API_KEY` in `.env.example` and rename the file to `.env`.
npm run test
```

Lint the code:

```bash
npm run lint
```
