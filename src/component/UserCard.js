import React from "react";
import { useNavigate } from "react-router-dom";


const UserCard = ({ user }) => {
    const navigate = useNavigate();

    const redirectUser = (name) => {
        navigate(`/${name}`);
    };
    return (
        <div onClick={() => redirectUser(user.username)} className="place-card">
            <h2 className="form-title">{user.username}</h2>
            <p>Email: {user.email}</p>
        </div>
    );
};

export default UserCard;
