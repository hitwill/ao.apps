import type {
    BasicQueryResponse,
    MultipleResourceResult,
    SaveResource,
    SingleResourceResult,
} from './types';

//TODO: Add API URL
const EXTERNAL_API_URL = '';

class DatabaseService {
    private async sendQuery(query: string): Promise<BasicQueryResponse> {
        const response = await fetch(EXTERNAL_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }

    async createResource(resource: SaveResource): Promise<BasicQueryResponse> {
        const query = `
    INSERT INTO resources (name, link, description, type, tags, votes, created_at, updated_at)
    VALUES ('${resource.name}', '${resource.link}', '${resource.description}', '${resource.type}', '${resource.tags}', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
  `;
        return this.sendQuery(query);
    }

    async getResources(
        page: number = 0,
        itemsPerPage: number = 10,
        searchParams = {}
    ): Promise<MultipleResourceResult> {
        //TODO: update so it takes the cateogry, ecosystem, and tags, and replaces the filter functions (or update the functions to work with it)
        const query = `SELECT * FROM resources ORDER BY votes DESC LIMIT ${itemsPerPage} OFFSET ${page * itemsPerPage};`;
        return this.sendQuery(query);
    }

    async getResourceById(id: number): Promise<SingleResourceResult> {
        const query = `SELECT * FROM resources WHERE id = ${id};`;
        return this.sendQuery(query);
    }

    async updateResource(
        id: number,
        resource: Partial<SaveResource>
    ): Promise<BasicQueryResponse> {
        const setStatements = Object.entries(resource)
            .map(([key, value]) => `${key} = '${value}'`)
            .join(', ');
        const query = `
    UPDATE resources
    SET ${setStatements}, updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id};
  `;
        return this.sendQuery(query);
    }

    async deleteResource(id: number): Promise<BasicQueryResponse> {
        const query = `DELETE FROM resources WHERE id = ${id};`;
        return this.sendQuery(query);
    }

    async upvoteResource(id: number): Promise<BasicQueryResponse> {
        const query = `
    UPDATE resources
    SET votes = votes + 1, updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id};
  `;
        return this.sendQuery(query);
    }

    // Add more methods for other operations as needed
}

export const databaseService = new DatabaseService();
