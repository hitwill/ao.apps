import { callBlockchain } from './blockchain/message';
import type {
    BasicQueryResponse,
    MultipleResourceResult,
    SaveResource,
    SingleResourceResult,
} from './types';

class DatabaseService {
    private async sendQuery(
        data: string | object,
        action:
            | 'FetchOne'
            | 'DeleteOne'
            | 'UpdateOne'
            | 'Truncate'
            | 'Insert'
            | 'Fetch'
    ): Promise<BasicQueryResponse> {
        const tags = [{ name: 'Action', value: action }];
        const stringifiedData =
            typeof data === 'string' ? data : JSON.stringify(data);

        const response = await callBlockchain(tags, stringifiedData);
        return JSON.parse(response);
    }

    async createResource(resource: SaveResource): Promise<BasicQueryResponse> {
        const query = `
            INSERT INTO resources (name, link, description, type, category, tags, ecosystem, votes, created_at, updated_at)
            VALUES ('${resource.name}', '${resource.link}', '${resource.description}', '${resource.type}', '${resource.category}', '${resource.tags}', '${resource.ecosystem}', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
        `;
        return this.sendQuery(query, 'Insert');
    }

    async getResources(
        page: number = 0,
        itemsPerPage: number = 10,
        searchParams: {
            category?: string;
            ecosystem?: string;
            tags?: string[];
            search?: string;
        } = {},
        orderBy: { field: string; direction: 'ASC' | 'DESC' } = {
            field: 'votes',
            direction: 'DESC',
        }
    ): Promise<MultipleResourceResult> {
        let query = 'SELECT * FROM resources';
        const conditions: string[] = [];

        if (searchParams.category && searchParams.category !== 'all') {
            conditions.push(`category = '${searchParams.category}'`);
        }

        if (searchParams.ecosystem && searchParams.ecosystem !== 'all') {
            conditions.push(`ecosystem = '${searchParams.ecosystem}'`);
        }

        if (searchParams.tags && searchParams.tags.length > 0) {
            const tagConditions = searchParams.tags.map(
                (tag) => `tags LIKE '%${tag}%'`
            );
            conditions.push(`(${tagConditions.join(' OR ')})`);
        }

        if (searchParams.search) {
            conditions.push(
                `(name LIKE '%${searchParams.search}%' OR description LIKE '%${searchParams.search}%')`
            );
        }

        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(' AND ')}`;
        }

        query += ` ORDER BY ${orderBy.field} ${orderBy.direction}`;
        query += ` LIMIT ${itemsPerPage} OFFSET ${page * itemsPerPage}`;

        return this.sendQuery(
            query,
            'Fetch'
        ) as Promise<MultipleResourceResult>;
    }

    async getResourceById(id: number): Promise<SingleResourceResult> {
        const data = {
            table: 'resources',
            id: id,
        };
        return this.sendQuery(
            data,
            'FetchOne'
        ) as Promise<SingleResourceResult>;
    }

    async updateResource(
        id: number,
        resource: Partial<SaveResource>
    ): Promise<BasicQueryResponse> {
        const data = {
            table: 'resources',
            set:
                Object.entries(resource)
                    .map(([key]) => `${key} = ?`)
                    .join(', ') + ', updated_at = CURRENT_TIMESTAMP',
            values: [...Object.values(resource), id],
        };
        return this.sendQuery(data, 'UpdateOne');
    }

    async deleteResource(id: number): Promise<BasicQueryResponse> {
        const data = {
            table: 'resources',
            id: id,
        };
        return this.sendQuery(data, 'DeleteOne');
    }

    async upvoteResource(id: number): Promise<BasicQueryResponse> {
        const data = {
            table: 'resources',
            set: 'votes = votes + 1, updated_at = CURRENT_TIMESTAMP',
            values: [id],
        };
        return this.sendQuery(data, 'UpdateOne');
    }
}

export const databaseService = new DatabaseService();
