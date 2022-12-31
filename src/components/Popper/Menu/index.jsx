import { PopperWrapper } from '@/components/Popper'
import Tippy from '@tippyjs/react/headless'
import 'tippy.js/dist/tippy.css'
import styles from './Menu.module.scss'
import MenuItem from './MenuItem'
import Header from './Header'
import { useState, memo } from 'react'

function Menu({ children, items = [], onChange = () => {} }) {
  const [history, setHistory] = useState([{ parentTitle: '', data: items }])
  const current = history[history.length - 1]

  const renderedItems = () =>
    current.data.map((item, index) => {
      const isParent = !!item.children
      return (
        <MenuItem
          key={index}
          data={item.title}
          to={item.to}
          onClick={() => {
            if (isParent) {
              setHistory((prev) => [
                ...prev,
                { parentTitle: item.title, data: item.children }
              ])
            } else {
              onChange({
                ...item,
                parentTitle: current.parentTitle
              })
            }
          }}
        />
      )
    })

  return (
    <Tippy
      // visible={true}
      interactive
      delay={[0, 600]}
      placement="bottom-start"
      render={(attrs) => (
        <div className={styles.menuList} tabIndex="-1" {...attrs}>
          <PopperWrapper>
            {history.length > 1 && (
              <Header
                title={current.parentTitle}
                onBack={() => {
                  if (history.length > 1)
                    setHistory((prev) => prev.slice(0, prev.length - 1))
                }}
              />
            )}
            {renderedItems()}
          </PopperWrapper>
        </div>
      )}
      onHide={() => {
        setHistory((prev) => prev.slice(0, 1))
      }}
    >
      {children}
    </Tippy>
  )
}

export default memo(Menu)
