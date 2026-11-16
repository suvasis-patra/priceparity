import { auth } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const { redirectToSignIn, userId } = await auth();
  if (!userId) {
    redirectToSignIn();
  }
  return <div>Dashboard</div>;
}
