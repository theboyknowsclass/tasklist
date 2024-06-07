import { CircularProgress, Typography } from "@mui/material";

export const Loading = () => {
  return (
    <div>
      <CircularProgress />
      <Typography variant="body1">Loading...</Typography>
    </div>
  );
};
