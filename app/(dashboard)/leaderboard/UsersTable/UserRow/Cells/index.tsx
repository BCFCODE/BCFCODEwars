import { TableRow } from "@mui/material";
import AvatarCell from "./Avatar";
import ButtonCell from "./ButtonCell";
import DiamondsCell from "./DiamondsCell";
import LastActivityCell from "./LastActivityCell";
import MemberSinceCell from "./MemberSinceCell";
import RankCell from "./RankCell";

const User = () => {
  return (
    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
      <ButtonCell />
      <AvatarCell />
      <LastActivityCell />
      <MemberSinceCell />
      <DiamondsCell maxWidth={50}/>
      <RankCell />
    </TableRow>
  );
};

export default User;
