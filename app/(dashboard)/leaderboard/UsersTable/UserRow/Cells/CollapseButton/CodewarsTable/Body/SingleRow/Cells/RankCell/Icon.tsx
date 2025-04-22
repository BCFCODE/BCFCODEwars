import { CodewarsRank } from "@/types/diamonds";
import IconMap from "./IconMap";
import { rankColors } from "./rankColors";

interface Props {
  rank: CodewarsRank;
}

const Icon = ({ rank }: Props) => {
  const IconComponent = IconMap[rank];
  return IconComponent ? (
    <IconComponent sx={{ fontSize: "1.2rem", color: rankColors[rank] }} />
  ) : null;
};

export default Icon;
