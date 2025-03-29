"use client";

import LoadingUI from "@/app/components/UI/LoadingUI";
import useAllUsersContext from "@/app/context/hooks/db/useAllUsersContext";
import useAllUsersDispatchContext from "@/app/context/hooks/db/useAllUsersDispatchContext";
import CodewarsProvider from "@/app/context/providers/Codewars";
import { CurrentUser } from "@/types/users";
import { Paper, Table, TableContainer } from "@mui/material";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Body from "./Body";
import LeaderboardLoadingError from "./Error";
import LeaderboardHeader from "./Head/Header";

interface Props {
  allUsersInSignInPage: CurrentUser[];
  session: Session | null;
}

export default function LeaderBoardPage({
  allUsersInSignInPage,
  session,
}: Props) {
  const router = useRouter();
  // // Consume the error state from context to trigger re-render when it updates.
  const dispatch = useAllUsersDispatchContext();
  const { error, isLoading } = useAllUsersContext();
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
      console.log(
        "LeaderBoardPage allUsersInSignInPage",
        allUsersInSignInPage,
        // isCollapsed,
        // currentUser
        "session",
        session
      );
    }
  }, [allUsersInSignInPage, dispatch]);

  // console.log(">>>>>>>>>>>> useAllUsersContext error", error);
  // // Conditionally render the error UI when error is true.

  // console.log('isError in loading leaderboard', error)
  if (error)
    return <LeaderboardLoadingError onRetry={() => router.refresh()} />;

  if (isLoading)
    return (
      <LoadingUI
        title="Loading Leaderboard..."
        message="Hang tight! We're fetching the latest rankings. Sign in below to join and see your position."
      />
    );

  if (!error)
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
