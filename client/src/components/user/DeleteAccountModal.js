import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanUserDeletedMessageStatus,
  fetchUsers,
  getDeleteAccountModal,
  getDeleteUserMessage,
  getUsersDisplayPage,
  getUserToDelete,
  removeUser,
  setDeleteAccountModal,
} from "../../features/usersManagementSlice";
import {
  DialogContent,
  DialogTitle,
  Button,
  Box,
  Modal,
  ButtonGroup,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

const DeleteAccountModal = () => {
  const dispatch = useDispatch();
  const deleteAccountModalStatus = useSelector(getDeleteAccountModal);
  const userToDelete = useSelector(getUserToDelete);
  const deleteUserStatus = useSelector(getDeleteUserMessage);
  const [userDeleted, setUserDeleted] = useState(false);
  const page = useSelector(getUsersDisplayPage);

  useEffect(() => {
    if (deleteUserStatus.message) {
      dispatch(cleanUserDeletedMessageStatus());

      const users = {
        firstItem: page * 10 - 10,
        lastItem: page * 10,
        accountStatus: "active",
      };

      dispatch(fetchUsers(users));
      setUserDeleted(true);
      setTimeout(() => {
        dispatch(setDeleteAccountModal(false));
        setUserDeleted(false);
      }, 1500);
    }
  }, [deleteUserStatus]);

  const cancel = () => {
    dispatch(setDeleteAccountModal(false));
  };

  const handleClose = () => dispatch(setDeleteAccountModal(false));

  const deleteAccount = ({ id }) => {
    dispatch(removeUser(userToDelete._id));
  };

  return (
    <Modal
      open={deleteAccountModalStatus}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <DialogTitle>DELETE ACCOUNT</DialogTitle>
        <DialogContent>
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            style={{ fontSize: "60px" }}
          />
        </DialogContent>
        {!userDeleted && (
          <>
            <DialogContent>
              <Typography variant="h5" color="error">
                Are you sure?
              </Typography>
            </DialogContent>

            <ButtonGroup>
              <Button
                variant="contained"
                style={{ margin: "0 auto !important", minWidth: "120px" }}
                color="primary"
                autoFocus="autoFocus"
                onClick={deleteAccount}
              >
                OK
              </Button>
              <Button
                style={{ minWidth: "120px", marginLeft: "10px" }}
                color="primary"
                autoFocus="autoFocus"
                onClick={cancel}
                variant="contained"
              >
                Cancel
              </Button>
            </ButtonGroup>
          </>
        )}
        {userDeleted && (
          <Typography variant="h3" style={{ color: "lightcoral" }}>
            User deleted
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default DeleteAccountModal;
