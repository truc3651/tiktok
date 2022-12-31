import images from '@/assets/images'
import AccountItem from '@/components/AccountItem'
import Button from '@/components/Button'
import { PopperWrapper } from '@/components/Popper'
import Menu from '@/components/Popper/Menu'
import {
  faCircleXmark,
  faEllipsisVertical,
  faMagnifyingGlass,
  faSpinner
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tippy from '@tippyjs/react/headless'
import 'tippy.js/dist/tippy.css'
import styles from './Header.module.scss'
import { useRef, useState, useEffect, useCallback } from 'react'
import { useDebounce } from '@/hooks'

const MENU_ITEMS = [
  {
    title: 'Language',
    type: 'language',
    children: [
      {
        code: 'en',
        title: 'English',
        type: 'language'
      },
      {
        code: 'vi',
        title: 'Tiếng Việt',
        type: 'language'
      }
    ]
  },
  {
    title: 'Feedback and help',
    type: 'feedback',
    to: '/feedback'
  },
  {
    title: 'Keyboard shortcuts',
    type: 'shortcuts'
  }
]

function Header() {
  const [searchText, setSearchText] = useState('')
  const searchTextDebounceValue = useDebounce(searchText, 500)
  const searchInputRef = useRef(null)

  const [showResult, setShowResult] = useState(true)
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!searchTextDebounceValue?.trim().length) {
      setLoading(false)
      setSearchResult([])
      return
    }

    setLoading(true)
    fetch(
      `https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(
        searchTextDebounceValue
      )}&type=less`
    )
      .then((data) => data.json())
      .then((data) => {
        setLoading(false)
        setSearchResult(data.data ?? [])
      })
  }, [searchTextDebounceValue])

  const onChangeSearchText = (e) => {
    const value = e.target.value
    if (value && value.startsWith(' ')) return
    setSearchText(value)
  }

  const clearSearchText = () => {
    setSearchText('')
    searchInputRef.current.focus()
  }

  const onMenuItemChanged = useCallback((item) => {
    console.log('>>item', item)
  }, [])

  const onClickOutside = () => {
    setShowResult(false)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <img src={images.logo} alt="tiktok" />
        </div>
        <Tippy
          interactive
          visible={showResult && searchResult.length}
          render={(attrs) => (
            <div className={styles.searchResult} tabIndex="-1" {...attrs}>
              <PopperWrapper>
                {searchResult.map((account) => (
                  <AccountItem key={account.id} data={account} />
                ))}
              </PopperWrapper>
            </div>
          )}
          onClickOutside={onClickOutside}
        >
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search accounts and videos"
              spellCheck={false}
              ref={searchInputRef}
              value={searchText}
              onChange={onChangeSearchText}
              onFocus={() => {
                setShowResult(true)
              }}
            />
            {!!searchText?.trim() && !loading && (
              <button className={styles.clearBtn} onClick={clearSearchText}>
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            )}
            {loading && (
              <FontAwesomeIcon className={styles.spinner} icon={faSpinner} />
            )}

            <button
              className={styles.searchBtn}
              // ấn vô nút này không cho in viền của searchContainer
              onMouseDown={(e) => e.preventDefault()}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </Tippy>
        <div className={styles.utils}>
          <Button text>Upload</Button>
          <Button primary>Login</Button>

          <Menu items={MENU_ITEMS} onChange={onMenuItemChanged}>
            <button className={styles.moreBtn}>
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>
          </Menu>
        </div>
      </div>
    </div>
  )
}

export default Header
