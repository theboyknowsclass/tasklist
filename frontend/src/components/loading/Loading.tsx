import { CircularProgress, Typography } from "@mui/material";
import styles from "./Loading.module.css";

export const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <CircularProgress />
      <Typography variant="body1" className={styles.loadingText}>
        Loading...
      </Typography>
    </div>
  );
};
