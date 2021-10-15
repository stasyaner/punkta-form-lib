import { AUTH_TOKEN } from "../config/api";

export async function fetchApi<T = unknown>(url: string): Promise<T | null> {
    const config: RequestInit = {
        headers: { Authorization: `Basic ${AUTH_TOKEN}` }
    };

    let response = null;
    try {
        response = await fetch(url, config);
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error(e.message);
        } else {
            console.error(JSON.stringify(e));
        }
    }
    if (response?.status !== 200) {
        console.error("Fetch call failed or null was returned.");
        return null;
    }

    let resultText = null;
    try {
        resultText = await response.text();
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error(e.message);
        } else {
            console.error(JSON.stringify(e));
        }
    }
    if (!resultText) {
        console.error("Couldn't parse fetch call response content as text.");
        return null;
    }

    let result = null;
    try {
        result = JSON.parse(resultText) as T;
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error(e.message);
        } else {
            console.error(JSON.stringify(e));
        }
    }
    if (!result) {
        let errorMessage = "Couldn't parse fetch call response text content";
        errorMessage += " as json.";
        console.error(errorMessage);
    }

    return result;
}
