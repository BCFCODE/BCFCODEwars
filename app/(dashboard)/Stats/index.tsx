"use client";

import LoadingUI from "@/app/components/UI/LoadingUI";
import useCurrentUserQuery from "@/app/context/hooks/ReactQuery/useCurrentUserQuery";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import DailyTarget from "./DailyTarget";
import CodewarsTargetGauges from "./Gauge";
import CodewarsStats from "@/app/components/CodewarsStats";
import CodewarsStatsFallback from "../components/CodewarsStatsFallback";

const DashboardStats = () => {
  const { data, isLoading } = useCurrentUserQuery();

  const isConnectedToCodewars = data?.codewars.isConnected;

  const list = isConnectedToCodewars ? data.codewars.codeChallenges.list : [];

  const isListEmpty = list.length === 0;

  if (isLoading)
    return (
      <LoadingUI
        title="Calculating your coding victories on Codewars..."
        message="Preparing personalized stats from your Codewars journey..."
      />
    );

  if (isListEmpty) return <CodewarsStatsFallback />;

  return <CodewarsStats />;
};

export default DashboardStats;
