import React from "react";

const UserCard = ({ user }) => {
    return (
        <div className="user-card">
            <h2>{user.username}</h2>
            <p>Email: {user.email}</p>
        </div>
    );
};

export default UserCard;
