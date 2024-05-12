# StashAway Exchange-Traded Funds (ETFs)

This is a monorepo application demonstrating a carefully curated selection of Exchange-Traded Funds (ETFs) that are tailored to meet different investment objectives.

## Getting started

### Prerequisites

You must make sure following requirements are installed on your computer.

- [Node.js](https://nodejs.org/): Make sure to install the LTS version specified in the [.nvmrc](./.nvmrc) file. You can rely on NVM (Node Version Manager) to switch to the target node version. Refer below for more info.
   - Linux/MacOS - https://github.com/nvm-sh/nvm
   - Windows - https://github.com/coreybutler/nvm-windows
- This monorepo use [yarn workspace](https://classic.yarnpkg.com/lang/en/docs/workspaces/). So its recommended to use [yarn](https://yarnpkg.com/getting-started/install) as the package manager.

### Installing dependencies

All the dependencies are hoisted. Use below command to install the dependencies.

```bash
yarn
```
### Starting the CMS

You can start the Strapi application in development mode using

```bash
yarn cms:dev
```
