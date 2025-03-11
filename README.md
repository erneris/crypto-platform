# Cryptocurrency exchange platform emulator

### Features

- Creating/logging into account
- Changing password
- Getting current cryptocurrency data
- Buying/selling cryptocurrency
- Checking transaction history

## Setup

Create a PostgreSQL database, or use an existing one from the previous exercises.
Setup `.env` files in `client` and `server` based on `.env.example` files.

```
npm install
npm run migrate:latest -w server
npm run gen:types -w server
npm run dev -w server
npm run dev -w client
```

You can test out API endpoints by running server and entering `http://localhost:3000/api/v1/trpc-panel`
Public URL: `https://exchange.y3mvtwsx89156.eu-central-1.cs.amazonlightsail.com/`
