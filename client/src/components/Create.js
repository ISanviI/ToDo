import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Create() {
  const [hasCookie, setHasCookie] = useState(false);
  const [content, setContent] = useState("");

  const checkCookie = async () => {
    try {
      const checkCookie = await fetch(
        `http://localhost:4000/api/v1/check-cookie`,
        {
          credentials: "include",
          method: "GET",
        }
      );
      const cookieData = await checkCookie.json();
      console.log("Cookie data -", JSON.stringify(cookieData));

      setHasCookie(cookieData.hasCookie);
    } catch (error) {
      console.log(`Error occured (cookie) - ${error}`);
    }
  };

  useEffect(() => {
    checkCookie();
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const task = { content };

      const response = await fetch("http://127.0.0.1:4000/api/v1", {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log(`Result - ${JSON.stringify(result)}`);
    } catch (error) {
      console.log(`Error occured while creating a task - ${error}`);
    }
  };

  return (
    <>
      {hasCookie ? (
        <>
          <div> Create a task here. </div>
          <form onSubmit={handleSubmit}>
            <div id="div-form">
              <div className="form-element">
                <label className="label" htmlFor="subject">
                  What's your task?
                </label>
                <input
                  className="input"
                  name="subject"
                  type="text"
                  required={true}
                  placeholder="Subject"
                  value={content}
                  onChange={(e) => {setContent(e.target.value)}}
                />
              </div>
              <button>
                <input id="submit" type="submit" value="Submit"></input>
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <div> PLease login first to continue. </div> <br />
          <Link to="/login">
            <button>Login</button>
          </Link>
        </>
      )}
    </>
  );
}

export default Create;
