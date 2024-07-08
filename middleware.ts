import { authMiddleware } from "@clerk/nextjs";

// All public routes below (added webhook)
export default authMiddleware({
  publicRoutes: ["/", "/api/webhook"]
});

// export const config = {
//   matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)","/","/(api|trpc)(.*)"],
};