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
    // Wallet and Transactions
    'wallet',
    'transaction',
    'escrow',
    'micropayments',

    // User Applications
    'browser-extension',
    'mobile-app',
    'social-media',
    'messaging',
    'file-sharing',
    'gaming',
    'metaverse',
    'nft',

    // Code and Development
    'smart-contract',
    'smart-contracts',
    'dapp',
    'dapps',
    'sdk',
    'api',
    'library',
    'framework',
    'developer-tools',
    'tutorial',

    // Financial Ecosystem
    'defi',
    'stablecoins',
    'yield-farming',
    'liquidity-pool',
    'tokens',
    'tokenomics',

    // Governance and DAOs
    'dao',
    'governance',
    'reputation',
    'crowdfunding',

    // Infrastructure and Protocols
    'storage',
    'data-indexing',
    'oracle',
    'staking',
    'bridge',
    'interoperability',
    'cross-chain',
    'layer2',

    // Privacy and Security
    'privacy',
    'zk-snarks',
    'identity',
    'digital-rights',
    'digital-ownership',

    // Community and Tools
    'community-tools',
    'archiving',
    'web3',
];
