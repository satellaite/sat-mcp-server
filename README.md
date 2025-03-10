# @satellaite/mcp-server

MCP (Model Context Protocol) server for Satellaite API. This server implements the Model Context Protocol specification to handle model interactions.

## Features

- Implements Model Context Protocol specification
- Built with TypeScript for type safety
- Uses Zod for runtime type validation
- Provides a binary executable for easy deployment

## Setup

### Usage with Claude Desktop
To use this with Claude Desktop, add the following to your `claude_desktop_config.json`:

### NPX

```json
{
  "mcpServers": {
    "satellaite": {
      "command": "npx",
      "args": [
        "-y",
        "@satellaite/mcp-server"
      ],
      "env": {
        "API_BASE_URL": "<API_BASE_URL>"
      }
    }
  }
}
```

## Tools

- `get_relays`
    - Get all Satellaite relays(contracts)
    - Inputs:
    - Returns: JSON array of available relays with their details

- `call_relay`
    - Call a Satellaite relay(contract)
    - Inputs:  
        - `relayId` (string): The ID of the relay(contract) to execute
    - Returns: JSON response with the relay execution result or error message

## Resources

### Satellaite relays

**URI:** `relays://list`  
**Description:** A list of all available relays(contracts)  
**MIME Type:** application/json

**Returns:** JSON array of all available relays

### Satellaite Relay

**URI Pattern:** `relays://{relayId}`  
**Description:** Retrieve a relay(contract)  
**MIME Type:** application/json

**Parameters:**
- `relayId`: ID of the specific relay to retrieve

**Returns:** JSON object with the specific relay's details

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Links

- Homepage: [https://satellaite.com](https://satellaite.com)
- Version: 0.5.0

## Author

Satellaite, MB 