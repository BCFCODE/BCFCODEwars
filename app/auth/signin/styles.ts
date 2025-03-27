import { SxProps, Theme } from "@mui/material";
import {
  SignInPageLocaleText,
  SlotProps
} from "@toolpad/core";

export const leaderboardStyles: SxProps<Theme> = {
  margin: { xs: 0, sm: 1, md: 2, lg: 3, xl: 4 },
  // position: 'absolute', 
  // backgroundColor: 'greenyellow',
  // width: '100%'
};

export const signInPageContainerStyles: SxProps = {
  // backgroundColor: "yellowgreen",
};

export const signInText: SignInPageLocaleText = {
  signInTitle: "Welcome to BCFCODE",
  signInSubtitle: "Join the competition, collect your diamonds, and become a legend!",
  signInRememberMe: "Remember me",
  email: "Email",
  password: "Password",
  or: "or",
  with: "Sign in with",
  passkey: "Sign in securely with a Passkey",
  to: "Sign in to",
};

// Custom slotProps for styling internal components
// export const signInSlotProps: SlotProps = {
  // emailField: {
  //   variant: "outlined",
  //   fullWidth: true,
  //   size: "small",
  //   sx: { mb: 2 },
  // },
  // passwordField: {
  //   variant: "outlined",
  //   fullWidth: true,
  //   size: "small",
  //   sx: { mb: 2 },
  // },
  // submitButton: {
  //   variant: "contained",
  //   color: "error",
  //   fullWidth: true,
  //   sx: { mt: 2},
  // },
  // forgotPasswordLink: {
  //   component: Link,
  //   href: "/forgot-password",
  //   sx: { display: "block", mt: 1, textAlign: "center" },
  // },
  // signUpLink: {
  //   component: Link,
  //   href: "/sign-up",
  //   sx: { display: "block", mt: 1, textAlign: "center" },
  // },
// };
