import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
  getUsers,
  getUsersDisplayPage,
  setUsersDisplayPage,
  fetchUsers,
  setUserToEdit,
  setDeleteAccountModal,
  setUserToDelete,
  setAssignRoleModal,
  setUserToView,
} from "../../features/usersManagementSlice";
import { Grid, Checkbox, Tooltip, Button, useMediaQuery } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import TableComponents from "../utils/Table";
import SelectComponent from "../utils/SelectComponent";
import PaginationComponent from "../utils/Pagination";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  selectFields: {
    height: "60px",
    minWidth: "220px",
    borderStyle: "solid",
    borderColor: "grey",
    borderWidth: "1px",
  },
  tooltips: {
    marginLeft: "20px",
  },
  tableContainer: { marginTop: "10px !important" },
  selectFieldsContainer: {
    marginTop: "10px",
    marginLeft: "10px !important",
  },
  addUsersButtonContainer: {
    paddingTop: "20px !important",
    paddingRight: "20px",
  },
  error: {
    color: "red",
  },
  addUsersButton: {
    marginRight: "20px",
    borderRadius: "30px !important",
    minHeight: "60px !important",
    textTransform: "none !important",
    fontSize: "24px !important",
    [theme.breakpoints.only("xs")]: {
      marginTop: "20px !important",
      minWidth: "220px !important",
      height: "60px !important",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "60px !important",
      minWidth: "180px !important",
      height: "50px !important",
      marginLeft: "220px !important",
    },
  },
}));

const AllUsers = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector(getUsers);
  const page = useSelector(getUsersDisplayPage);

  const iPadScreen = useMediaQuery("(width:820px)");
  const miniIpadScreen = useMediaQuery("(width:768px)");
  const surfaceGoScreen = useMediaQuery("(width:912px)");

  const rows = [];

  useEffect(() => {
    const users = {
      firstItem: 0,
      lastItem: 10,
      role: filters.role,
      accountStatus: "active",
      filterTerm: undefined,
    };
    dispatch(fetchUsers(users));
  }, [dispatch]);

  const [filters, setFilters] = useState({
    filterStatus: "",
    accountStatus: "isActive",
    sortByFirstname: false,
    sortByLastname: false,
    filterByStatus: true,
    sortFirstname: "A-Z",
    sortLastname: "",
    filterStatus: "All",
  });

  const sortFirstName = () => {
    setFilters({
      ...filters,
      sortLastname: "",
      sortFirstname: filters.sortFirstname === "A-Z" ? "Z-A" : "A-Z",
      sortLastname: "A-Z",
      sortByFirstname: true,
      sortByLastname: false,
    });
  };

  const sortLastname = () => {
    setFilters({
      ...filters,
      sortFirstname: "A-Z",
      sortLastname: filters.sortLastname === "A-Z" ? "Z-A" : "A-Z",
      sortByFirstname: false,
      sortByLastname: true,
    });
  };

  const columns = [
    {
      id: "firstName",
      label: (
        <span
          style={{ justifyContent: "center", display: "flex" }}
          onClick={sortFirstName}
        >
          First Name{" "}
          {filters.sortFirstname === "A-Z" ? (
            <KeyboardArrowDownIcon />
          ) : (
            <KeyboardArrowUpIcon />
          )}
        </span>
      ),
      minWidth: 100,
      align: "center",
    },
    {
      id: "lastName",
      label: (
        <span
          style={{ justifyContent: "center", display: "flex" }}
          onClick={sortLastname}
        >
          Last Name{" "}
          {filters.sortLastname === "A-Z" ? (
            <KeyboardArrowDownIcon />
          ) : (
            <KeyboardArrowUpIcon />
          )}
        </span>
      ),
      minWidth: 100,
      align: "center",
    },
    {
      id: "email",
      label: "Email",
      minWidth: 160,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "assignRole",
      label: "Assign Role",
      minWidth: 140,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "role",
      label: "Role",
      minWidth: 120,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "edit",
      label: "",
      minWidth: 120,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
  ];

  const createColumns = (
    firstName,
    lastName,
    email,
    assignRole,
    role,
    edit
  ) => {
    return { firstName, lastName, email, assignRole, role, edit };
  };

  const createRows = () => {
    if (users?.data) {
      _.chain(Object.values(users.data))
        .orderBy(
          [
            filters.sortByFirstname
              ? (user) => user.firstName.toLowerCase()
              : filters.sortByLastname
              ? (user) => user.lastName.toLowerCase()
              : null,
          ],
          [
            filters.sortByFirstname
              ? filters.sortFirstname === "A-Z"
                ? "asc"
                : "desc"
              : filters.sortByLastname
              ? filters.sortLastname === "A-Z"
                ? "asc"
                : "desc"
              : null,
          ]
        )

        .map((item, index) => {
          const firstCol = (
            <div>
              {item.firstName}
              <br />
              <span style={{ color: "red" }}>
                {item.status === "deactivated" ? "(deleted account)" : null}
              </span>
            </div>
          );
          const secondCol = <div>{item.lastName}</div>;
          const thirdCol = <div>{item.email}</div>;

          const fourthCol = (
            <Button
              onClick={() => assignRole(item._id)}
              variant="contained"
              style={{ borderRadius: "30px", textTransform: "none" }}
              disabled={item.status === "deactivated" ? true : false}
            >
              Assign role
            </Button>
          );

          const fifthCol = <div>{item.role}</div>;

          const sixthCol =
            item.status !== "deactivated" ? (
              <>
                <Tooltip title="Edit user">
                  <EditOutlinedIcon
                    fontSize="small"
                    onClick={() => edit(item._id)}
                  />
                </Tooltip>
                <Tooltip title="Delete user">
                  <DeleteIcon
                    fontSize="small"
                    onClick={() => remove(item._id)}
                    style={{ marginLeft: "20px" }}
                  />
                </Tooltip>
                <Tooltip title="View user profile">
                  <RemoveRedEyeIcon
                    fontSize="small"
                    onClick={() => view(item._id)}
                    style={{ marginLeft: "20px" }}
                  />
                </Tooltip>
              </>
            ) : null;

          rows.push(
            createColumns(
              firstCol,
              secondCol,
              thirdCol,
              fourthCol,
              fifthCol,
              sixthCol
            )
          );
        })
        .value();
    }
  };

  const edit = (id) => {
    dispatch(setUserToEdit(id));
    navigate("/editProfile");
  };

  const remove = (id) => {
    dispatch(setUserToDelete(id));
    dispatch(setDeleteAccountModal(true));
  };

  const view = (id) => {
    dispatch(setUserToView(id));
    navigate("/viewProfile");
  };

  const assignRole = (id) => {
    dispatch(setUserToEdit(id));
    dispatch(setAssignRoleModal(true));
  };

  const handlePagination = (event, value) => {
    const users = {
      ...filters,
      firstItem: value * 10 - 10,
      lastItem: value * 10,
      role:
        filters.filterStatus === "isStudent"
          ? "student"
          : filters.filterStatus === "isAdmin"
          ? "admin"
          : filters.filterStatus === "isMentor"
          ? "mentor"
          : "",
      accountStatus:
        filters.accountStatus === "isActive"
          ? "active"
          : event.target.value === "isDeactivated"
          ? "deactivated"
          : undefined,
    };
    dispatch(setUsersDisplayPage(value));
    dispatch(fetchUsers(users));
  };

  const handleChange = (name) => (event) => {
    if (name === "filterStatus") {
      setFilters({
        ...filters,
        [name]: event.target.value,
      });
      const users = {
        firstItem: 0,
        lastItem: 10,
        accountStatus:
          filters.accountStatus === "isActive"
            ? "active"
            : filters.accountStatus === "isDeactivated"
            ? "deactivated"
            : undefined,
        role:
          event.target.value === "isStudent"
            ? "student"
            : event.target.value === "isAdmin"
            ? "admin"
            : event.target.value === "isMentor"
            ? "mentor"
            : "",
      };

      dispatch(fetchUsers(users));
    }
    if (name === "accountStatus") {
      setFilters({
        ...filters,
        [name]: event.target.value,
      });
      const users = {
        firstItem: 0,
        lastItem: 10,
        role:
          filters.filterStatus === "isStudent"
            ? "student"
            : filters.filterStatus === "isAdmin"
            ? "admin"
            : filters.filterStatus === "isMentor"
            ? "mentor"
            : "",
        accountStatus:
          event.target.value === "isActive"
            ? "active"
            : event.target.value === "isDeactivated"
            ? "deactivated"
            : undefined,
      };

      dispatch(fetchUsers(users));
    }
  };

  const filterItems = ["All", "isMentor", "isStudent", "isAdmin"];
  const accountStatusItems = ["All", "isActive", "isDeactivated"];
  const filterByTitles = ["Filter By Status", "Filter by account status"];
  const filterBy = ["filterStatus", "accountStatus"];

  return (
    <>
      <Grid container justifyContent={"center"} style={{ overflow: "hidden" }}>
        {typeof users === "string" && users.includes("Error") && (
          <h1 className={classes.error}>
            Server error occured. Try again later
          </h1>
        )}

        {typeof users !== "string" && (
          <>
            <Grid
              container
              justifyContent={"center"}
              className={classes.addUsersButtonContainer}
            >
              <Grid item xs={12} md={3} lg={3} xl={3}>
                <SelectComponent
                  label={filterByTitles[0]}
                  className={classes.selectFields}
                  array={filterItems}
                  selectedValue={filters[filterBy[0]]}
                  handleChange={handleChange(filterBy[0])}
                />
              </Grid>

              <Grid item xs={12} md={3} lg={3} xl={3}>
                <SelectComponent
                  label={filterByTitles[1]}
                  className={classes.selectFields}
                  array={accountStatusItems}
                  selectedValue={filters[filterBy[1]]}
                  handleChange={handleChange(filterBy[1])}
                />
              </Grid>

              <Grid item xs={12} md={5} lg={3} xl={3}>
                {surfaceGoScreen || iPadScreen || miniIpadScreen ? (
                  <Button
                    variant="contained"
                    onClick={() => navigate("/addUser")}
                    className={classes.addUsersButton}
                    style={{ marginTop: "20px", minWidth: "220px" }}
                  >
                    Add user
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => navigate("/addUser")}
                    className={classes.addUsersButton}
                  >
                    Add user
                  </Button>
                )}
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              md={10}
              lg={10}
              xl={9}
              className={classes.tableContainer}
            >
              <TableComponents
                rows={rows}
                columns={columns}
                createData={createColumns}
                createRows={createRows}
              />
            </Grid>
          </>
        )}
      </Grid>

      <Grid container justifyContent={"center"}>
        {users?.data && Math.ceil(users.totalNumOfUsers / 10) > 1 ? (
          <PaginationComponent
            page={page}
            handleChange={handlePagination}
            numberOfPages={Math.ceil(users.totalNumOfUsers / 10)}
            numberOfItems={Object.keys(users.data).length}
          />
        ) : null}
      </Grid>
    </>
  );
};

export default AllUsers;
