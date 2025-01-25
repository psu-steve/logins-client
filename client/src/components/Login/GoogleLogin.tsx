import { GoogleLogin as GoogleOAuthLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

interface GoogleLoginProps {
  onSuccess: (response: any) => void;
  onError: () => void;
}

export function GoogleLogin({ onSuccess, onError }: GoogleLoginProps) {
  return (
    <GoogleOAuthLogin
      onSuccess={(credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential!);
        onSuccess(decoded);
      }}
      onError={onError}
      useOneTap
    />
  );
}
