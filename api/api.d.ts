export interface CrabApi {
    message: string;
}

export interface SearchAPIElem {
    id: string;
    name: string;
    description: string;
    symbol: string;
}

export interface SearchHTTPResponse {
    headers: {
        userAgent: string
    }
    path: string,
    query: {
        results: SearchAPIElem[],
        query: string
    }
}
