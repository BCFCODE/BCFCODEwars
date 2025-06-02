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
            gaugeStyles: {
              columnsPerBreakpoint: { xs: 4, sm: 4, md: 4, lg: 4, xl: 4 },
              gaugeInnerTextSX: {
                transform: "translate(0px, 0px)",
                transition: "font-size 1s ease",
                "@media min-width(300px)": {
                  fontSize: 2,
                },
                "@media min-width(1200px)": {
                  fontSize: `${0.1}rem`,
                },
              },
              gaugeFooterTextSX: {
                // textAlign: "center",
                // fontSize: {
                //   xs: `${0.7}rem`,
                //   sm: `${1}rem`,
                //   md: `${1}rem`,
                //   lg: `${1.2}rem`,
                //   xl: `${1}rem`,
                // },
              },
            },
          }}
        />
        <CodewarsTable />
      </CollapseBoundary>
    </>
  );
}
