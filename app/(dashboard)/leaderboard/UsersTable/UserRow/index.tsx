import { AuthenticatedUser } from "@/types/users";
import User from "./Cells";
import CollapseBoundary from "./Cells/CollapseButton";
import CodewarsTable from "./Cells/CollapseButton/CodewarsTable";

interface Props {
  currentUser: AuthenticatedUser;
}

export default function UserRow({ currentUser }: Props) {


  
  return (
    <>
      <User />
      <CollapseBoundary>
        <CodewarsTable />
      </CollapseBoundary>
    </>
  );
}
