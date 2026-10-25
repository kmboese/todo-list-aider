import { useState, useEffect } from 'next/dist/client/components/hooks'
import { useRouter } from 'next/router'
import TaskList from '../components/TaskList'
import Sidebar from '../components/Sidebar'
import AddTaskModal from '../components/AddTaskModal'
import EditTaskModal from '../components/EditTaskModal'
import TaskContext from '../context/TaskContext'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [currentTab, setCurrentTab] = useState('Inbox')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const router = useRouter()

  useEffect(() => {
    // Initialize tasks from localStorage or set default
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    if (savedTasks.length === 0) {
      // Add some default tasks for demo
      const defaultTasks = [
        { id: 1, name: 'Buy groceries', category: 'Home', dueDate: null, tags: ['shopping'], completed: false, completedAt: null },
        { id: 2, name: 'Pay rent', category: 'Finance', dueDate: new Date('2023-10-15'), tags: ['bills'], completed: false, completedAt: null },
        { id: 3, name: 'Oil change', category: 'Auto', dueDate: new Date('2023-10-10'), tags: [], completed: false, completedAt: null },
        { id: 4, name: 'Dentist appointment', category: 'Personal Care', dueDate: new Date('2023-10-12'), tags: ['health'], completed: false, completedAt: null },
        { id: 5, name: 'Call mom', category: 'Social', dueDate: new Date('2023-10-18'), tags: [], completed: false, completedAt: null },
        { id: 6, name: 'Go for a run', category: 'Fitness', dueDate: new Date('2023-10-20'), tags: [], completed: false, completedAt: null },
      ]
      localStorage.setItem('tasks', JSON.stringify(defaultTasks))
    }
  }, [])

  const handleAddTask = (task) => {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    task.id = Date.now()
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    setShowAddModal(false)
  }

  const handleEditTask = (updatedTask) => {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    const index = tasks.findIndex(task => task.id === updatedTask.id)
    if (index !== -1) {
      tasks[index] = updatedTask
      localStorage.setItem('tasks', JSON.stringify(tasks))
      setShowEditModal(false)
    }
  }

  const handleDeleteTask = (id) => {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    const filtered = tasks.filter(task => task.id !== id)
    localStorage.setItem('tasks', JSON.stringify(filtered))
  }

  const handleCompleteTask = (id) => {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    const task = tasks.find(task => task.id === id)
    if (task) {
      task.completed = true
      task.completedAt = new Date()
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  }

  const handleToggleEditModal = (task) => {
    setEditingTask(task)
    setShowEditModal(true)
  }

  return (
    <TaskContext.Provider value={{
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
      <div className={styles.container}>
        <Sidebar />
        <main className={styles.main}>
          <TaskList />
          {showAddModal && <AddTaskModal />}
          {showEditModal && <EditTaskModal />}
        </main>
      </div>
    </TaskContext.Provider>
  )
}
