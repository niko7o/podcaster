import styles from './Spinner.module.scss';

type SpinnerProps = {
  isLoading: boolean
}

const Spinner: React.FC<SpinnerProps> = ({ isLoading }) => {
  return isLoading ? (
    <div className={styles.spinner}>
      <div />
      <div />
      <div />
    </div>
  ) : <></>
}

export default Spinner;
