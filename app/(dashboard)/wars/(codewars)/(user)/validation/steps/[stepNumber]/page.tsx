import React from "react";

interface Props {
  params: { stepNumber: number };
}

const StepNumberPage = ({ params: { stepNumber } }: Props) => {
  return <div>StepNumberPage {stepNumber}</div>;
};

export default StepNumberPage;
