import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import type { Provider } from 'next-auth/providers';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const providers: Provider[] = [Credentials({
  credentials: {
    email: { label: 'Email Address', type: 'email' },
    username: { label: 'Username', type: 'text' },
    password: { label: 'Password', type: 'password' },
  },
  authorize: async (c) => {
    if (c.password !== '@demo1') {
      return null;
    }
    
    const email = String(c.email);
    const name = c.username? c.username: email.split("@")[0]

    // Check if the user exists in the database
  let user = await prisma.user.findUnique({
    where: { email },
  });

  // If the user exists, log in and add existing user to session via callback
  if (user){
    console.log(`Existing user found: ${user}`)
  }
  // If the user doesn't exist, create a new one
  if (!user) {
    user = await prisma.user.create({
      data: {
        name: name.toString(),
        email: email,
      },
    });
    console.log(`New user created: ${email}`);
  }

  return {
    // id: user.id.toString(),
    id: user.id.toString(),
    name: user.name,
    email: user.email,
    sessionId: null, // Can update with actual session logic
  };
  },
}),
];




export const providerMap = providers.map((provider) => {
  if (typeof provider === 'function') {
    const providerData = provider();
      return { id: providerData.id, name: providerData.name };
  }
  return { id: provider.id, name: provider.name };
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  
  
      
  secret: process.env.AUTH_SECRET,
  
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.sessionId = user.sessionId; // Add sessionId to the token
      }

      // Fetch the sessionId from the API route
      const response = await fetch(`${process.env.NEXTAUTH_URL}/api/middleware/session/thread?userId=${token.id}`);
      const { sessionId } = await response.json();
  
      // Update the token with the latest sessionId
      if (sessionId !== token.sessionId) {
        token.sessionId = sessionId;
      }
  
      return token;
    },

    // Include custom fields in the session
    async session({ session, token }) {
      session.user.id = token.id as unknown as string; // Convert to number if needed
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      session.user.sessionId = token.sessionId as string; // Attach session ID
      return session;
    },
    authorized({ auth: session, request: { nextUrl } }) {
      const isLoggedIn = !!session?.user;
      const isPublicPage = nextUrl.pathname.startsWith('/public');

      if (isPublicPage || isLoggedIn) {
        return true;
      }

      return false; // Redirect unauthenticated users to login page
    },
  },
  logger: {
    error: (code, ...metadata) => {
      console.error(`[NextAuth][Error][${code}]`, metadata);
    },
    warn: (code) => {
      console.warn(`[NextAuth][Warning][${code}]`);
    },
    debug: (code, ...metadata) => {
      console.debug(`[NextAuth][Debug][${code}]`, metadata);
    },
  },
  // debug: true, // Enable debug mode for additional logs
  trustHost: true,
});
  