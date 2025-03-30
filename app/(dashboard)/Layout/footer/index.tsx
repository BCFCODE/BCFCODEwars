"use client";

import Large from "./Large";
import Mini from "./Mini";
import { type SidebarFooterProps } from "@toolpad/core/DashboardLayout";

export default function SidebarFooter({ mini }: SidebarFooterProps) {
  return mini ? <Mini /> : <Large />;
}
