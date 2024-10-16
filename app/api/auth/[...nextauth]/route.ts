import NextAuth from "next-auth";
import { authOptions } from "@/utils/authOptions";

export const dynamic = 'force-dynamic';

// Initialize NextAuth with the authOptions
export const handler = NextAuth(authOptions) as never;

// Export handlers for GET and POST requests
export { handler as GET, handler as POST };
