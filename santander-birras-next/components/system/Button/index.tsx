import styles from './Button.module.scss'

export interface ButtonPropTypes {
  children: any;
  onClick: () => void
  disabled?: boolean;
}

export default function Button({children, disabled, onClick}: ButtonPropTypes) {
  const buttonClass = disabled ? `${styles.button} ${styles.disabled}` : `${styles.button}`;
  return <button className={buttonClass} onClick={onClick}>{children}</button>
}