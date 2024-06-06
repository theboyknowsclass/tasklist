import { Typography } from "@mui/material";
import { NavBar } from "../NavBar";
import { useAuth } from "../../hooks/useAuth";
import styles from "./Other.module.css";

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
