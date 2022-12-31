import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './AccountItem.module.scss'

function AccountItem({ data }) {
  return (
    <div className={styles.wrapper}>
      <img className={styles.avatar} src={data.avatar} alt={data.nickname} />
      <div className={styles.info}>
        <p className={styles.username}>{data.nickname}</p>
        <p className={styles.bio}>
          <span>{data.full_name}</span>
          {data.tick && (
            <FontAwesomeIcon className={styles.check} icon={faCheckCircle} />
          )}
        </p>
      </div>
    </div>
  )
}

export default AccountItem
