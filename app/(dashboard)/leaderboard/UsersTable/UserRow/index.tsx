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
            dimensions: {
              columnsPerBreakpoint: { xs: 4, sm: 4, md: 4, lg: 4, xl: 4 },
              fontSizePerBreakpoint: {
                xs: `3rem`,
                sm: `${5}vw`,
                md: `${4}vw`,
                lg: `${3.5}vw`,
                xl: `${3}vw`,
              },
            },
          }}
        />
        <CodewarsTable />
      </CollapseBoundary>
    </>
  );
}
