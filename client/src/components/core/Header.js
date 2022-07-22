import React from "react";
import { Grid, Typography, Toolbar, AppBar } from "@mui/material";
import Search from "../utils/Search";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    paddingBottom: "20px",
  },
  title: {
    marginTop: "30px !important",
    [theme.breakpoints.only("xs")]: {
      marginTop: "10px !important",
    },
    [theme.breakpoints.up("md")]: {
      textAlign: "right",
    },
  },
  searchInput: {
    paddingLeft: "100px",
  },
  searchFieldContainerSignedUser: {
    marginTop: "20px",
    [theme.breakpoints.up("md")]: {
      marginTop: "20px",
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: "50px",
    },
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.headerContainer}>
      <Toolbar>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={4} lg={3} xl={3}>
            <Typography variant="h5" className={classes.title}>
              User Management App
            </Typography>
          </Grid>
          <Grid item xs={12} md={7} lg={6} xl={6}>
            <Search />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
