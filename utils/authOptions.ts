import { AuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { JWT } from "next-auth/jwt";
import { Session, Account } from "next-auth";

export const authOptions: AuthOptions = {
    providers: [
        KeycloakProvider({
            clientId: process.env.KEYCLOAK_CLIENT_ID || "",
            clientSecret: process.env.KEYCLOAK_CLIENT_SECRET || "",
            issuer: process.env.KEYCLOAK_ISSUER
        })
    ],

    pages: {
        error: '/api/auth/signin'
    },

    debug: true,

    callbacks: {
        async jwt({ token, account }: { token: JWT; account?: Account | null }) {
            console.log("JWT callback - token:", token);
            console.log("JWT callback - account:", account);

            if (account?.id_token) {
                token.idToken = account.id_token;
            }

            return token;
        },

        async session({ session, token }: { session: Session; token: JWT }) {
            console.log("Session callback - session:", session);
            console.log("Session callback - token:", token);

            session.idToken = token.idToken as string | undefined;
            return session;
        }
    }
};
