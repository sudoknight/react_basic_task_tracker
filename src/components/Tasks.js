
import Task from "./Task"
function Tasks({tasks, onDelete, onToggle}) {

  return (
    // Iterate on the received tasks and print each of them
    // Pass each task object to the Task component
    <>
    {tasks.map((task) => (<Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />))}
    </>
  )
}

export default Tasks
