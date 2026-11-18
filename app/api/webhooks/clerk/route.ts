import { createUserSubscription, deleteUser } from "@/server/db/subscription";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    const { id } = evt.data;
    const eventType = evt.type;
    if (!id) {
      return new Response("User id not found", { status: 400 });
    }

    switch (eventType) {
      case "user.created":
        await createUserSubscription({ clerkUserId: id, tier: "Free" });
        break;
      case "user.deleted":
        if (evt.data.id !== undefined) {
          const result = await deleteUser(evt.data.id);
          if (!result) {
            return new Response("Failed to delete user", { status: 400 });
          }
        }
        break;
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
