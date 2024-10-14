// src/lib/constants.ts
import type { SortOption, Selected } from './types';

export const SORT_OPTIONS: SortOption[] = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'newest', label: 'Most Recent' },
    { value: 'alphabetical', label: 'Alphabetical' },
];

export const CATEGORIES: Selected<string>[] = [
    { value: 'all', label: 'All Categories' },
    { value: 'defi', label: 'DeFi (Decentralized Finance)' },
    { value: 'social', label: 'Social & Communication' },
    { value: 'storage', label: 'Storage & Data Management' },
    { value: 'nft', label: 'NFTs & Digital Collectibles' },
    { value: 'gaming', label: 'Gaming & Metaverse' },
    { value: 'identity', label: 'Identity & Authentication' },
    { value: 'dao', label: 'DAOs & Governance' },
    { value: 'infrastructure', label: 'Infrastructure & Scalability' },
    { value: 'analytics', label: 'Analytics & Data Visualization' },
    { value: 'content', label: 'Content Creation & Publishing' },
    { value: 'privacy', label: 'Privacy & Security' },
    { value: 'education', label: 'Education & Research' },
    { value: 'marketplace', label: 'Marketplaces & Exchanges' },
    { value: 'integration', label: 'Integrations & Interoperability' },
];

export const SUBMISSION_TYPES: Selected<string>[] = [
    { value: 'all', label: 'All Types' },
    { value: 'application', label: 'Application (App)' },
    { value: 'website', label: 'Website' },
    { value: 'library', label: 'Library/SDK' },
    { value: 'smart-contract', label: 'Smart Contract' },
    { value: 'tool', label: 'Tool/Utility' },
    { value: 'documentation', label: 'Documentation' },
    { value: 'tutorial', label: 'Tutorial/Guide' },
    { value: 'wallet', label: 'Wallet' },
    { value: 'explorer', label: 'Explorer/Indexer' },
    { value: 'gateway', label: 'Gateway' },
    { value: 'community', label: 'Community Resource' },
    { value: 'token', label: 'Token/Cryptocurrency' },
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
