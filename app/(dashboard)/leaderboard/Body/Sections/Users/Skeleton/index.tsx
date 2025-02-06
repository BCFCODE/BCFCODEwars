import React from "react";
import Row from "./Row";

const Skeleton = () => {
  const columns = 6;

  return Array.from({ length: 10 }).map((_, i) => (
    <Row key={i} nOfCols={columns} />
  ));
};

export default Skeleton;
