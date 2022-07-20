import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { getUserProfile } from "../../features/usersManagementSlice";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import userImagePlaceholder from "../../assets/userImgPlaceholder.png";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(10),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  error: {
    verticalAlign: "middle",
    fontSize: "18px",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  save: {
    marginBottom: theme.spacing(2),
    minWidth: "120px",
    marginRight: theme.spacing(2),
  },
  cancel: {
    marginBottom: theme.spacing(2),
    minWidth: "120px",
  },
  signin: {
    margin: "auto",
    marginBottom: theme.spacing(1),
  },
  userImagePlaceholder: {
    width: 130,
    marginTop: "20px",
  },
  uploadPhoto: {
    minWidth: "125px",
  },
}));
const ViewUserProfile = () => {
  const classes = useStyles();
  const userToView = useSelector(getUserProfile);

  const navigate = useNavigate();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    error: "",
  });

  useEffect(() => {
    setValues({
      email: userToView.email,
      firstName: userToView.firstName,
      lastName: userToView.lastName,
    });
  }, []);

  const redirectToDashboard = () => {
    navigate("/");
  };

  return (
    <Card className={classes.card}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8} lg={8} xl={8}>
          <CardContent>
            <TextField
              id="firstName"
              label="First name"
              className={classes.textField}
              value={values.firstName ? values.firstName : ""}
              style={{ pointerEvents: "none" }}
              margin="normal"
            />
            <br />

            <TextField
              id="lastName"
              label="Last name"
              className={classes.textField}
              value={values.lastName ? values.lastName : ""}
              style={{ pointerEvents: "none" }}
              margin="normal"
            />
            <br />

            <TextField
              id="email"
              label="Email"
              className={classes.textField}
              value={values.email ? values.email : ""}
              style={{ pointerEvents: "none" }}
              margin="normal"
            />

            <br />
            <br />
          </CardContent>
        </Grid>
        <Grid item xs={12} md={2} lg={2} xl={2}>
          <img
            src={
              userToView?.userImage
                ? userToView.userImage
                : userImagePlaceholder
            }
            className={classes.userImagePlaceholder}
            alt="Placeholder"
          ></img>

          <br />
          <br />
        </Grid>
      </Grid>
      <CardActions>
        <div style={{ margin: "0 auto" }}>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={redirectToDashboard}
            className={classes.save}
            style={{ marginRight: "60px" }}
          >
            Return
          </Button>
        </div>
      </CardActions>
    </Card>
  );
};

export default ViewUserProfile;
