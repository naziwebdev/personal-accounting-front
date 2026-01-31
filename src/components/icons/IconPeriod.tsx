import { IconWithoutBgPropsType } from "@/types/icon";

export const IconPeriod = ({ size, color }: IconWithoutBgPropsType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className={size}
    >
      <g id="SVGRepo_iconCarrier">
        <g
          id="Free-Icons"
          fill="none"
          fillRule="evenodd"
          stroke="none"
          strokeWidth="1"
        >
          <g id="Group" transform="translate(-377 -748)">
            <g id="Shape">
              <path
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M392 749v2M382 749v2M392 764v-1a3 3 0 1 0-3-3"
              ></path>
              <path
                fill={color}
                d="M392 766a1 1 0 1 1 0 2 1 1 0 0 1 0-2"
              ></path>
              <path
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M383.03 767h-2.723c-.802 0-1.093-.078-1.386-.225a1.6 1.6 0 0 1-.68-.637c-.157-.274-.241-.546-.241-1.297v-11.682c0-.75.084-1.023.24-1.297.157-.275.388-.49.68-.637.294-.147.585-.225 1.387-.225h13.386c.802 0 1.093.078 1.386.225s.524.362.68.637c.157.274.241 1.385.241 2.135"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
