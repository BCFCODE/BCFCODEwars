import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
  text: string;
  children: React.ReactElement<unknown, any>;
  isUntracked: boolean;
}

const UntrackedChallengeTooltip = ({ children, text, isUntracked }: Props) => {
  const [isOpen, setOpen] = useState(isUntracked);

  useEffect(() => {
    if (isUntracked) {
      setOpen(true);
      const timer = setTimeout(() => {
        setOpen(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isUntracked]);

  return (
    <Tooltip
      slotProps={{
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, -14],
              },
            },
          ],
        },
      }}
      title={text}
      placement="left"
      arrow
      open={isOpen}
      disableHoverListener={true}
      // enterDelay={500}
      // leaveDelay={200}
    >
      {children}
    </Tooltip>
  );
};

export default UntrackedChallengeTooltip;
