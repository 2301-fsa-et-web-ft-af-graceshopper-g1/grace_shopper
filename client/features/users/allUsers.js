import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsers, selectUsers } from "./usersSlice";

const AllUsers = () => {
  const dispatch = useDispatch();
  let users = useSelector(selectUsers);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className="allUsersView">
      <h2>These are all of the users!</h2>
      <ul>
        {users.map((user) => {
          return <li key={user.id}>{user.username}</li>;
        })}
      </ul>
    </div>
  );
};

export default AllUsers;
