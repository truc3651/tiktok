import styles from './Menu.module.scss'
import Button from '@/components/Button'

function MenuItem({ data, onClick, to }) {
  return (
    <div>
      <Button onClick={onClick} to={to}>
        {data}
      </Button>
    </div>
  )
}

export default MenuItem
