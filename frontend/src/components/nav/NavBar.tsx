import { AppBar, Button, Divider, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";

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
        <Button
          color="inherit"
          onClick={tasksClicked}
          data-testid="task-button-nav"
        >
          Tasks
        </Button>
        <Button
          color="inherit"
          onClick={otherClicked}
          data-testid="other-button-nav"
        >
          Other
        </Button>
        <Divider orientation="vertical" flexItem />
        <Button
          color="inherit"
          onClick={logOutClicked}
          data-testid="lopgout-button-nav"
        >
          LOG OUT
        </Button>
      </Toolbar>
    </AppBar>
  );
};
