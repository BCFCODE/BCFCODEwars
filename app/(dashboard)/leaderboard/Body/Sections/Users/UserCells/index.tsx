import { TableRow } from "@mui/material";
import AvatarCell from "./AvatarCell";
import ButtonCell from "./ButtonCell";
import DiamondsCell from "./DiamondsCell";
import LastLoginCell from "./LastLoginCell";
import MemberSinceCell from "./MemberSinceCell";
import RankCell from "./RankCell";

interface Props {
  onOpen: {
    isCollapse: boolean;
    handleOpen: () => void;
  };
}

const User = ({ onOpen }: Props) => {
  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <ButtonCell {...{ onOpen }} />
        <AvatarCell />
        <MemberSinceCell />
        <LastLoginCell />
        <DiamondsCell />
        <RankCell />
      </TableRow>
    </>
  );
};

export default User;
