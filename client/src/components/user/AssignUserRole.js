import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { indexOf } from "lodash";
import {
  assignRole,
  cleanAssignRoleStatus,
  fetchUsers,
  getAssignRoleModalStatus,
  getAssignRoleStatus,
  getUsersDisplayPage,
  getUserToEdit,
  setAssignRoleModal,
} from "../../features/usersManagementSlice";
import CloseIcon from "@mui/icons-material/Close";
import CheckBox from "../utils/CheckBox";
import { Dialog, DialogContent, Tooltip } from "@mui/material";

const AssignUserRole = () => {
  const dispatch = useDispatch();
  const userToEdit = useSelector(getUserToEdit);
  const assignRoleModalStatus = useSelector(getAssignRoleModalStatus);
  const assignRoleStatus = useSelector(getAssignRoleStatus);
  const page = useSelector(getUsersDisplayPage);

  useEffect(() => {
    if (assignRoleStatus?.message) {
      const users = {
        firstItem: page * 10 - 10,
        lastItem: page * 10,
        accountStatus: "active",
      };
      dispatch(fetchUsers(users));
      dispatch(cleanAssignRoleStatus());
      dispatch(setAssignRoleModal(false));
    }
  }, [assignRoleStatus]);

  const [checkedField, setCheckedField] = useState([...Array(4).fill(false)]);

  const [values, setValues] = useState({
    role: "",
  });

  const roles = ["student", "mentor", "admin"];
  const labels = ["Student", "Mentor", "Admin"];

  const handleChange = (name) => (event) => {
    const index = indexOf(roles, name);
    const arr = [...Array(4).fill(false)];
    arr[index] = true;

    setCheckedField([...arr]);

    const data = {
      param: userToEdit._id,
      userRole: name,
    };

    dispatch(assignRole(data));
  };

  return (
    <Dialog open={assignRoleModalStatus}>
      {userToEdit?.role && (
        <>
           <div style={{textAlign:"right"}}>
          <Tooltip title="Close window">
              <CloseIcon
                fontSize="small"
                onClick={() => dispatch(setAssignRoleModal(false))}
                style={{
                  fontSize:"20px",
                  color:"red",
                  marginTop: "10px",
                  marginRight: "10px",
                }}
              />
            </Tooltip>
            </div>
          <DialogContent>
      
            <h2 style={{ marginBottom: "5px", marginTop: "2px" }}>
              Assign User Role
            </h2>
          </DialogContent>
          <DialogContent>
            {roles.map((item, index) => {
              return (
                <span key={item}>
                  <CheckBox
                    label={labels[index]}
                    checked={
                      checkedField.filter(Boolean).length > 0
                        ? checkedField[index]
                        : roles[index] !== userToEdit.role
                        ? checkedField[index]
                        : true
                    }
                    changeHandler={handleChange(roles[index])}
                  />
                  <br />
                </span>
              );
            })}
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default AssignUserRole;
