import { CodewarsCompletedChallenge } from "@/types/codewars";
import { DatabaseUser } from "@/types/database";
import React from "react";
import CodewarsCompletedChallengesTableBody from "./TableBody";
import { CodewarsCompletedChallengesTableHead } from "./TableHead";
import { Table } from "@mui/material";

export interface CodewarsTableProps {
  userInDB: DatabaseUser;
  completedChallenges: CodewarsCompletedChallenge[] | undefined;
}

const CodewarsCompletedChallengesTable = ({
  userInDB,
  completedChallenges,
}: CodewarsTableProps) => {
  return (
    <>
      <Table size="small" aria-label="completed challenges">
        <CodewarsCompletedChallengesTableHead />
        <CodewarsCompletedChallengesTableBody
          {...{ userInDB, completedChallenges }}
        />
      </Table>
    </>
  );
};

export default CodewarsCompletedChallengesTable;
