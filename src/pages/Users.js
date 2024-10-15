import React from "react";
import UserCard from "../component/UserCard";

const Users = () => {
    // Retrieve users from localStorage and parse them
    const users = JSON.parse(localStorage.getItem('users')) || [];

    return (
        <div className="container">
            {users.length > 0 ? (
                users.map((user, index) => (
                    <UserCard key={index} user={user} />
                ))
            ) : (
                <p>No users found</p>
            )}
        </div>
    );
};

export default Users;
