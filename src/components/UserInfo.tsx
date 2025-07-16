import React from "react";
import type { IUser } from "../types/spotify-user";

const UserInfo: React.FC<{ user: IUser }> = ({ user }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
      <img
        src={user.photos?.[0]}
        alt="User"
        style={{ width: 50, borderRadius: "50%", marginRight: 10 }}
      />
      <h3>{user.displayName}</h3>
      <p>{user.email}</p>
    </div>
  );
};

export default UserInfo;
