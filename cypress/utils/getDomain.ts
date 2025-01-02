import { localUrl } from "../constants/urls";

const getDomain = (Domain: string) => {
  const isLocalURL = Domain === "/";
  return isLocalURL ? localUrl : Domain;
};

export default getDomain;
