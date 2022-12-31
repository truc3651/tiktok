import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Menu.module.scss'

function Header({ title, onBack }) {
  return (
    <header>
      <button className={styles.backBtn} onClick={onBack}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <h4 className={styles.headerTitle}>{title}</h4>
    </header>
  )
}

export default Header
