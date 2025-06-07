# Remote MCP Server with Greeting Tool on Cloudflare

This is a simple remote MCP (Model Context Protocol) server deployed on Cloudflare Workers that implements a basic greeting tool for testing purposes. The server includes OAuth authentication and demonstrates how to connect AI assistants like Cursor and Claude Desktop to custom tools.

## Features

- Remote MCP server deployed on Cloudflare Workers
- OAuth authentication for secure access
- Simple greeting tool for testing MCP functionality
- Compatible with Cursor and Claude Desktop

## Local Development

```bash
# Clone the repository
git clone https://github.com/cloudflare/ai.git
# Or if using ssh:
# git clone git@github.com:cloudflare/ai.git

# Install dependencies
cd ai
pnpm install

# Run locally
npx nx dev remote-mcp-server
```

The server will be available at [`http://localhost:8787/`](http://localhost:8787/)

## Connecting to Cursor

1. Open Cursor and go to Settings > AI Settings
2. In the MCP Configuration section, add the following configuration:
```json
{
  "mcpServers": {
    "greeting": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "http://localhost:8787/sse"
      ]
    }
  }
}
```
3. Restart Cursor
4. When prompted, log in with any email and password (the server uses mock authentication for testing)
5. You can now use the greeting tool in Cursor by asking it to greet someone

## Connecting to Claude Desktop

1. Open Claude Desktop and go to Settings > Developer > Edit Config
2. Replace the configuration with:
```json
{
  "mcpServers": {
    "greeting": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "http://localhost:8787/sse"
      ]
    }
  }
}
```
3. Restart Claude Desktop
4. When prompted, log in with any email and password
5. You can now use the greeting tool in Claude by asking it to greet someone

## Testing with MCP Inspector

You can also test the server using the MCP Inspector:

1. Start the inspector:
```bash
npx @modelcontextprotocol/inspector
```

2. Open [`http://localhost:5173`](http://localhost:5173) in your browser
3. Configure the connection:
   - Set Transport Type to `SSE`
   - Enter `http://localhost:8787/sse` as the MCP server URL
   - Click "Connect"
4. Log in with any email and password
5. You can now test the greeting tool directly in the inspector

## Deploying to Cloudflare

1. Create a KV namespace:
```bash
npx wrangler kv namespace create OAUTH_KV
```

2. Add the KV namespace ID to `wrangler.jsonc`
3. Deploy:
```bash
npm run deploy
```

## Connecting to the Deployed Server

After deployment, you can connect to your deployed server by updating the configuration in either Cursor or Claude Desktop to use your worker's URL:

```json
{
  "mcpServers": {
    "greeting": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://your-worker-name.your-account.workers.dev/sse"
      ]
    }
  }
}
```

## Troubleshooting

If you encounter any issues:

1. Try restarting Cursor/Claude Desktop
2. Test the connection directly using:
```bash
npx mcp-remote http://localhost:8787/sse
```

3. If authentication issues persist, clear the auth files:
```bash
rm -rf ~/.mcp-auth
```

4. Check the browser console and server logs for any error messages
