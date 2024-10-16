"use client";
import { Button } from "@mui/material";
import { signOut, getSession } from "next-auth/react";

const Logout: React.FC = () => {
  const handleLogout = async () => {
    try {
      const session = await getSession();

      await signOut({
        redirect: false,
      });

      const keycloakLogoutUrl = `${process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER}/protocol/openid-connect/logout?post_logout_redirect_uri=${window.location.origin}&client_id=${process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID}&id_token_hint=${session?.idToken}`;

      window.location.href = keycloakLogoutUrl;
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Button onClick={handleLogout} variant="contained" sx={{ backgroundColor: '#fff', color: '#000', textTransform: 'none' }}>Sign Out</Button>
  );
};

export default Logout;
