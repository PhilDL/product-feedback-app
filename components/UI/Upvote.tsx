import React from "react";

type Props = {
  active: boolean;
  count: number;
  [x: string]: any;
  inlineStyle?: boolean;
};

const Upvote: React.FC<Props> = (props) => {
  const { count, active, inlineStyle, ...rest } = props;
  return (
    <button
      className={`flex ${
        inlineStyle
          ? "flex-row py-2 px-4 gap-2.5"
          : "flex-col py-2.5 px-2 gap-1.5"
      } items-center justify-between text-center font-bold text-xs rounded ${
        active
          ? "text-white bg-blue hover:bg-blue-light"
          : "text-gray-700 bg-gray-100 hover:bg-gray-100-lighter"
      }`}
      {...rest}
    >
      <svg
        className={active ? "stroke-current" : "stroke-blue"}
        width="10"
        height="7"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1 6l4-4 4 4" strokeWidth="2" fill="none" fillRule="evenodd" />
      </svg>
      {count}
    </button>
  );
};
export default Upvote;
