import { useContext, useState } from 'next/dist/client/components/hooks'
import styles from '../styles/Home.module.css'
import { format, isToday, isTomorrow, isPast } from 'date-fns'

export default function Task({ task }) {
  const { handleCompleteTask, handleDeleteTask, handleToggleEditModal } = useContext(TaskContext)
  const [isEditing, setIsEditing] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const isOverdue = task.dueDate && isPast(new Date(task.dueDate))

  return (
    <div 
      className={styles.taskItem}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.taskContent}>
        <input 
          type="checkbox" 
          checked={task.completed} 
          onChange={() => handleCompleteTask(task.id)}
          className={styles.taskCheckbox}
        />
        <div className={styles.taskDetails}>
          <div className={styles.taskName}>
            {task.name}
          </div>
          {task.dueDate && (
            <div className={styles.taskDueDate}>
              {isOverdue ? (
                <span className={styles.overdueDate}>
                  {format(new Date(task.dueDate), 'MMM d, yyyy')}
                </span>
              ) : (
                <span>
                  {format(new Date(task.dueDate), 'MMM d, yyyy')}
                </span>
              )}
            </div>
          )}
          <div className={styles.taskCategory}>
            {task.category}
          </div>
          {task.tags && task.tags.length > 0 && (
            <div className={styles.taskTags}>
              {task.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={styles.taskActions}>
        {isHovered && (
          <button 
            className={styles.editButton}
            onClick={() => handleToggleEditModal(task)}
          >
            Edit
          </button>
        )}
        {isHovered && (
          <button 
            className={styles.deleteButton}
            onClick={() => handleDeleteTask(task.id)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  )
}
