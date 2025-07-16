import React from "react";

interface PlaylistsLogoProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
}

export const PlaylistsIcon: React.FC<PlaylistsLogoProps> = ({
  color = "#b3b3b3",
  ...props
}) => {
  return (
    <svg width="14" height="18" viewBox="0 0 14 18" fill="none" {...props}>
      <path
        d="M2 2.25v13.5l10-6.75-10-6.75Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
