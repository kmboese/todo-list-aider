import { useContext, useState } from 'next/dist/client/components/hooks'
import styles from '../styles/Home.module.css'

export default function AddTaskModal() {
  const { setShowAddModal, handleAddTask } = useContext(TaskContext)
  const [taskName, setTaskName] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('Home')
  const [tags, setTags] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!taskName.trim()) return
    
    const newTask = {
      name: taskName.trim(),
      category,
      dueDate: dueDate ? new Date(dueDate) : null,
      tags: tags.length > 0 ? tags : null,
      completed: false,
      completedAt: null
    }
    
    handleAddTask(newTask)
    setTaskName('')
    setDueDate('')
    setCategory('Home')
    setTags([])
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Task Name</label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter task name"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Home">Home</option>
              <option value="Finance">Finance</option>
              <option value="Auto">Auto</option>
              <option value="Personal Care">Personal Care</option>
              <option value="Social">Social</option>
              <option value="Fitness">Fitness</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Tags</label>
            <div className={styles.tagInput}>
              <input
                type="text"
                placeholder="Add tags (press Enter to add)"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    setTags([...tags, e.target.value.trim()])
                    e.target.value = ''
                  }
                }}
              />
              <div className={styles.tagList}>
                {tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.modalButtons}>
            <button type="submit" className={styles.createButton}>
              Create Task
            </button>
            <button 
              type="button" 
              className={styles.cancelButton}
              onClick={() => setShowAddModal(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
