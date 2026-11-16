import BrandLogo from "@/components/custom/brand-logo";
import { Show, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { Suspense } from "react";

const Navbar = () => {
  return (
    <header className="flex py-6 shadow-xl bg-background/95 fixed top-0 z-10 w-full">
      <nav className="container flex items-center gap-10 ">
        <Link href={"/"} className="mr-auto">
          <BrandLogo />
        </Link>
        <Link href={"#"} className="text-lg capitalize">
          feature
        </Link>
        <Link href={"#"} className="text-lg capitalize">
          pricing
        </Link>
        <Link href={"#"} className="text-lg capitalize">
          about
        </Link>
        <span className="font-semibold capitalize">
          <Suspense fallback={null}>
            <Show when={"signed-in"}>
              <Link href={"/dashboard"}>Dashboard</Link>
            </Show>
            <Show when={"signed-out"}>
              <SignInButton>login</SignInButton>
            </Show>
          </Suspense>
        </span>
      </nav>
    </header>
  );
};

export default Navbar;
