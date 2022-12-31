import { Link } from 'react-router-dom'
import styles from './Button.module.scss'
import classnames from 'classnames/bind'

const cx = classnames.bind(styles)

function Button({
  children,
  to,
  href,
  onClick,
  primary,
  outline,
  rounded,
  classnames,
  text,
  disabled,
  ...passProps
}) {
  let Component = 'button'
  const props = { onClick, ...passProps }
  if (to) {
    Component = Link
    props.to = to
  } else if (href) {
    Component = 'a'
    props.href = href
  } else if (disabled) {
    // remove event listeners
    Object.keys(props).forEach((keyProp) => {
      if (keyProp.startsWith('on') && typeof props[keyProp] === 'function')
        delete props[keyProp]
    })
  }

  const classes = cx('wrapper', {
    primary,
    outline,
    rounded,
    text,
    [classnames]: classnames,
    disabled
  })
  return (
    <Component className={classes} {...props}>
      <span>{children}</span>
    </Component>
  )
}

export default Button
