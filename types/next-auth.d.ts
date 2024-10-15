// src/next-auth.d.ts

import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        idToken?: string; // Add idToken to Session
    }
}
