export interface Resource {
    id?: number;
    name: string;
    link: string;
    description: string;
    type: string;
    tags: string;
    votes?: number;
    created_at?: string;
    updated_at?: string;
}

export interface BasicQueryResponse {
    status: boolean;
    message?: string;
    error?: string;
}

export interface QueryResponse<T = never> extends BasicQueryResponse {
    data?: T;
}

export type SingleResourceResult = QueryResponse<Resource>;

export type MultipleResourceResult = QueryResponse<Resource[]>;

// Type guard for checking if a QueryResponse contains data
export function hasData<T>(
    response: QueryResponse<T>
): response is QueryResponse<T> & { data: T } {
    return response.data !== undefined;
}
