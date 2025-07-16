import React from "react";

interface InstallLogoProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
}

export const InstallIcon: React.FC<InstallLogoProps> = ({
  color = "#b3b3b3",
  ...props
}) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
      <path
        d="M12 8v8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 12l4 4 4-4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
