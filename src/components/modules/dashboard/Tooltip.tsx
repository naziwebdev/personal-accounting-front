"use client";

import { ReactNode, useState, useEffect } from "react";

type TooltipProps = {
  content: string;
  children: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  delay?: number;
};

export default function Tooltip({
  content,
  children,
  side = "left",
  delay = 150,
}: TooltipProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const positionClasses = {
    top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
    right: "left-full ml-2 top-1/2 -translate-y-1/2",
    bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
    left: "right-full mr-2 top-1/2 -translate-y-1/2",
  };

  const triggerProps = isMobile
    ? {
        onClick: () => setVisible(!visible),
        onTouchStart: () => setVisible(!visible),
      }
    : {
        onMouseEnter: () => setVisible(true),
        onMouseLeave: () => setVisible(false),
        onFocus: () => setVisible(true),
        onBlur: () => setVisible(false),
      };

  return (
    <div className="relative inline-flex items-center" {...triggerProps}>
      {children}
      {visible && (
        <div
          className={`absolute ${positionClasses[side]} z-50 whitespace-nowrap px-2 py-1 text-sm rounded bg-gray-800 text-white shadow-lg transition-opacity duration-200`}
        >
          {content}
        </div>
      )}
    </div>
  );
}
