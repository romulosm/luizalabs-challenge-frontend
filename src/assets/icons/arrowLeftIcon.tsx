import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export const ArrowLeftIcon: React.FC<IconProps> = ({
  size = 32,
  color = "#FFFFFF",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 19l-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);
