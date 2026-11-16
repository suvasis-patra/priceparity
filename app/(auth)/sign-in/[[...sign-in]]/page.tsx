import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-128" aria-hidden="true" />}>
      <SignIn />
    </Suspense>
  );
}
