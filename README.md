# real-time-chat

## What's inside?

This Turborepo includes the following packages, apps and configuration:

### Apps, Packages and Configuration

- `api`: a [Fastify](https://fastify.dev/) backend application;
- `web`: another [Next.js](https://nextjs.org/) frontend application;
- `@repo/shadcn-ui`: a stub React component shared by `web` application;
- `@repo/tailwind-config`: a [Tailwind](https://tailwindcss.com/) configuration file;
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`);
- `@repo/tsconfig`: `tsconfig.json`s used throughout the monorepo.


Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```
