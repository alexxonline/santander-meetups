import styles from './Button.module.scss'

export interface ButtonPropTypes {
  children: any;
  onClick: () => void
}

export default function Button({children, onClick}: ButtonPropTypes) {
  return <button className={styles.button} onClick={onClick}>{children}</button>
}