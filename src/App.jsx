import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);


  const handleSubmit= event =>{
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const name = form.name.value;
    const user = { name, email }
    console.log(user)
    
    fetch("http://localhost:5000/users", {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res=> res.json())
    .then(data => {
      console.log('inside post response', data);
      const newUser = [...users, data]
      setUsers(newUser)
      form.reset();
    })
  }

  return (
    <>
      <h1>User management system</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" id="" /> <br />
        <input type="email" name="email" id="" />
        <br />
        <input type="submit" value="Add User" />
      </form>

      <h3>Numbers of user: {users.length}</h3>
      <div>
        {users.map((user) => (
          <p key={user.id}>
            {user.id} : {user.name} : {user.email}
          </p>
        ))}
      </div>
    </>
  );
}

export default App;
