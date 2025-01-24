import {FaTimes} from 'react-icons/fa'


const Task = ({task, onDelete, onToggle}) => {
    // It will receive the task object
  return (
    // If the reminder property of the task object is True 
    // add another class 'reminder' along with the 'task'
    <div className={`task ${task.reminder ? 'reminder': ''}`} onDoubleClick={() => onToggle(task.id)}>
        <h3>
            {task.text} <FaTimes style={{color: 'red', cursor: 'pointer'}} onClick={() => onDelete(task.id)}/>
        </h3>
        <p>
            {task.day}
        </p>
      
    </div>
  )
}

export default Task
