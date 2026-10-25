import { useState } from 'next/dist/client/components/hooks'
import styles from '../styles/Home.module.css'

export default function Sidebar() {
  const [currentTab, setCurrentTab] = useState('Inbox')

  return (
    <div className={styles.sidebar}>
      <div className={styles.tabContainer}>
        <button 
          className={`${styles.tab} ${currentTab === 'Inbox' ? styles.activeTab : ''}`}
          onClick={() => setCurrentTab('Inbox')}
        >
          Inbox
        </button>
        <button 
          className={`${styles.tab} ${currentTab === 'Today' ? styles.activeTab : ''}`}
          onClick={() => setCurrentTab('Today')}
        >
          Today
        </button>
        <button 
          className={`${styles.tab} ${currentTab === 'Upcoming' ? styles.activeTab : ''}`}
          onClick={() => setCurrentTab('Upcoming')}
        >
          Upcoming
        </button>
      </div>
    </div>
  )
}
