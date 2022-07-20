import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  createUser,
  cleanCreateUserStatus,
  fetchUsers,
  setUsersDisplayPage,
  getCreateUserStatus,
} from "../../features/usersManagementSlice";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Icon,
  Grid,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TextFieldsGenerator from "../utils/TextFieldsGenerator";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    textAlign: "center",
    margin: "0 auto",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.only("xs")]: {
      maxWidth: 300,
      padding: theme.spacing(2),
      margin: "0 auto",
      marginTop: theme.spacing(2),
    },
  },
  error: {
    verticalAlign: "middle",
    fontSize: "18px",
  },
  submit: {
    margin: "auto !important",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.only("xs")]: {
      marginBottom: theme.spacing(0),
    },
  },
  textFields: {
    minWidth: "320px",
  },
  closeIcon: {
    textAlign: "right",
  },
}));
const CreateUser = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createUserStatus = useSelector(getCreateUserStatus);

  useEffect(() => {
    if (createUserStatus?.message) {
      dispatch(cleanCreateUserStatus());
      const users = {
        firstItem: 0,
        lastItem: 12,
      };
      dispatch(setUsersDisplayPage(1));
      dispatch(fetchUsers(users));
      navigate("/");
    }
  }, [createUserStatus]);

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    role: "student",
    confirmationPassword: "",
    open: false,
    error: "",
  });

  const handleChange = (name) => (event) => {
    let course = {};

    course = {
      [name]: event.target.value,
    };

    setValues({
      ...values,
      ...course,
    });
  };

  const formatUserData = (str) => {
    return (
      str.charAt(0).toUpperCase() + str.substr(1, str.length).toLowerCase()
    );
  };

  const clickSubmit = () => {
    const user = {
      firstName: formatUserData(values.firstName) || undefined,
      lastName: formatUserData(values.lastName) || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
      role: values.role,
    };

    if (!values.confirmationPassword || values.confirmationPassword === "") {
      setValues({ ...values, error: "Please repeat your password" });
      return;
    } else if (values.password !== values.confirmationPassword) {
      setValues({ ...values, error: "Password do not match" });
      return;
    } else {
      setValues({ ...values, error: "" });
    }

    dispatch(createUser(user));
  };

  const signupData = [
    "firstName",
    "lastName",
    "email",
    "password",
    "confirmationPassword",
  ];

  const labels = [
    "Firstname",
    "Lastname",
    "Email",
    "Password",
    "Confirmation Password",
  ];

  const types = ["text", "text", "text", "password", "password"];

  const navigateToDashboard = () => {
    setValues({
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      role: "student",
      confirmationPassword: "",
      open: false,
      error: "",
    });
    navigate("/");
  };

  return (
    <Card className={classes.card}>
      <div className={classes.closeIcon}>
        <Tooltip title="Close window">
          <CloseIcon
            fontSize="small"
            onClick={navigateToDashboard}
            style={{
              fontSize: "30px",
              color: "red",
              marginLeft: "auto",
              marginTop: "10px",
              marginRight: "10px",
            }}
          />
        </Tooltip>
      </div>

      <Grid container justifyContent="center">
        <CardContent>
          <h1>Create User</h1>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <TextFieldsGenerator
              array={signupData}
              handleChange={handleChange}
              values={values}
              value={signupData}
              labels={labels}
              className={classes.textFields}
              types={types}
            />

            {values.error ? (
              <Typography component="p" color="error">
                <Icon color="error" className={classes.error}></Icon>
                {values.error}
              </Typography>
            ) : (
              createUserStatus?.error && (
                <Typography component="p" color="error">
                  <Icon color="error" className={classes.error}></Icon>
                  {createUserStatus.error}
                </Typography>
              )
            )}
          </Grid>
        </CardContent>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <CardActions>
            <Button
              color="primary"
              variant="contained"
              onClick={clickSubmit}
              className={classes.submit}
            >
              Submit
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CreateUser;
