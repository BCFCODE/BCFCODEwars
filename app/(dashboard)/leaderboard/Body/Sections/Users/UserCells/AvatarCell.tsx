import { codewarsCellStyles } from "@/app/(dashboard)/leaderboard/styles";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import { TableCell, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function AvatarCell() {
  const {
    currentUser: { image, name },
  } = useCurrentUserContext();

  return (
    <TableCell
      sx={{
        ...codewarsCellStyles,
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
      component="th"
      scope="row"
    >
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
      >
        <Avatar alt="User's Avatar" src={image} />
      </StyledBadge>
      <Typography
        variant="body2"
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {name}
      </Typography>
    </TableCell>
  );
}
