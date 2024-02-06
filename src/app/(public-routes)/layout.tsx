import { redirect } from "next/navigation";
import { getSession } from "@auth0/nextjs-auth0";
import { ReactNode } from "react";

interface PtivateLayoutProps {
  children: ReactNode;
}

export default async function PtivateLayout({ children }: PtivateLayoutProps) {
  const user = await getSession();

  if (user) {
    redirect("/challenges");
  }

  return <>{children}</>;
}
