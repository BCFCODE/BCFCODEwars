import * as React from "react";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import sidebarFooter from "./Layout/footer";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <DashboardLayout slots={{ sidebarFooter }} defaultSidebarCollapsed>
      <PageContainer>{props.children}</PageContainer>
    </DashboardLayout>
  );
}
