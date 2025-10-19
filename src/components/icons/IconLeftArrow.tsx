import { IconWithoutBgPropsType } from "@/types/icon";

export const IconLeftArrow = ({ size, color }: IconWithoutBgPropsType) => {
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
        <path d="M604.7 759.2l61.8-61.8L481.1 512l185.4-185.4-61.8-61.8L357.5 512z"></path>
      </g>
    </svg>
  );
};
