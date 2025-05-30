import CodewarsStats from "@/app/components/CodewarsStats";
import User from "./Cells";
import CollapseBoundary from "./Cells/CollapseButton";
import CodewarsTable from "./Cells/CollapseButton/CodewarsTable";

interface Props {
  email: string;
}

export default function UserRow({ email }: Props) {
  return (
    <>
      <User />
      <CollapseBoundary>
        <CodewarsStats {...{ email }} />
        <CodewarsTable />
      </CollapseBoundary>
    </>
  );
}
