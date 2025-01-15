import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Profile() {
  const location = useLocation();
  const [hasCookie, setHasCookie] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const URL = "http://127.0.0.1:4000/api/v1";

  const checkCookie = async () => {
    try {
      const checkCookie = await fetch(`${URL}/check-cookie`, {
        credentials: "include",
        method: "GET",
      });
      const cookieData = await checkCookie.json();

      setHasCookie(cookieData.hasCookie);
    } catch (error) {
      console.log(`Error occured (cookie) - ${error}`);
    }
  };

  const getUser = async () => {
    try {
      const userResponse = await fetch(`${URL}/user`, {
        credentials: "include",
        method: "GET",
      });
      const user = await userResponse.json();
      console.log(`User information - ${JSON.stringify(user)}`);
      setUsername(user.username);
      setEmail(user.email);
    } catch (error) {
      console.log(`Error occured while fetching user - ${error}`);
    }
  };

  // checkCookie()
  useEffect(() => {
    checkCookie();
    if (hasCookie) {
      getUser();
    }
  }, []);

  return (
    <>
      {hasCookie ? (
        <>
          <div>Logged In</div>
          <div> Username </div>
          <label>
            <input
              type="text"
              value={username}
              readOnly
            />
          </label>
          <div> Registered Email </div>
          <label>
            <input
              type="text"
              value={email}
              readOnly
            />
          </label>
        </>
      ) : (
        <>
          <div>Login to continue.</div> <br />
          <Link to="/login">
            <button>Login</button>
          </Link>
        </>
      )}
    </>
  );
}

export default Profile;
