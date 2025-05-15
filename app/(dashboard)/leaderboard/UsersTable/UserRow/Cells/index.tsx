import { TableRow } from "@mui/material";
import AvatarCell from "./Avatar";
import ButtonCell from "./ButtonCell";
import DiamondsCell from "./DiamondsCell";
import LastLoginCell from "./LastLoginCell";
import MemberSinceCell from "./MemberSinceCell";
import RankCell from "./RankCell";

const User = () => {
  return (
    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
      <ButtonCell />
      <AvatarCell />
      <MemberSinceCell />
      <LastLoginCell />
      <DiamondsCell />
      <RankCell />
    </TableRow>
  );
};

export default User;
