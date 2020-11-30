import styles from './Loading.module.scss';

export interface LoadingProps {
  size: "small" | "medium" | "large" | "extraLarge";
}

export default function Loading({ size }: LoadingProps) {
  return <img src="./images/loading.svg" alt="Cargando" className={styles[size]} />
}
