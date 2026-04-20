import React, { useState } from "react";

function Form() {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  function handleSignup() {
    let userObj = {
      name: name,
      email: email,
      pass: password,
    };

    console.log(userObj);
    setName("");
    setEmail("");
    setPassword("");
  }

  return (
    <div>
      <h1>Sign Up Form</h1>

      <label>Name</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

      <label>Email</label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label>Password</label>
      <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleSignup}>Submit</button>
    </div>
  );
}

export default Form;