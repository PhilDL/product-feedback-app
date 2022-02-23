import React from "react";
export type Ref = HTMLAnchorElement;
type Props = {
  [x: string]: any;
};

const GoBackLink: React.FC<Props> = React.forwardRef<Ref, Props>(
  function GoBackLink(props, ref) {
    const { onClick, href, ...rest } = props;
    return (
      <a
        href={href}
        onClick={onClick}
        ref={ref}
        className="flex items-center text-gray-500 text-sm font-bold cursor-pointer hover:text-gray-700"
        {...rest}
      >
        <svg
          width="7"
          height="10"
          xmlns="http://www.w3.org/2000/svg"
          className="inline mr-3"
        >
          <path
            d="M6 9L2 5l4-4"
            stroke="#4661E6"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
        Go Back
      </a>
    );
  }
);
export default GoBackLink;
