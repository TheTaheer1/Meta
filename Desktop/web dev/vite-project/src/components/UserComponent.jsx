import React, { useEffect, useState } from "react";

function UserComponent() {
//   const [users, setUsers] = useState([]);
  const [user ,setUser] = useState([])
  const [id, setId] = useState(1);

  function changeId() {
    setId(id + 1);
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      const userData = await data.json();

      setUser(userData);
    };

    fetchData();
  }, [id]);


  return (
    <div>
      <ul>
        {/* {users.map((user) => (
          <li>{user.name}</li>
        ))} */}

        <button onClick={changeId}>Fetch a Random User by Id</button>

        <h1>{user.name}</h1>
      </ul>
    </div>
  );
}

export default UserComponent;