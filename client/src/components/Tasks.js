import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Tasks() {
  const [hasCookie, setHasCookie] = useState(false);
  // const [id, setId] = useState("");
  const [tasks, setTasks] = useState([]);
  const URL = "http://127.0.0.1:4000/api/v1";

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
  // checkCookie();

  const getTasks = async () => {
    try {
      const response = await fetch(URL, {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      setTasks(result.tasks);
      console.log(`Data - ${JSON.stringify(result)}`);
      if (response.status === 200) {
        console.log(`Got all tasks - ${tasks}`);
      } else if (response.status === 400) {
        alert(result.error);
      }
    } catch (error) {
      console.log(`Error occured while getting tasks - ${error}`);
    }
  };

  useEffect(() => {
    checkCookie();
    getTasks();
  }, []);

  const handleCheckboxChange = async (id) => {
    try {
      const response = await fetch(`${URL}/${id}`, {
        credentials: "include",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log(`Data deleted - ${JSON.stringify(result)}`);
      if (response.status === 200) {
        console.log(`Data successfully deleted.`);
        getTasks()
      } else if (response.status === 400) {
        alert(result.error);
      }
    } catch (error) {
      console.log(`Error checking the task - ${error}`)
    }
  }

  return (
    <>
      {hasCookie ? (
        <>
          <Link to="/create-task">
            <button> Create a Task </button>
          </Link> <br />
          <div>
            <div>Your tasks - </div> <br/>
              {tasks.map((task) => (
                <div key={task._id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={false}
                      onChange={() => handleCheckboxChange(task._id)}
                    />
                    {task.content}
                  </label>
                </div>
              ))}
          </div>
        </>
      ) : (
        <>
          <div> To get your tasks, please login. </div>
          <br />
          <button>
            <Link to="/login"> Login </Link>
          </button>
        </>
      )}
    </>
  );
}

export default Tasks;
