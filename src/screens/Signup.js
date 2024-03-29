import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: credential.name,
        email: credential.email,
        password: credential.password,
        location: credential.geolocation
      })
    });
    const json = await response.json();
    // console.log(json);
    if (!json.success) {
      alert("Enter Valid Credentials :(");
    }
  };

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <form
          className="border p-4 rounded"
          style={{ minWidth: "300px", maxWidth: "400px" }}
          onSubmit={handleSubmit}
        >
          <h3 className="mb-4">Signup Page</h3>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" name='name' value={credential.name} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credential.email} onChange={onChange} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credential.password} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputLocation1" className="form-label">Location</label>
            <input type="text" className="form-control" id="exampleInputLocation1" name='geolocation' value={credential.geolocation} onChange={onChange} />
          </div>
          <button type="submit" className="m-3 btn btn-primary">Submit</button>
          <Link to="/login" className="m-3 btn btn-danger">Already a User</Link>
        </form>
      </div>
    </>
  );
}

export default Signup;
