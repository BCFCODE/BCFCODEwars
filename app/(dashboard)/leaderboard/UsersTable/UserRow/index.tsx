import CodewarsStats from "@/app/components/CodewarsStats";
import User from "./Cells";
import CollapseBoundary from "./Cells/CollapseButton";
import CodewarsTable from "./Cells/CollapseButton/CodewarsTable";
import generateResponsiveSX, {
  ResponsiveBreakpoint,
} from "@/app/lib/ui/gauges/generateResponsiveSX";

interface Props {
  email: string;
}

export const gaugeInnerTextSXBreakpoints: ResponsiveBreakpoint[] = [
  { minWidth: 1, sx: { fontSize: 33 } },
  { minWidth: 1040, sx: { fontSize: 36 } },
  { minWidth: 1200, sx: { fontSize: 44 } },
];

export const gaugeFooterTextSXBreakpoints: ResponsiveBreakpoint[] = [
  { minWidth: 1, sx: { fontSize: 15, marginTop: -3 } },
  { minWidth: 1050, sx: { fontSize: 17, marginTop: -3 } },
  { minWidth: 1120, sx: { fontSize: 16, marginTop: -2 } },
  { minWidth: 1260, sx: { fontSize: 19, marginTop: -1 } },
];

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
                ...generateResponsiveSX(gaugeInnerTextSXBreakpoints),
              },
              gaugeFooterTextSX: {
                textAlign: "center",
                transition: "font-size 1s ease, margin 1s ease",
                ...generateResponsiveSX(gaugeFooterTextSXBreakpoints),
              },
            },
          }}
        />
        <CodewarsTable />
      </CollapseBoundary>
    </>
  );
}
