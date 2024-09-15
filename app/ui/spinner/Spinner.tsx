import { Spin } from "antd";
import styles from "./spinner.module.css";

const Spinner: React.FC = () => {
  return (
    <div className={styles.spinnerContainer}>
      <Spin />
    </div>
  );
};

export { Spinner };
