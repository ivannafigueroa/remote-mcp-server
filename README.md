# Remote MCP Server with Web Search on Cloudflare

A production-ready remote MCP (Model Context Protocol) server deployed on Cloudflare Workers that implements a greeting tool and web search functionality. This server demonstrates how to build and deploy custom tools that can be used by AI assistants like Cursor and Claude Desktop.

## Overview

This project serves as a reference implementation for:
- Building custom MCP servers
- Implementing OAuth authentication
- Deploying MCP servers to Cloudflare Workers
- Connecting AI assistants to custom tools
- Integrating web search capabilities

## Features

- 🚀 Remote MCP server deployed on Cloudflare Workers
- 🔐 OAuth authentication for secure access
- 👋 Simple greeting tool for testing MCP functionality
- 🔍 Web search tool for real-time information retrieval
- 🤖 Compatible with Cursor and Claude Desktop
- 📊 Built-in MCP Inspector support
- 📦 Easy local development setup
- 🛠️ Production-ready deployment configuration

## Prerequisites

- Node.js 18 or later
- pnpm package manager
- Cloudflare account (for deployment)
- Git
- API key for web search service (optional)

## Local Development

1. Clone the repository:
```bash
# Using HTTPS
git clone https://github.com/cloudflare/ai.git

# Or using SSH
git clone git@github.com:cloudflare/ai.git
```

2. Install dependencies:
```bash
cd ai
pnpm install
```

3. Configure environment variables (optional):
```bash
# Create a .env file
cp .env.example .env

# Add your web search API key if needed
WEB_SEARCH_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npx nx dev remote-mcp-server
```

The server will be available at [`http://localhost:8787/`](http://localhost:8787/)

## Integration Guide

### Connecting to Cursor

1. Open Cursor and navigate to Settings > AI Settings
2. In the MCP Configuration section, add:
```json
{
  "mcpServers": {
    "greeting": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "http://localhost:8787/sse"
      ]
    },
    "webSearch": {
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
4. When prompted, log in with any email and password (mock authentication for testing)
5. Test the tools by:
   - Asking Cursor to greet someone
   - Requesting web search results for a query

### Connecting to Claude Desktop

1. Open Claude Desktop and go to Settings > Developer > Edit Config
2. Add the following configuration:
```json
{
  "mcpServers": {
    "greeting": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "http://localhost:8787/sse"
      ]
    },
    "webSearch": {
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
4. Log in with any email and password
5. Test the tools by:
   - Asking Claude to greet someone
   - Requesting web search results for a query

### Testing with MCP Inspector

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
5. Test both tools:
   - Use the greeting tool to send a greeting
   - Use the web search tool to search for information

## Available Tools

### Greeting Tool
- Simple tool that generates personalized greetings
- Usage: Ask the AI to greet someone by name
- Example: "Please greet John"

### Web Search Tool
- Performs real-time web searches
- Returns relevant search results
- Usage: Ask the AI to search for information
- Example: "Search for the latest news about AI"

## Deployment

### Deploying to Cloudflare

1. Create a KV namespace:
```bash
npx wrangler kv namespace create OAUTH_KV
```

2. Add the KV namespace ID to `wrangler.jsonc`
3. Configure environment variables in Cloudflare:
   - Go to Workers > Your Worker > Settings > Variables
   - Add your web search API key if needed
4. Deploy to Cloudflare:
```bash
npm run deploy
```

### Connecting to the Deployed Server

Update your configuration in Cursor or Claude Desktop to use your worker's URL:

```json
{
  "mcpServers": {
    "greeting": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://your-worker-name.your-account.workers.dev/sse"
      ]
    },
    "webSearch": {
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

### Common Issues

1. **Connection Issues**
   - Verify the server is running locally
   - Check if the port 8787 is available
   - Ensure your firewall isn't blocking the connection

2. **Authentication Problems**
   - Clear the auth files:
   ```bash
   rm -rf ~/.mcp-auth
   ```
   - Restart the application
   - Try logging in again

3. **Tool Not Working**
   - Verify the configuration is correct
   - Check the browser console for errors
   - Review server logs for any issues

4. **Web Search Issues**
   - Verify your API key is correctly configured
   - Check if you've reached API rate limits
   - Ensure your search query is properly formatted

### Debugging

1. Test the connection directly:
```bash
npx mcp-remote http://localhost:8787/sse
```

2. Check server logs:
```bash
npx wrangler tail
```

3. Monitor web search requests:
```bash
npx wrangler tail --format=pretty
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the [Cloudflare Workers documentation](https://developers.cloudflare.com/workers/)
- Review the [MCP specification](https://github.com/modelcontextprotocol/spec)
- Consult the [Web Search API documentation](https://developers.cloudflare.com/workers/examples/web-search-api)
