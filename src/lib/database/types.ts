export interface QueryResult {
    status: boolean;
}

export interface Resource {
    id?: number;
    name: string;
    link: string;
    description: string;
    type: string;
    tags: string;
    votes?: number;
}
