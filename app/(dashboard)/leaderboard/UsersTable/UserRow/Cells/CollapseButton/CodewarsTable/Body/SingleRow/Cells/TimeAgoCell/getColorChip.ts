import dayjs from "@/utils/dayjs";

const getColorChip = (completedAt: string) => {
  const hoursAgo = dayjs().diff(dayjs(completedAt), "hour");

  if (hoursAgo < 1) return "success";
  if (hoursAgo < 24) return "info";
  if (hoursAgo < 72) return "warning";
  return "default";
};

export default getColorChip;
