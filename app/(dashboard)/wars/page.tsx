import { auth } from "@/auth";
import UnderDevelopment from "../UnderDevelopment";

const WarsMainPage = async () => {
  const session = await auth();

  return <UnderDevelopment pageName="Wars"/>;
};

export default WarsMainPage;
