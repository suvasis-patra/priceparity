import { SignUp } from "@clerk/nextjs";
import { Suspense } from "react";

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-[32rem]" aria-hidden="true" />}>
      <SignUp />
    </Suspense>
  );
}
