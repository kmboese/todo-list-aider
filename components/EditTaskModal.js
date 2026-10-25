import { useContext, useState } from 'next/dist/client/components/hooks'
import styles from '../styles/Home.module.css'

export default function EditTaskModal() {
  const { setShowEditModal, editingTask, handleEditTask } = useContext(TaskContext)
  const [taskName, setTaskName] = useState(editingTask?.name || '')
  const [dueDate, setDueDate] = useState(editingTask?.dueDate ? new Date(editingTask.dueDate).toISOString().split('T')[0] : '')
  const [category, setCategory] = useState(editingTask?.category || 'Home')
  const [tags, setTags] = useState(editingTask?.tags || [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!taskName.trim()) return
    
    const updatedTask = {
      ...editingTask,
      name: taskName.trim(),
      category,
      dueDate: dueDate ? new Date(dueDate) : null,
      tags: tags.length > 0 ? tags : null
    }
    
    handleEditTask(updatedTask)
    setTaskName('')
    setDueDate('')
    setCategory('Home')
    setTags([])
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Edit Task</h2>
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
              onChange={(e) => setDue日期(e.target.value)}
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
            <button type="submit" className={styles.saveButton}>
              Save
            </button>
            <button 
              type="button" 
              className={styles.cancelButton}
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
