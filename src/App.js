import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import { useState, useEffect } from "react";

// root component
function App() {
  // ******* App Level States *******

  const [showAddTask, setShowAddTask] = useState(false);

  // useState returns state and function to update state
  const [tasks, setTasks] = useState([]);

  // Function to read list of data objects from the server
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:3001/tasks");
    const data = await res.json();
    return data;
  };

  // Function to read single data object from the server
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:3001/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  // This method is called when the page is loaded
  useEffect(() => {
    const getTasks = async () => {
      console.log("Loading tasks data from the server");
      const tasksFromServer = await fetchTasks();

      console.log("Passing data to the state setter");
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  // Delete Task Function
  const deleteTask = async (id) => {
    console.log("Deleting id on the Server: ", id);

    await fetch(`http://localhost:3001/tasks/${id}`, { method: "DELETE" });

    // skip the task with the passed id
    // filter will return the list of elements/tasks to setTasks()
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Reminder
  const toggleReminder = async (id) => {
    console.log("Toggle Reminder: ", id);

    // get the task object from db
    const taskToToggle = await fetchTask(id);

    // object the object
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    // save the updated object in the db
    const res = await fetch(`http://localhost:3001/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    // get the updated object from the db
    const data = await res.json();

    // update the UI
    // map will return the list of new or modified elements/tasks to setTasks()
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
    console.log("Tasks state updated");
  };

  const addTask = async (task) => {
    console.log("adding task to server: ", task);
    // const id = Math.floor(Math.random() * 100) + 1;
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
    const res = await fetch(`http://localhost:3001/tasks`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json(); // get the new added task
    setTasks([...tasks, data]);
  };

  const toggleShowAddTask = () => {
    setShowAddTask(!showAddTask);
  };

  return (
    <Router>
      <div className="container">
        <Header
          title="Task Tracker App"
          onAdd_callback={toggleShowAddTask}
          showAdd_state={showAddTask}
        />

        <Routes>

          {/* Show the element in the below Route when we are on the / link */}
          <Route
            path="/"
            exact
            element={
              <>
                {/* show Add Task Form only if the 'showAddTask' state is True */}
                {showAddTask && <AddTask onAdd={addTask} />}

                {/* Show list of tasks only if there length of list is > 0 */}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  "No Tasks to show"
                )}
              </>
            }
          />
          
          {/* Show the element in the below Route when we are on the /about link */}
          <Route path="/about" element={<About/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
