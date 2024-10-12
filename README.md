# Arweave Ecosystem Resource Directory

## Overview

The Arweave Ecosystem Resource Directory is a decentralized platform designed to facilitate the discovery and sharing of resources within the Arweave ecosystem. It provides a comprehensive listing of applications, websites, libraries, and tools built on Arweave technology.

It is hosted on Arweave and data is stored using AO's [sqlite module.](https://github.com/permaweb/aos-sqlite)

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Startup AOS process

Startup:
`aos ecosystem-database --wallet .aos.json --module=ghSkge2sIUD_F00ym5sEimC63BDBuBrq4b5OcwxOjiw`
`.load src/lib/database/database.lua`
`Send({ Target = ao.id, Action = "Query", Data = "SELECT ..." })`
