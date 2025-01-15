import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';

function Login() {
  const location = useLocation()
  const [hasCookie, setHasCookie] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const URL = "http://127.0.0.1:4000/api/v1/login";

  const checkCookie = async () => {
    try {
      const checkCookie = await fetch(
        `http://localhost:4000/api/v1/check-cookie`,
        {
          credentials: "include",
          method: "GET"
        }
      );
      const cookieData = await checkCookie.json();
      console.log("Cookie data -", JSON.stringify(cookieData));

      setHasCookie(cookieData.hasCookie);
    } catch (error) {
      console.log(`Error occured (cookie) - ${error}`);
    }
  };
  // checkCookie();

  useEffect(() => {
    checkCookie();
  }, [location.key]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const loginData = {email, password}

    try {
      const response = await fetch(URL, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(loginData),
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`
        }
      })
      
      const result = await response.json()
      const data = JSON.stringify(result);
      console.log(`Data - ${data}`)
      if (response.status === 200) {
        console.log(`LoggedIn sucessfully.`)
        // Write code to navigate to home page.
        // Using useNavigate
      } else if (response.status === 400) {
        alert(result.error)
      }

    } catch (error) {
      console.log(`Error while logging in - ${error}`)
    }
  }

  return (
    <>
      {hasCookie ? (
        <>
          <div>
            You are already loggedIn.
          </div>
        </>
      ) : (
        <>
          <div> Login to continue </div>
          <br />
          <form onSubmit={(e) => handleSubmit(e)}>
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

          <div> If you do not have an account, please register below. </div>
          <Link to="/register"><button>Register</button></Link>
        </>
      )}
    </>
  );
}

export default Login;
