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
        <CodewarsStats
          {...{
            email,
            columnsPerBreakpoint: { xs: 4, sm: 4, md: 4, lg: 4, xl: 4 },
          }}
        />
        <CodewarsTable />
      </CollapseBoundary>
    </>
  );
}
