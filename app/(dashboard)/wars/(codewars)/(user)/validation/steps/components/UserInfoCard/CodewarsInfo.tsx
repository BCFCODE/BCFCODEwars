import { Box, SxProps } from "@mui/system";
import Info from "./Info";

interface Props {
  codewarsUsername: string;
  codewarsHonor: number;
  codewarsLeaderboardPosition: number;
  codewarsClan: string;
  validatedUsername: string;
  overallRank: number;
}

const CodewarsInfo = ({
  codewarsUsername,
  validatedUsername,
  codewarsHonor,
  overallRank,
  codewarsLeaderboardPosition,
  codewarsClan,
}: Props) => {
  const infoSx: SxProps = { fontWeight: 500, color: "text.secondary" };
  return (
    <Box>
      <Info sx={infoSx} label="Name" info={codewarsUsername} />
      <Info
        sx={{ fontWeight: 600, color: "text.primary" }}
        label="User Name"
        info={validatedUsername}
      />
      <Info sx={infoSx} label="Honor" info={`${codewarsHonor}`} />
      <Info sx={infoSx} label="Overall Rank" info={`${overallRank}`} />
      <Info
        sx={infoSx}
        label="Leaderboard Position"
        info={`${codewarsLeaderboardPosition}`}
      />
      <Info sx={infoSx} label="Overall Rank" info={`${overallRank}`} />
      <Info sx={infoSx} label="Clan" info={`${codewarsClan}`} />
    </Box>
  );
};

export default CodewarsInfo;
