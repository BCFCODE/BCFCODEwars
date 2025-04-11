import {
  diamondCollectedColor,
  diamondStyles,
  textStyles,
} from "@/app/(dashboard)/leaderboard/styles";
import {
  styled,
  SxProps,
  // Theme,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Theme } from "@mui/material/styles";


const diamondSideMargin = 0.4;

export const diamondCellContainerStyles = {
  ...textStyles,
  display: "flex",
  justifyContent: "right",
  // backgroundColor: "black",
  padding: 0,
  height: 51,
};

export const DiamondToggleGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  display: "flex",
  justifyContent: "center", // Ensures proper alignment
  alignItems: "center",
  marginRight: 9,
  // gap: theme.spacing(0.5), // Ensures consistent spacing
  minWidth: 80, // Restricts unnecessary width
}));

export const DiamondToggleButton = styled(ToggleButton)(({ theme }) => ({
  // flex: 1, // Ensures equal button size
  minWidth: "30px", // Prevents shrinking
  padding: theme.spacing(0),
  border: "none",
  borderRadius: "35%",
  "&:not(:last-child)": {
    // marginRight: theme.spacing(0.3), // Creates uniform spacing
  },
}));

export const toggleButtonStyles = (theme: Theme): SxProps<Theme> => ({
  ...diamondStyles,
});

export const collectedDiamondToggleStyles: SxProps = {
  ...toggleButtonStyles,
  color: diamondCollectedColor,
  marginLeft: diamondSideMargin,
  height: 30,
};

export const notCollectedDiamondToggleStyles: SxProps = {
  ...toggleButtonStyles,
  marginRight: diamondSideMargin,
  height: 30,
};

export const getToggleButtonStyles = (theme: Theme): SxProps<Theme> => ({
  ...diamondStyles,
  color: theme.palette.info.main,
  
});

export const recentlySolvedToggleStyles: SxProps<Theme> = (theme: Theme) => ({
  ...toggleButtonStyles,
  // fontSize: 30,
  // borderRadius: '50%',
  // padding: 0.3,
  height: 30,
  marginX: 0,
  color: theme.palette.warning.main, // Use the 'info' color from the theme
});
