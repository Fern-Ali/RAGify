import NextAuth from "next-auth";

// we're editing the next-auth User and Session, extending it with the new values we want

declare module "next-auth" {
    interface User {
      id: string; // `id` is a number
      name: string;
      email: string;
      //sessionId: string | null;
    }
  
    interface Session {
      user: {
        id: string; // `id` is a number
        name: string;
        email: string;
        sessionId: string | null;
      };
    }
  
    interface JWT {
      id: string; // `id` is a number
      name: string;
      email: string;
      sessionId: string | null;
    }
  }

  