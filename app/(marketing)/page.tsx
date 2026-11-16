import { Button } from "@/components/ui/button";
import BrandLogo from "@/components/custom/brand-logo";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { subscriptionTiersInOrder } from "@/data/subscriptionTier";
import PricingCard from "./_components/pricing-card";
import { ClerkIcon } from "./_icons/clerk-icon";
import { NeonIcon } from "./_icons/neon-icon";

export default function HomePage() {
  return (
    <>
      <section
        id="top"
        className="hero-gradient flex min-h-screen flex-col items-center justify-center gap-8 px-4 text-center text-balance"
      >
        <h1 className="text-6xl md:text-7xl xl:text-8xl tracking-tight font-bold">
          Price Smarter, Sell bigger!
        </h1>
        <p className="text-xl lg:text-3xl max-w-7xl">
          Optimize your product pricing across countries to maximize sales.
          Capture 85% of the untapped market with location-based dynamic pricing
        </p>
        <SignUpButton>
          <Button variant="primary" className="text-lg p-6 rounded-xl flex gap-2">
            Get started for free <ArrowRightIcon className="size-5" />
          </Button>
        </SignUpButton>
      </section>
      <section className="bg-primary text-primary-foreground">
        <div className="container py-16 flex flex-col gap-16 px-4">
          <h2 className="text-3xl text-center text-balance">
            Trusted by the top modern companies
          </h2>
          <div className="grid grid-cols-2 gap-16 md:grid-cols-3 xl:grid-cols-5">
            <Link href={"#"}>
              <NeonIcon />
            </Link>
            <Link href={"#"}>
              <ClerkIcon />
            </Link>
            <Link href={"#"}>
              <NeonIcon />
            </Link>
            <Link href={"#"}>
              <ClerkIcon />
            </Link>
            <Link href={"#"}>
              <NeonIcon />
            </Link>
            <Link href={"#"}>
              <ClerkIcon />
            </Link>
            <Link href={"#"}>
              <NeonIcon />
            </Link>
            <Link href={"#"}>
              <ClerkIcon />
            </Link>
            <Link href={"#"}>
              <NeonIcon />
            </Link>
            <Link href={"#"} className="md:max-xl:hidden">
              <ClerkIcon />
            </Link>
          </div>
        </div>
      </section>
      <section id="pricing" className="bg-accent px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-semibold text-balance md:text-4xl">
          Pricing software which pays for itself 20x over
        </h2>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {subscriptionTiersInOrder.map((tier) => (
            <PricingCard key={tier.name} {...tier} />
          ))}
        </div>
      </section>
      <footer className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 pb-6 pt-14 lg:px-8">
          <div className="grid gap-10 border-b border-primary-foreground/15 pb-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
            <div className="max-w-sm">
              <Link href="#top" className="inline-flex rounded-md">
                <BrandLogo />
              </Link>
              <p className="mt-4 text-sm leading-6 text-primary-foreground/70">
                Make every market an opportunity with smarter, location-based
                pricing.
              </p>
            </div>

            <nav aria-label="Footer navigation">
              <h2 className="text-sm font-semibold">Explore</h2>
              <ul className="mt-4 space-y-3 text-sm text-primary-foreground/70">
                <li>
                  <Link
                    className="transition-colors hover:text-primary-foreground"
                    href="#pricing"
                  >
                    Pricing plans
                  </Link>
                </li>
                <li>
                  <Link
                    className="transition-colors hover:text-primary-foreground"
                    href="#top"
                  >
                    Back to top
                  </Link>
                </li>
              </ul>
            </nav>

            <div>
              <h2 className="text-sm font-semibold">Your account</h2>
              <div className="mt-4 flex flex-col items-start gap-4 text-sm text-primary-foreground/70">
                <SignInButton>
                  <button className="transition-colors hover:text-primary-foreground">
                    Sign in
                  </button>
                </SignInButton>
                <SignUpButton>
                  <Button variant="primary" className="rounded-lg">
                    Get started <ArrowRightIcon className="size-4" />
                  </Button>
                </SignUpButton>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-5 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
            <span>© PriceParity. All rights reserved.</span>
            <Link
              className="transition-colors hover:text-primary-foreground"
              href="#top"
            >
              Price smarter. Sell bigger.
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
