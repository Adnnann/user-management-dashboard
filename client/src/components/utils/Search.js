import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  getFilter,
  setFilter,
  setFilterTerm,
} from "../../features/usersManagementSlice";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "grey",
    borderRadius: "15px",
    paddingLeft: "5px",
    backgroundColor: "white",
    marginLeft: "10px !important",
    marginTop: "30px !important",
    [theme.breakpoints.only("xs")]: {
      marginTop: "10px !important",
    },
  },
}));

export default function Search({ changeHandler }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const handleKeyPress = (event) => {
    if (event.target.value === "") {
      const users = {
        firstItem: 0,
        lastItem: 10,
        filterTerm: undefined,
        role: undefined,
        accountStatus: "active",
      };

      dispatch(setFilterTerm(filter));
      return dispatch(fetchUsers(users));
    }

    if (event.keyCode === 13) {
      const users = {
        firstItem: 0,
        lastItem: 10,
        role: undefined,
        accountStatus: "active",
        filterTerm: event.target.value.toLowerCase(),
      };

      dispatch(setFilterTerm(filter));
      return dispatch(fetchUsers(users));
    }
  };

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <TextField
      fullWidth
      onChange={handleChange}
      onKeyDown={handleKeyPress}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      value={filter}
      variant="standard"
      className={classes.searchInput}
    />
  );
}
