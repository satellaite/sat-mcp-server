import { API_BASE_URL } from "./index.js";

export async function getRelays(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/contracts`);
    const data = await response.json();
    return data;
}

export async function callRelay(relayId: string): Promise<any> {
    const response = await fetch(
        `${API_BASE_URL}/contracts/${relayId}/execute`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        }
    );
    const data = await response.json();
    return data;
}