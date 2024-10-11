// src/lib/constants.ts
import type { SortOption, Selected } from './types';

export const SORT_OPTIONS: SortOption[] = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'newest', label: 'Most Recent' },
    { value: 'alphabetical', label: 'Alphabetical' },
];

export const CATEGORIES: Selected<string>[] = [
    { value: 'all', label: 'All Categories' },
    { value: 'app', label: 'Apps' },
    { value: 'meme-coin', label: 'Meme Coins' },
    { value: 'project', label: 'Projects' },
    { value: 'websites', label: 'Websites' },
    { value: 'tutorial', label: 'Tutorials' },
    { value: 'library', label: 'Libraries' },
    { value: 'smart-contract', label: 'Smart Contracts' },
];

export const ECOSYSTEMS: Selected<string>[] = [
    { value: 'all', label: 'All Ecosystems' },
    { value: 'arweave', label: 'Arweave' },
    { value: 'ao', label: 'AO' },
];

// src/lib/constants.ts

export const TAGS = [
    // General
    'decentralized',
    'blockchain',
    'web3',
    'cryptocurrency',
    'open-source',

    // Arweave-specific
    'permanent-storage',
    'data-storage',
    'permaweb',
    'ar-token',

    // AO-specific
    'ao-token',
    'compute-market',
    'distributed-computing',

    // Common use cases
    'file-sharing',
    'social-media',
    'nft',
    'defi',
    'dao',
    'identity',
    'messaging',

    // Development-related
    'smart-contract',
    'dapp',
    'sdk',
    'api',
    'library',
    'framework',
    'developer-tools',

    // Infrastructure
    'node',
    'gateway',
    'explorer',
    'indexer',

    // Wallet and transactions
    'wallet',
    'browser-extension',
    'mobile-app',
    'transaction',
    'atomic-assets',

    // Integration and interoperability
    'bridge',
    'cross-chain',
    'multichain',

    // Community and governance
    'community',
    'governance',
    'voting',

    // Content and media
    'content-creation',
    'publishing',
    'blogging',
    'video',
    'audio',
    'streaming',

    // Analytics and data
    'analytics',
    'data-visualization',
    'machine-learning',
    'ai',

    // Security and privacy
    'encryption',
    'privacy',
    'anonymity',

    // Economic models
    'tokenomics',
    'incentive-system',
    'profit-sharing',

    // Emerging concepts
    'metaverse',
    'augmented-reality',
    'virtual-reality',
    'iot',

    // Ecosystem-specific applications
    'ardrive',
    'arconnect',
    'arweave-news',
    'viewblock',
    'ao-cli',
    'ao-explorer',

    // Development status
    'production',
    'beta',
    'alpha',
    'concept',

    // Other
    'education',
    'documentation',
    'tutorial',
    'use-case',
];
