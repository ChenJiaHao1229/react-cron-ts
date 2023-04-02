import React from "react";

type CronProps = { value?: string };

const Cron: React.FC<CronProps> = ({ value }) => {
  return <div>value-{value}</div>;
};

export default Cron;
