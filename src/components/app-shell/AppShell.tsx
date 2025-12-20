import SideNav from "@/components/app-shell/SideNav";

export default function AppShell({ session, children }: any) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <SideNav session={session} />
      <main style={{ flex: 1}}>{children}</main>
    </div>
  );
}
