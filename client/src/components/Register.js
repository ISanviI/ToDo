import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Register() {
  const location = useLocation()
  const [hasCookie, setHasCookie] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const URL = "http://127.0.0.1:4000/api/v1";

  const checkCookie = async () => {
    try {
      const checkCookie = await fetch(`${URL}/check-cookie`, {
        credentials: "include",
        method: "GET",
      });
      const cookieData = await checkCookie.json();
      console.log("Cookie data -", JSON.stringify(cookieData));
      
      setHasCookie(cookieData.hasCookie);
    } catch (error) {
      console.log(`Error occured (cookie) - ${error}`);
    }
  }
  // checkCookie()

  useEffect(() => {
    checkCookie()
  }, [location.key]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { username, email, password };

      const response = await fetch(`${URL}/register`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(`User data - ${JSON.stringify(data)}`)
        alert("User Registered.");
      } else if (response.status === 300) {
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.log(`Error while creating user- ${error}`);
    }
  };

  return (
    <>
      {hasCookie ? (
        <>
          <div>You are already logged in.</div>
        </>
      ) : (
        <>
          <div> Registration Page </div>
          <br />
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="username"> Username </label>
            <br />
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <br />

            <label htmlFor="email"> Email - Id </label>
            <br />
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <br />

            <label htmlFor="password"> Password </label>
            <br />
            <input
              type="text"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <br />

            <button>
              <input type="submit" />
            </button>
          </form>
        </>
      )}
    </>
  );
}

export default Register;
