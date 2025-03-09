# Cryptocurrency exchange platform emulator

### Features

- Creating/logging into account
- Changing password
- Getting current cryptocurrency data
- Buying/selling cryptocurrency
- Checking transaction history

## Setup

1. `npm install`
2. Create a PostgreSQL database, or use an existing one from the previous exercises.
3. Setup `.env` files in `client` and `server` based on `.env.example` files.

```
npm install
npm run migrate:latest
npm run gen:types
npm run dev
```

You can test out API endpoints by running server and entering `http://localhost:3000/api/v1/trpc-panel`
