"use client";

import LoadingUI from "@/app/components/UI/LoadingUI";
import useAllUsersContext from "@/app/context/hooks/db/useAllUsersContext";
import useAllUsersDispatchContext from "@/app/context/hooks/db/useAllUsersDispatchContext";
import CodewarsProvider from "@/app/context/providers/Codewars";
import { AuthenticatedUser } from "@/types/users";
import { Paper, Table, TableContainer } from "@mui/material";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Body from "./Body";
import LeaderboardLoadingError from "./Error";
import LeaderboardHeader from "./Head/Header";
import useUsersQuery from "@/app/context/hooks/ReactQuery/useUsersQuery";

interface Props {
  allUsersInSignInPage: AuthenticatedUser[];
  // session: Session | null;
}

export default function LeaderBoardPage({ allUsersInSignInPage }: Props) {
  const router = useRouter();
  // // Consume the error state from context to trigger re-render when it updates.
  const dispatch = useAllUsersDispatchContext();
  // const { error, isLoading } = useAllUsersContext();
  const { isError, isLoading } = useUsersQuery();
  // const { isCollapsed, currentUser } = useCurrentUserContext();

  useEffect(() => {
    if (allUsersInSignInPage) {
      dispatch({
        type: "SET_ALL_USERS",
        payload: {
          error: false,
          isLoading: false,
          allUsers: allUsersInSignInPage,
        },
      });
      // console.log(
      //   "LeaderBoardPage allUsersInSignInPage",
      //   allUsersInSignInPage,
      //   // isCollapsed,
      //   // currentUser
      //   "session",
      //   session
      // );
    }
  }, [allUsersInSignInPage, dispatch]);

  if (isError)
    return <LeaderboardLoadingError onRetry={() => router.refresh()} />;

  if (isLoading)
    return (
      <LoadingUI
        title="Loading Leaderboard..."
        message="Hang tight! We're fetching the latest rankings. Sign in below to join and see your position."
      />
    );

  if (!isError)
    return (
      <CodewarsProvider>
        <TableContainer component={Paper}>
          <Table aria-label="Leaderboard Table">
            <LeaderboardHeader />
            <Body />
          </Table>
        </TableContainer>
      </CodewarsProvider>
    );
}
