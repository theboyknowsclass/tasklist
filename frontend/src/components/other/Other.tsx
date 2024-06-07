import { Typography } from "@mui/material";
import styles from "./Other.module.css";
import { NavBar } from "..";
import { useAuth } from "../../hooks";

export const Other = () => {
  const { userName } = useAuth();

  return (
    <div>
      <NavBar title="Other" />
      <div className={styles.other_content}>
        <Typography variant="h2">Welcome {userName}</Typography>
      </div>
    </div>
  );
};
