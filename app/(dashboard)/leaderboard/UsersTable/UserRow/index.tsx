import User from "./Cells";
import CollapseBoundary from "./Cells/CollapseButton";
import CodewarsTable from "./Cells/CollapseButton/CodewarsTable";

export default function UserRow() {
  return (
    <>
      <User />
      <CollapseBoundary>
        <CodewarsTable />
      </CollapseBoundary>
    </>
  );
}
