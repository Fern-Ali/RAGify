
# Create Toolpad App

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-toolpad-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Installing Project Dependencies
To install all dependencies from `package.json` file, run the command
```
npm install
```

If you get warnings about deprecated packages, you can investigate which parent package dependends on it in `package.json` file using the command
```
npm ls <package-name>
```
## PostgreSQL Local Setup
If you don’t have PostgreSQL installed, you’ll need to do that. The installation process depends on your OS. Here are instructions on Ubuntu/Debian:
1.  To install PostgreSQL, run the commands:
```
sudo apt update
sudo apt install postgresql postgresql-contrib
```
2. Start the PostgreSQL service to ensure it’s running:
```
sudo service postgresql start
```
3. Log in to the PostgreSQL shell as the default `postgres` user:
```
sudo -u postgres psql
```
4. Create a new database and user:
```SQL
CREATE DATABASE yourdatabase;
CREATE USER yourusername WITH PASSWORD 'yourpassword';
GRANT ALL PRIVILEGES ON DATABASE yourdatabase TO yourusername;
```
5. Exit the PostgreSQL shell:
```SQL
\q
```
6. Now you can connect to the PostgreSQL database from the command line:
```
psql -U yourusername -d yourdatabase
```
### PostgreSQL Connection Configuration
The project will need a .env file that stores your PostgreSQL connection details. The .env file should be in the root of your project. In your project directory, create a .env file if it doesn’t already exist and add the following contents:
```
DB_USERNAME=yourusername
DB_PASSWORD=yourpassword
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=yourdatabase
DATABASE_URL="postgresql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?schema=public"
```
- `DB_USERNAME`: The PostgreSQL username (default is usually postgres).
- `DB_PASSWORD`: The password for your PostgreSQL user.
- `DB_HOST`: The database host (use localhost if running locally).
- `DB_PORT`: The port for PostgreSQL (default is 5432).
- `DB_DATABASE`: The name of the database you want to use (this can be any name you prefer).
Note: Do not change anything in `DATABASE_URL`. Prisma will read the `DATABASE_URL` from the `.env file` and use it to connect to your PostgreSQL database.

Migrate the database schema to your local database using Prisma:
```
npx prisma migrate dev
```
This command will:
- Connect to the PostgreSQL database using the credentials from your .env file.
- Apply any existing migrations (create tables, columns, etc.) to the database.
- Create a new migration if necessary.
If this is your first time setting up the database, Prisma will create an initial migration file based on your `schema.prisma` file.

Once the migrations are applied, you need to generate the Prisma client. This is the code Prisma uses to interact with your database:
```
npx prisma generate
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
