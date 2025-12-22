import { getDefaultRoute } from "./helpers/index";
import { auth } from "@/lib/auth/auth";
import { RoleCode } from "@/lib/auth/role";
import { RouteAccess } from "@/lib/auth/route-access";
import { NextResponse } from "next/server";

export { auth as middleware } from "@/lib/auth/auth";

const PUBLIC_ROUTES = ["/login"];

export default auth((req) => {
  console.log("Hehe!");
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user.role as RoleCode | undefined;
  const { pathname } = req.nextUrl;

  const isPublicPage = PUBLIC_ROUTES.includes(pathname);

  if (!isLoggedIn) {
    if (isPublicPage) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isLoggedIn) {
    if (isPublicPage || pathname === "/") {
      console.log("Hehehe");
      return NextResponse.redirect(new URL(getDefaultRoute(role), req.url));
    }
    // Check Route
    const matchedRoute = RouteAccess.find((route) =>
      pathname.startsWith(route.prefix)
    );

    // Check Role
    if (matchedRoute) {
      const hasPermission = matchedRoute.roles?.includes(role as RoleCode);
      if (!hasPermission) {
        return NextResponse.redirect(new URL(getDefaultRoute(role), req.url));
      }
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public files (images, icons, fonts, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images|icons|fonts|files).*)",
  ],
};
