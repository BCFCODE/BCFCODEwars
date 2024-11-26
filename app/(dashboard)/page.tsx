// app/(dashboard)/page.tsx
import { auth } from "../../auth";
import UnderDevelopment from "./UnderDevelopment";

export default async function HomePage() {
  const session = await auth();

  return <UnderDevelopment pageName="Dashboard" />;
}
