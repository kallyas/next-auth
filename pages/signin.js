import { signIn } from "next-auth/react";

export default function signin() {
  return (
    <div className="parent container d-flex justify-content-center align-items-center h-100">
      <button type="button" onClick={() => signIn()}>
        Sign In
      </button>
    </div>
  );
}
