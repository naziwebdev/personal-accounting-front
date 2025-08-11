import { IconWithoutBgPropsType } from "@/types/icon";

export const IconDelete = ({ color, size }: IconWithoutBgPropsType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={`${color}`}
      viewBox="0 0 24 24"
      className={`${size}`}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
      </g>
    </svg>
  );
};
