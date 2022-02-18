import React from "react";

type Props = {
  className?: string;
  [x: string]: any;
};

const ApplicationLogo: React.FC<Props> = (props) => {
  const { className, ...rest } = props;

  return (
    <div
      className={`bg-theme-gradient md:bg-theme-gradient-md lg:bg-theme-gradient-lg bg-no-repeat bg-cover w-full rounded p-6 ${className}`}
      {...rest}
    >
      <h1 className="text-white text-xl font-bold mt-6">Frontend Mentor</h1>
      <span className="text-white/75 font-medium">Feedback board</span>
    </div>
  );
};

export default ApplicationLogo;
