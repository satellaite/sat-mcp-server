#!/usr/bin/env node

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { callRelay, getRelays } from "./satellaite.js";
import { z } from "zod";

export const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080/api";
if (!API_BASE_URL) {
    console.error("Missing environment variable: API_BASE_URL");
    process.exit(1);
}

// Initialize the MCP server
const server = new McpServer({
    name: "Satellaite MCP Server",
    version: "0.5.2"
}, {
    capabilities: {}
});


server.resource(
    "Satellaite relays",
    "relays://list",
    {
        description: "A list of all available relays(contracts)",
        mineType: "application/json",
    },
    async (uri: URL) => {
        const contracts = await getRelays();
        return {
            contents: [
                {
                    uri: uri.href,
                    text: JSON.stringify(contracts, null, 2),
                    mineType: "application/json",
                },
            ],
        }
    }
);

server.resource(
    "Satellaite Relay",
    new ResourceTemplate("relays://{relayId}", {
        list: async () => {
            const relays = await getRelays();
            return {
                resources: relays.map((relay: any) => ({
                    name: relay.name,
                    uri: "relays://" + relay.id,
                    description: relay.description,
                    mineType: "application/json",
                })),
            }
        }
    }),
    {
        description: "Retrieve a relay(contract)",
        mineType: "application/json",
    },
    async (uri, { relayId }) => {
        const relays = await getRelays();
        const relay = relays.find((r: any) => r.id === relayId);

        return {
            contents: [
                {
                    uri: uri.href,
                    text: JSON.stringify(relay, null, 2),
                    mineType: "application/json",
                },
            ],
        }
    },
);

server.tool(
    "get_relays",
    "Get all Satellaite relays(contracts)",
    async () => {
        try {
            const relays = await getRelays();
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(relays, null, 2)
                    }
                ],
            }
        } catch (error) {
            return {
                content: [
                    {
                        type: "text",
                        text: "Error: " + error
                    }
                ],
                isError: true,
            }
        }
    }
);

server.tool(
    "call_relay",
    "Call a Satellaite relay(contract)",
    {
        relayId: z.string().describe("The ID of the relay(contract) to execute"),
    },
    async (params: { relayId: string }) => {
        try {
            const { relayId } = params;
            const result = await callRelay(relayId);
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(result, null, 2)
                    }
                ],
            }
        } catch (error) {
            return {
                content: [
                    {
                        type: "text",
                        text: "Error: " + error
                    }
                ],
                isError: true,
            }
        }
    }
);

// Start the server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
