import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { subscriptionTiersInOrder } from "@/data/subscriptionTier";
import { formatCompactNumber } from "@/lib/formatter";
import { SignUpButton } from "@clerk/nextjs";
import { cn } from "cn";
import { CheckIcon } from "lucide-react";
import type { ReactNode } from "react";

const PricingCard = ({
  name,
  priceInCents,
  maxNumberOfProducts,
  maxNumberOfVisits,
  canAccessAnalytics,
  canCustomizeBanner,
  canRemoveBranding,
}: (typeof subscriptionTiersInOrder)[number]) => {
  const isMostPopular = name === "Standard";
  return (
    <Card
      className={cn(
        "relative h-full gap-0 overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg",
        isMostPopular &&
          "border-orange-500/60 bg-gradient-to-b from-orange-50/70 to-card shadow-lg shadow-orange-500/10 ring-1 ring-orange-500/30 dark:from-orange-950/20",
      )}
    >
      <CardHeader className="min-h-[196px] gap-3 px-6 pb-5 pt-6">
        <div className="flex min-h-6 items-center justify-between gap-2">
          <span
            className={cn(
              "text-sm font-semibold uppercase tracking-wider",
              isMostPopular ? "text-orange-700 dark:text-orange-300" : "text-muted-foreground",
            )}
          >
            {name}
          </span>
          {isMostPopular && (
            <span className="whitespace-nowrap rounded-full bg-orange-100 px-2.5 py-1 text-[11px] font-semibold text-orange-800 dark:bg-orange-900/60 dark:text-orange-200">
              Most popular
            </span>
          )}
        </div>
        <CardTitle className="flex min-h-11 items-baseline gap-2 text-4xl font-bold tracking-tight">
          {priceInCents === 0 ? (
            "Free"
          ) : (
            <>
              ${priceInCents / 100}
              <span className="text-sm font-normal tracking-normal text-muted-foreground">
                / month
              </span>
            </>
          )}
        </CardTitle>
        <CardDescription className="min-h-10 text-sm leading-5">
          Up to {formatCompactNumber(maxNumberOfVisits)} pricing page visits
          per month
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <SignUpButton>
          <Button
            className="h-12 w-full rounded-xl text-sm font-semibold"
            variant={isMostPopular ? "primary" : "default"}
          >
            Get started
          </Button>
        </SignUpButton>
      </CardContent>
      <CardContent className="flex-1 border-t border-border/70 bg-background/50 px-6 pb-7 pt-5">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Plan includes
        </p>
        <div className="flex flex-col gap-3">
          <Feature>
            {maxNumberOfProducts}{" "}
            {maxNumberOfProducts > 1 ? "products" : "product"}
          </Feature>
          <Feature>PriceParity discount</Feature>
          {canCustomizeBanner && <Feature>Customizable banner</Feature>}
          {canAccessAnalytics && <Feature>Advanced analytics</Feature>}
          {canRemoveBranding && <Feature>Remove PriceParity branding</Feature>}
        </div>
      </CardContent>
    </Card>
  );
};

const Feature = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex items-start gap-3 text-sm leading-5", className)}>
      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300">
        <CheckIcon aria-hidden="true" className="size-3" />
      </span>
      <span className="text-foreground/85">{children}</span>
    </div>
  );
};

export default PricingCard;
