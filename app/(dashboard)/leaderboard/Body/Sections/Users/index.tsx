import CodewarsSection from "../Codewars";
import CollapseSection from "../Collapse";
import User from "./UserCells";

export function UsersSection() {
  return (
    <>
      <User />
      <CollapseSection>
        <CodewarsSection />
      </CollapseSection>
    </>
  );
}
