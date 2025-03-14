import { TableRow } from "@mui/material";
import AvatarCell from "./AvatarCell";
import ButtonCell from "./ButtonCell";
import DiamondsCell from "./DiamondsCell";
import LastLoginCell from "./LastLoginCell";
import MemberSinceCell from "./MemberSinceCell";
import RankCell from "./RankCell";
import CollectCodewarsCell from "./CollectCodewarsCell";

const User = () => {
  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <ButtonCell />
        <AvatarCell />
        <MemberSinceCell />
        <LastLoginCell />
        <DiamondsCell />
        <CollectCodewarsCell />
        {/* <RankCell /> */}
      </TableRow>
    </>
  );
};

export default User;
