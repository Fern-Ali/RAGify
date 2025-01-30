
# Create Toolpad App

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-toolpad-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Setup
To install all dependencies from `package.json` file, run the command
```
npm install
```

If you get warnings about deprecated packages, you can investigate which parent package dependends on it in `package.json` file using the command
```
npm ls <package-name>
```


## Authentication
Next you need to generate a secret for authentication. By running the next command, this creates a `.env.local` file and saves the secret in the variable `AUTH_SECRET`:
```
npx auth secret
``` 

Add the CLIENT_ID and CLIENT_SECRET from your OAuth provider to the .env.local file.

## Getting Started

First, run the development server: `npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
