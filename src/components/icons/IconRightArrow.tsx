import { IconWithoutBgPropsType } from "@/types/icon";

export const IconRightArrow = ({ size, color }: IconWithoutBgPropsType) => {
  return (
    <svg
      fill={`${color}`}
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      className={`${size}`}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M419.3 264.8l-61.8 61.8L542.9 512 357.5 697.4l61.8 61.8L666.5 512z"></path>
      </g>
    </svg>
  );
};
