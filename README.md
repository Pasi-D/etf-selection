# StashAway Exchange-Traded Funds (ETFs)

This is a monorepo application demonstrating a carefully curated selection of Exchange-Traded Funds (ETFs) that are tailored to meet different investment objectives.

## Getting started

### Prerequisites

You must make sure following requirements are installed on your computer.

- [Node.js](https://nodejs.org/): Make sure to install the LTS version specified in the [.nvmrc](./.nvmrc) file. You can rely on NVM (Node Version Manager) to switch to the target node version. Refer below for more info.
   - Linux/MacOS - https://github.com/nvm-sh/nvm
   - Windows - https://github.com/coreybutler/nvm-windows
- Also its recommended to have [Python](https://www.python.org/downloads/) on your computer as we're using [Strapi](https://docs.strapi.io/) with SQLite.
- This monorepo use [yarn workspace](https://classic.yarnpkg.com/lang/en/docs/workspaces/). So its recommended to use [yarn](https://yarnpkg.com/getting-started/install) as the package manager.

### Installing dependencies

All the dependencies are hoisted. Use below command to install the dependencies.

```bash
yarn
```
### Seed CMS data

You can import [seed.tar.gz](securities-studio/seed.tar.gz) file that contains sample data using below command.

```bash
yarn cms:seed
```

### Starting the CMS in development mode

You can start the Strapi application in development mode using

```bash
yarn cms:dev
```
Then you can go to http://localhost:1337/ and navigate to the Strapi administration panel to do the necessary add/edit and delete security operations.

Refer [strapi quickstart guide](https://docs.strapi.io/dev-docs/quick-start#step-2-register-the-first-local-administrator-user) if this is your first time using Strapi.

### Starting the web app in development mode

First of all, create a Strapi API token with the appropriate permisions.

Then create a copy of [`.env.dist`](securities-web-app/.env.dist)

```bash
cp .env.dist .env.local
```

Update the environment variables with appropriate values.

Then you can start the NextJS application from the root directory using 

```bash
yarn web:dev
```

You can navigate to http://localhost:3000 to view the web application.

***You need to have both CMS & Web app running parallely***