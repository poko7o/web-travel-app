import axios from "axios";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("/users");
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const changeStatus = async (id, userStatus) => {
    userStatus === "ACTIVATED"
      ? (userStatus = "DEACTIVATED")
      : (userStatus = "ACTIVATED");
    try {
      await axios.put("/users/" + id.toString(), {
        userId: id,
        userStatus,
      });
      window.location.reload();
      console.log("Status successfully changed!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <table class="table table-striped table-hover mt-5">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Username</th>
          <th scope="col">Date created</th>
          <th scope="col">Status</th>
          <th scope="col">Change Status</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr>
            <th scope="row">{index + 1}</th>
            <td>{user.username}</td>
            <td>{new Date(user.createdAt).toDateString()}</td>
            <td>{user.userStatus}</td>
            <td>
              <button
                className="btn btn-success"
                onClick={(e) => changeStatus(user._id, user.userStatus)}
              >
                Change
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
