import * as React from "react";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import sidebarFooter from "./Layout/footer";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <DashboardLayout slots={{ sidebarFooter }} defaultSidebarCollapsed>
      <PageContainer>{children}</PageContainer>
    </DashboardLayout>
  );
}
