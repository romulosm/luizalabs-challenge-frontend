import React from "react";

interface ProfileLogoProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
}

export const ProfileIcon: React.FC<ProfileLogoProps> = ({
  color = "#b3b3b3",
  ...props
}) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
