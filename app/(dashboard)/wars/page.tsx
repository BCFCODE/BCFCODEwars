import { auth } from "@/auth";
import UnderDevelopment from "../UnderDevelopment";
import { CodewarsUsernameChecker } from "./codewars/users/validation";

const WarsMainPage = async () => {
  const session = await auth();

  return <>
  <CodewarsUsernameChecker />
  <UnderDevelopment pageName="Wars"/>
  </>;
};

export default WarsMainPage;
