export interface QueryResult {
    status: boolean;
    data?: Resource | Resource[];
    error?: string;
}

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
