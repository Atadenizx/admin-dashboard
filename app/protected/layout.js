// "use client";

// import { useRouter } from "next/navigation";
// import { useUser } from "../_lib/Auth";

// export default function ProtectedLayout({ children }) {
//   const user = useUser();
//   const router = useRouter();

//   if (!user) return router.push("/login");

//   return <main>{children}</main>;
// }
