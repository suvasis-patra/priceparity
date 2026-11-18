import { db } from "@/db/drizzle";
import {
  products,
  TInsertUserSubscription,
  userSubscriptions,
} from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createUserSubscription(data: TInsertUserSubscription) {
  return await db
    .insert(userSubscriptions)
    .values(data)
    .onConflictDoNothing({ target: userSubscriptions.clerkUserId });
}

export async function deleteUser(userId: string) {
  return await db.batch([
    db
      .delete(userSubscriptions)
      .where(eq(userSubscriptions.clerkUserId, userId)),
    db.delete(products).where(eq(products.clerkUserId, userId)),
  ]);
}
