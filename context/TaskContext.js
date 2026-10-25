import { createContext, useContext, useState, useEffect } from 'next/dist/client/components/hooks'

const TaskContext = createContext()

export function useTaskContext() {
  return useContext(TaskContext)
}

export default function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([])
  const [currentTab, setCurrentTab] = useState('Inbox')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  useEffect(() => {
    // Load tasks from localStorage
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    setTasks(savedTasks)
  }, [])

  useEffect(() => {
    // Save tasks to localStorage whenever they change
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  }, [tasks])

  const handleAddTask = (task) => {
    setTasks([...tasks, task])
  }

  const handleEditTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task))
  }

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const handleCompleteTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: true, completedAt: new Date() } : task
    ))
  }

  const handleToggleEditModal = (task) => {
    setEditingTask(task)
    setShowEditModal(true)
  }

  return (
    <TaskContext.Provider value={{
      tasks,
      currentTab,
      setCurrentTab,
      showAddModal,
      setShowAddModal,
      showEditModal,
      setShowEditModal,
      editingTask,
      setEditingTask,
      handleAddTask,
      handleEditTask,
      handleDeleteTask,
      handleCompleteTask,
      handleToggleEditModal
    }}>
      {children}
    </TaskContext.Provider>
  )
}
