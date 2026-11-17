import { subscriptionTiers, TierNames } from "@/data/subscriptionTier";
import { defineRelations } from "drizzle-orm";
import {
  boolean,
  index,
  text,
  timestamp,
  uuid,
  pgTable,
  real,
  primaryKey,
  pgEnum,
} from "drizzle-orm/pg-core";

const createdAt = timestamp("created_at", { withTimezone: true })
  .notNull()
  .defaultNow();
const updatedAt = timestamp("updated_at", { withTimezone: true })
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());

export const tierEnum = pgEnum(
  "tier",
  Object.keys(subscriptionTiers) as [TierNames],
);

export const products = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    clerkUserId: text("clerk_user_id").notNull(),
    name: text("name").notNull(),
    url: text("url").notNull(),
    createdAt,
    updatedAt,
  },
  (table) => [index("clerk_user_id_index").on(table.clerkUserId)],
);

export const productCustomizations = pgTable("product_customizations", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" })
    .unique(),
  locationMessage: text("location_message")
    .notNull()
    .default(
      "Hey! It looks like you are from <b>{country}</b>. We support Parity Purchasing Power, so if you need it, use code <b>“{coupon}”</b> to get <b>{discount}%</b> off.",
    ),
  backgroundColor: text("background_color")
    .notNull()
    .default("hsl(193, 82%, 31%)"),
  textColor: text("text_color").notNull().default("hsl(0, 0%, 100%)"),
  fontSize: text("font_size").notNull().default("1rem"),
  bannerContainer: text("banner_container").notNull().default("body"),
  isSticky: boolean("is_sticky").notNull().default(true),
  createdAt,
  updatedAt,
});

export const countryGroups = pgTable("country_groups", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  recommendedDiscountPercentage: real("recommended_discount_percentage"),
  createdAt,
  updatedAt,
});

export const countries = pgTable("countries", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  code: text("code").notNull().unique(),
  countryGroupId: uuid("country_group_id")
    .notNull()
    .references(() => countryGroups.id, { onDelete: "cascade" }),
  createdAt,
  updatedAt,
});

export const productViews = pgTable("product_views", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  countryId: uuid("country_id")
    .notNull()
    .references(() => countries.id),
  visitedAt: timestamp("visited_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const countryGroupDiscounts = pgTable(
  "country_group_discount",
  {
    countryGroupId: uuid("country_group_id")
      .notNull()
      .references(() => countryGroups.id, { onDelete: "cascade" }),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    coupon: text("coupon").notNull(),
    discountPercentage: real("discount_percentage").notNull(),
    createdAt,
    updatedAt,
  },
  (table) => [primaryKey({ columns: [table.countryGroupId, table.productId] })],
);

export const userSubscriptions = pgTable("user_subscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkUserId: text("clerk_user_id").notNull(),
  stripeSubscriptionItemId: text("stripe_subscription_item_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  stripeCustomerId: text("stripe_customer_id"),
  tier: tierEnum("tier").notNull(),
});

export const relations = defineRelations(
  {
    products,
    productCustomizations,
    productViews,
    countries,
    countryGroups,
    countryGroupDiscounts,
  },
  (r) => ({
    products: {
      productCustomization: r.one.productCustomizations({
        from: r.products.id,
        to: r.productCustomizations.productId,
      }),
      productViews: r.many.productViews({
        from: r.products.id,
        to: r.productViews.productId,
      }),
      countryGroupDiscounts: r.many.countryGroupDiscounts({
        from: r.products.id,
        to: r.countryGroupDiscounts.productId,
      }),
    },
    productCustomizations: {
      product: r.one.products({
        from: r.productCustomizations.productId,
        to: r.products.id,
      }),
    },
    productViews: {
      product: r.one.products({
        from: r.productViews.productId,
        to: r.products.id,
      }),
      country: r.one.countries({
        from: r.productViews.countryId,
        to: r.countries.id,
      }),
    },
    countries: {
      countryGroup: r.one.countryGroups({
        from: r.countries.countryGroupId,
        to: r.countryGroups.id,
      }),
      productViews: r.many.productViews({
        from: r.countries.id,
        to: r.productViews.countryId,
      }),
    },
    countryGroups: {
      countries: r.many.countries({
        from: r.countryGroups.id,
        to: r.countries.countryGroupId,
      }),
      countryGroupDiscounts: r.many.countryGroupDiscounts({
        from: r.countryGroups.id,
        to: r.countryGroupDiscounts.countryGroupId,
      }),
    },
    countryGroupDiscounts: {
      product: r.one.products({
        from: r.countryGroupDiscounts.productId,
        to: r.products.id,
      }),
      countryGroup: r.one.countryGroups({
        from: r.countryGroupDiscounts.countryGroupId,
        to: r.countryGroups.id,
      }),
    },
  }),
);

export type TInsertProduct = typeof products.$inferInsert;
export type TSelectProduct = typeof products.$inferSelect;

export type TInsertProductCustomization =
  typeof productCustomizations.$inferInsert;
export type TSelectProductCustomization =
  typeof productCustomizations.$inferSelect;

export type TInsertProductView = typeof productViews.$inferInsert;
export type TSelectProductView = typeof productViews.$inferSelect;

export type TInsertCountryGroup = typeof countryGroups.$inferInsert;
export type TSelectCountryGroup = typeof countryGroups.$inferSelect;

export type TInsertCountryGroupDiscount =
  typeof countryGroupDiscounts.$inferInsert;
export type TSelectCountryGroupDiscount =
  typeof countryGroupDiscounts.$inferSelect;

export type TInsertCountry = typeof countries.$inferInsert;
export type TSelectCountry = typeof countries.$inferSelect;

export type TInsertUserSubscription = typeof userSubscriptions.$inferInsert;
export type TSelectUserSubscription = typeof userSubscriptions.$inferSelect;
