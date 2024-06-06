import { AppBar, Button, Divider, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const NavBar = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const logOutClicked = async () => {
    await logout();
  };

  const tasksClicked = () => {
    navigate("/");
  };

  const otherClicked = () => {
    navigate("/other");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, textAlign: "left" }}
        >
          {title}
        </Typography>
        <Divider orientation="vertical" flexItem />
        <Button color="inherit" onClick={tasksClicked}>
          Tasks
        </Button>
        <Button color="inherit" onClick={otherClicked}>
          Other
        </Button>
        <Divider orientation="vertical" flexItem />
        <Button color="inherit" onClick={logOutClicked}>
          LOG OUT
        </Button>
      </Toolbar>
    </AppBar>
  );
};
