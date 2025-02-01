import React from "react";
import { useAuth } from "../../context/AuthContext";
import {
  startRegistration,
  startAuthentication,
} from "@simplewebauthn/browser";

interface WebAuthnProps {
  user: { email: string } | null;
}

const API_URL = process.env.REACT_APP_API_URL_LOCAL;


export const WebAuthn: React.FC<WebAuthnProps> = ({ user }) => {
  const { user: authUser } = useAuth();

  const registerPasskey = async () => {
    try {
      // Get registration options from server
      const optionsRes = await fetch(`${API_URL}/api/auth/register/options`, {
        method: "POST",
        credentials: "include",
      });
      const options = await optionsRes.json();

      // Create credentials
      const registration = await startRegistration(options);

      // Verify registration with server
      const verificationRes = await fetch(
        `${API_URL}/api/auth/register/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(registration),
        }
      );

      const verification = await verificationRes.json();
      if (verification.verified) {
        alert("Passkey registered successfully!");
      }
    } catch (error) {
      console.error("Error registering passkey:", error);
      alert("Failed to register passkey");
    }
  };

  const authenticateWithPasskey = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL_LOCAL;
      const optionsRes = await fetch(
        `${API_URL}/api/auth/authenticate/options`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user?.email || "" }),
        }
      );
      const options = await optionsRes.json();

      // Authenticate with the passkey
      const authentication = await startAuthentication(options);

      // Verify with server
      const verificationRes = await fetch(
        `${API_URL}/api/auth/authenticate/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(authentication),
        }
      );

      const verification = await verificationRes.json();
      if (verification.verified) {
        alert("Successfully authenticated with passkey!");
      }
    } catch (error) {
      console.error("Error authenticating with passkey:", error);
      alert("Failed to authenticate with passkey");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Passkey Settings</h2>
      <button
        onClick={registerPasskey}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Register New Passkey
      </button>
      <button
        onClick={authenticateWithPasskey}
        className="ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Login with Passkey
      </button>
    </div>
  );
};
