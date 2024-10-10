import type {
    MultipleResourceResult,
    Resource,
    SingleResourceResult,
} from './types';

const mockResources: Resource[] = [
    {
        id: 1,
        name: 'ArDrive',
        link: 'https://ardrive.io',
        description: 'Permanent, decentralized file storage and sharing',
        type: 'app',
        tags: 'storage,file sharing',
        ecosystem: 'arweave',
        votes: 150,
        created_at: '2023-01-15T10:30:00Z',
        updated_at: '2023-10-10T14:45:00Z',
    },
    {
        id: 2,
        name: 'ArConnect',
        link: 'https://arconnect.io',
        description: 'Arweave wallet browser extension',
        type: 'app',
        tags: 'wallet,browser extension',
        ecosystem: 'arweave',
        votes: 120,
        created_at: '2023-02-20T09:15:00Z',
        updated_at: '2023-10-09T11:30:00Z',
    },
    {
        id: 3,
        name: 'ArweaveJS',
        link: 'https://github.com/ArweaveTeam/arweave-js',
        description:
            'JavaScript/TypeScript SDK for interacting with the Arweave network',
        type: 'library',
        tags: 'SDK,JavaScript,TypeScript',
        ecosystem: 'arweave',
        votes: 80,
        created_at: '2023-03-10T16:45:00Z',
        updated_at: '2023-10-08T13:20:00Z',
    },
    {
        id: 4,
        name: 'ViewBlock',
        link: 'https://viewblock.io/arweave',
        description: 'Arweave block explorer and analytics platform',
        type: 'website',
        tags: 'explorer,analytics',
        ecosystem: 'arweave',
        votes: 95,
        created_at: '2023-04-05T11:00:00Z',
        updated_at: '2023-10-07T09:10:00Z',
    },
    {
        id: 5,
        name: 'ArweaveNews',
        link: 'https://arweave.news',
        description: 'Community-driven news platform for the Arweave ecosystem',
        type: 'website',
        tags: 'news,community',
        ecosystem: 'arweave',
        votes: 70,
        created_at: '2023-05-12T14:20:00Z',
        updated_at: '2023-10-06T16:55:00Z',
    },
    {
        id: 6,
        name: 'AO CLI',
        link: 'https://github.com/FyodorovAI/ao-cli',
        description:
            'Command-line interface for interacting with the AO network',
        type: 'library',
        tags: 'CLI,developer tools',
        ecosystem: 'ao',
        votes: 85,
        created_at: '2024-05-01T08:00:00Z',
        updated_at: '2024-05-01T08:00:00Z',
    },
    {
        id: 7,
        name: 'AO Explorer',
        link: 'https://explorer.ao.network',
        description: 'Block explorer and analytics platform for the AO network',
        type: 'website',
        tags: 'explorer,analytics',
        ecosystem: 'ao',
        votes: 60,
        created_at: '2024-05-15T12:30:00Z',
        updated_at: '2024-05-15T12:30:00Z',
    },
    {
        id: 8,
        name: 'AO.NET',
        link: 'https://github.com/ao-net/ao.net',
        description: '.NET SDK for building applications on the AO network',
        type: 'library',
        tags: 'SDK,.NET,C#',
        ecosystem: 'ao',
        votes: 45,
        created_at: '2024-06-01T10:00:00Z',
        updated_at: '2024-06-01T10:00:00Z',
    },
    {
        id: 9,
        name: 'AO Wallet',
        link: 'https://aowallet.io',
        description:
            'Secure wallet for managing AO tokens and interacting with AO dApps',
        type: 'app',
        tags: 'wallet,cryptocurrency',
        ecosystem: 'ao',
        votes: 110,
        created_at: '2024-06-15T14:45:00Z',
        updated_at: '2024-06-15T14:45:00Z',
    },
    {
        id: 10,
        name: 'ArweaveAO Bridge',
        link: 'https://bridge.arweave-ao.com',
        description:
            'Bridge for transferring assets between Arweave and AO networks',
        type: 'app',
        tags: 'bridge,cross-chain',
        ecosystem: 'both',
        votes: 130,
        created_at: '2024-07-01T09:30:00Z',
        updated_at: '2024-07-01T09:30:00Z',
    },
];

export class MockDatabaseService {
    async getResources(): Promise<MultipleResourceResult> {
        return {
            status: true,
            data: mockResources,
        };
    }

    async getResourceById(id: number): Promise<SingleResourceResult> {
        const resource = mockResources.find((r) => r.id === id);
        if (resource) {
            return {
                status: true,
                data: resource,
            };
        } else {
            return {
                status: false,
                error: 'Resource not found',
            };
        }
    }
}

export const mockDatabaseService = new MockDatabaseService();
