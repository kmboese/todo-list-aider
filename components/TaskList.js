import { useContext, useEffect, useState } from 'next/dist/client/components/hooks'
import Task from './Task'
import styles from '../styles/Home.module.css'
import { format, isToday, isTomorrow, isPast } from 'date-fns'

export default function TaskList() {
  const { currentTab, tasks } = useContext(TaskContext)
  const [filteredTasks, setFilteredTasks] = useState([])

  useEffect(() => {
    if (!tasks) return
    
    let filtered = [...tasks]
    
    // Filter based on current tab
    if (currentTab === 'Today') {
      const today = new Date()
      filtered = tasks.filter(task => {
        if (!task.dueDate) return false
        const dueDate = new Date(task.dueDate)
        return isToday(dueDate) || isPast(dueDate)
      })
    } else if (currentTab === 'Upcoming') {
      filtered = tasks.filter(task => {
        if (!task.dueDate) return false
        const dueDate = new Date(task.dueDate)
        return isPast(dueDate) ? false : true
      })
    }
    
    // Sort tasks
    if (currentTab === 'Inbox') {
      // No due date first, then by due date
      filtered.sort((a, b) => {
        const aNoDue = !a.dueDate
        const bNoDue = !b.dueDate
        if (aNoDue && !bNoDue) return -1
        if (!aNoDue && bNoDue) return 1
        return aNoDue === bNoDue ? 0 : a.dueDate - b.dueDate
      })
    } else if (currentTab === 'Today') {
      // Overdue first, then by due date
      filtered.sort((a, b) => {
        const aDue = new Date(a.dueDate)
        const bDue = new Date(b.dueDate)
        const aOverdue = isPast(aDue)
        const bOverdue = isPast(bDue)
        
        if (aOverdue && !bOverdue) return -1
        if (!aOverdue && bOverdue) return 1
        return aOverdue === bOverdue ? aDue - bDue : 0
      })
    } else if (currentTab === 'Upcoming') {
      // Group by due date
      filtered.sort((a, b) => {
        const aDue = new Date(a.dueDate)
        const bDue = new Date(b.dueDate)
        return aDue - bDue
      })
    }
    
    setFilteredTasks(filtered)
  }, [currentTab, tasks])

  return (
    <div className={styles.taskListContainer}>
      {filteredTasks.length === 0 ? (
        <div className={styles.noTasksMessage}>
          {currentTab === 'Inbox' && 'No tasks in inbox'}
          {currentTab === 'Today' && 'No tasks for today'}
          {currentTab === 'Upcoming' && 'No upcoming tasks'}
        </div>
      ) : (
        <div className={styles.taskList}>
          {filteredTasks.map(task => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      )}
      <button 
        className={styles.addTaskButton}
        onClick={() => useContext(TaskContext).setShowAddModal(true)}
      >
        Add Task
      </button>
    </div>
  )
}
