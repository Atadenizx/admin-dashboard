// import { NextResponse } from "next/server";
// import { useUser } from "./app/_lib/Auth";

// export function middleware(request) {
//   const user = useUser();

//   if (!user) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/protected/:path*"],
// };

// middleware.js or middleware.ts (based on your setup)
import { NextResponse } from "next/server";
import { adminAuth } from "@/app/_lib/firebaseAdmin";
import nookies from "nookies";

export async function middleware(request) {
  const { token } = nookies.get(request);

  try {
    if (token) {
      // Verify token with Firebase Admin SDK
      await adminAuth.verifyIdToken(token);
      return NextResponse.next(); // User is authenticated, proceed to the requested page
    } else {
      return NextResponse.redirect(new URL("/login", request.url)); // Redirect if no token
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.redirect(new URL("/login", request.url)); // Redirect on verification failure
  }
}

export const config = {
  matcher: ["/protected/:path*"], // Apply middleware to paths starting with /protected
};
