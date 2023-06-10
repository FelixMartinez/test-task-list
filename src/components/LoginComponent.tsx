import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useUser } from "@auth0/nextjs-auth0/client";
import DetailPage from "@/pages/task/detail";
import { Loading } from "./ui/FullScreenLoading";

const LoginComponent = () => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/task/detail");
      return;
    }
  }, [user, router]);

  
  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      {!user && (
        <>
          <Link href="/api/auth/login">Login</Link>
        </>
      )}
    </>
  );
};

export default LoginComponent;
