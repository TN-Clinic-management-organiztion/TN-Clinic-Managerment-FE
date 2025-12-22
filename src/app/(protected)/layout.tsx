import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import AppShell from "@/components/app-shell/AppShell";
import { SessionProviders } from "@/providers";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <SessionProviders>
      <AppShell session={session}>{children}</AppShell>
    </SessionProviders>
  );
}
