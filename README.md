This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# project configuration

This project requires setting some values ​​in the `.env` file. Make sure to create a `.env` file in the root of the project and provide the following values:

PORT
NODE_PATH
NODE_ENV
NEXT_PUBLIC_APP_WORKSPACE_ENDPOINT
NEXT_PUBLIC_APP_AUTH_PROFILE_ID
NEXT_PUBLIC_APP_AUTH_CLIENT_ID
NEXT_PUBLIC_APP_AUTH_DOMAIN

# A long, secret value used to encrypt the session cookie
AUTH0_SECRET
# The base url of your application
AUTH0_BASE_URL
# The url of your Auth0 tenant domain
AUTH0_ISSUER_BASE_URL
# Your Auth0 application's Client ID
AUTH0_CLIENT_ID
# Your Auth0 application's Client Secret
AUTH0_CLIENT_SECRET

## Utility functions

The project includes some useful functions that you can use:

### `getFormatDistanceToNow(date: number): string`

This function takes a date in milliseconds and returns a string indicating how much time has passed since that date. It uses the `date-fns` library and the Spanish language.

### `convertDateStringToTimeInMilliseconds(dateString: string): number`

This function converts a text string representing a date to milliseconds. It uses the JavaScript `Date` class.

### `isValidEmail(email: string): boolean`

This function checks if an email address is valid using a regular expression.

### `isEmail(email: string): string | undefined`

This function checks if an email address is valid and returns an error message if it is not.

## Apollo Client Configuration

The project uses the Apollo Client to interact with a GraphQL server. Files related to Apollo Client are located in the `shared/apollo` folder. Be sure to review those files and correctly set the GraphQL server URL to `NEXT_PUBLIC_APP_WORKSPACE_ENDPOINT`.

## User context and authentication

The project uses the user and authentication context provided by the `8base-react-sdk` library. Be sure to review the files related to authentication and set the environment variables related to Auth0 correctly.

## Apollo Cache

The project uses an Apollo Client cache to store the data retrieved from the server. Be sure to review the files related to the cache and queries/mutations to ensure that the data is being stored and updated correctly.

## Other details

The project uses other dependencies and features that may require additional configuration. Be sure to review the provided files and follow the corresponding setup instructions.

Enjoy the project!
