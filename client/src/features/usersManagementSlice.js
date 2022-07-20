import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const updateUserData = createAsyncThunk(
  "userManagement/updateUserData",
  async (user) => {
    return await axios
      .put(`/api/users/${user.param}`, user.data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }
);

export const removeUser = createAsyncThunk(
  "userManagement/deleteUser",
  async (param) => {
    const response = await axios.put(`/api/removeUser/${param}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }
);

export const uploadImage = createAsyncThunk(
  "userManagement/uploadImage",
  async (file) => {
    return await axios
      .post("/uploadImage", file)
      .then((response) => response.data)
      .catch((error) => error);
  }
);

export const fetchUsers = createAsyncThunk(
  "userManagement/users",
  async (users) => {
    return await axios
      .post(`/api/users`, {
        firstValue: users.firstItem,
        lastValue: users.lastItem,
        filterTerm: users.filterTerm,
        role: users.role,
        accountStatus: users.accountStatus,
      })
      .then((response) => response.data)
      .catch((error) => error);
  }
);

export const createUser = createAsyncThunk(
  "userManagement/createUser",
  async (user) => {
    return await axios
      .post(`/api/addUser`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.data)
      .catch((error) => error);
  }
);

export const assignRole = createAsyncThunk(
  "userManagement/assignRole",
  async (data) => {
    return await axios
      .put(`/api/assignUserRole/${data.param}`, {
        role: data.userRole,
      })
      .then((response) => response.data)
      .catch((error) => error);
  }
);

const initialState = {
  editUserForm: false,
  uploadImage: {},
  userData: {},
  updateUser: {},
  userDataToDisplay: {},
  deleteAccountModal: false,
  assignRoleModal: false,
  deleteUser: {},
  users: {},
  usersDisplayPage: 1,
  createUser: {},
  filterTerm: "",
  userToEdit: {},
  selectedFilterTerm: "",
  userToDelete: {},
  assignRole: {},
  userProfile: {},
};

const userManagementSlice = createSlice({
  name: "userManagement",
  initialState,
  reducers: {
    setEditUserProfileForm: (state, action) => {
      state.editUserForm = action.payload;
    },
    cleanUpdatedUserDataStatus: (state, action) => {
      state.updateUser = {};
    },
    cleanUserFetchDataStatus: (state, action) => {
      delete state.loggedUser["message"];
    },
    setFilter: (state, action) => {
      state.filterTerm = action.payload;
    },
    cleanFilterTerm: (state, action) => {
      state.filterTerm = "";
      state.selectedFilterTerm = "";
    },
    setDeleteAccountModal: (state, action) => {
      state.deleteAccountModal = action.payload;
    },
    setUsersDisplayPage: (state, action) => {
      state.usersDisplayPage = action.payload;
    },
    setUserToEdit: (state, action) => {
      state.userToEdit = Object.values(state.users.data).filter(
        (item) => item._id === action.payload
      )[0];
    },
    setUserToDelete: (state, action) => {
      state.userToDelete = Object.values(state.users.data).filter(
        (item) => item._id === action.payload
      )[0];
    },
    cleanUserDeletedMessageStatus: (state, action) => {
      state.deleteUser = {};
    },
    cleanUploadImageStatus: (state, action) => {
      state.uploadImage = {};
    },
    setFilterTerm: (state, action) => {
      state.selectedFilterTerm = state.filterTerm;
    },
    cleanCreateUserStatus: (state, action) => {
      state.createUser = {};
    },
    setAssignRoleModal: (state, action) => {
      state.assignRoleModal = action.payload;
    },
    cleanAssignRoleStatus: (state, action) => {
      state.assignRole = {};
    },
    filterUsers: (state, action) => {
      state.users = action.payload;
    },
    setUserToView: (state, action) => {
      state.userProfile = Object.values(state.users.data).filter(
        (item) => item._id === action.payload
      )[0];
    },
    cleanStore: () => initialState,
  },
  extraReducers: {
    [updateUserData.fulfilled]: (state, { payload }) => {
      if (payload.error) {
        return {
          ...state,
          updateUser: payload,
        };
      }
      return {
        ...state,
        updateUser: payload,
        loggedUser: {
          token: payload.token,
          user: payload.data,
        },
      };
    },
    [uploadImage.fulfilled]: (state, { payload }) => {
      return { ...state, uploadImage: payload };
    },
    [fetchUsers.fulfilled]: (state, { payload }) => {
      if (payload?.code) {
        return {
          ...state,
          users: "Ups! Error occured. Please try again later",
        };
      } else {
        return { ...state, users: payload };
      }
    },
    [createUser.fulfilled]: (state, { payload }) => {
      return { ...state, createUser: payload };
    },
    [removeUser.fulfilled]: (state, { payload }) => {
      return { ...state, deleteUser: payload };
    },
    [assignRole.fulfilled]: (state, { payload }) => {
      return { ...state, assignRole: payload };
    },
  },
});

export const getEditUserFormStatus = (state) =>
  state.userManagement.editUserForm;
export const getEditUserPasswordFormStatus = (state) =>
  state.userManagement.editUserPasswordForm;
export const getUploadUserImageStatus = (state) =>
  state.userManagement.uploadImage;
export const getCloseAccountModalStatus = (state) =>
  state.userManagement.closeAccountModal;
export const getUserData = (state) => state.userManagement.userData;
export const getUpdateUserStatus = (state) => state.userManagement.updateUser;
export const getUserDataToDisplay = (state) =>
  state.userManagement.userDataToDisplay;
export const getDeleteAccountModal = (state) =>
  state.userManagement.deleteAccountModal;
export const getUserToEdit = (state) => state.userManagement.userToEdit;
export const getUserToDelete = (state) => state.userManagement.userToDelete;
export const getFilter = (state) => state.userManagement.filterTerm;
export const getUsersDisplayPage = (state) =>
  state.userManagement.usersDisplayPage;
export const getDeleteUserMessage = (state) => state.userManagement.deleteUser;
export const getDeleteUserModalStatus = (state) =>
  state.userManagement.openDeleteModal;
export const getUsers = (state) => state.userManagement.users;

export const getSelectedFilterTerm = (state) =>
  state.userManagement.selectedFilterTerm;
export const getCreateUserStatus = (state) => state.userManagement.createUser;
export const getAssignRoleModalStatus = (state) =>
  state.userManagement.assignRoleModal;
export const getAssignRoleStatus = (state) => state.userManagement.assignRole;
export const getUserProfile = (state) => state.userManagement.userProfile;

export const {
  setEditUserProfileForm,
  setEditUserPasswordForm,
  clearUpdatePassword,
  cleanUpdatedUserData,
  setFilter,
  setOpenDeleteModal,
  setDeleteAccountModal,
  cleanStore,
  cleanUploadImageStatus,
  setUsersDisplayPage,
  cleanUserUpdateMessage,
  setUserToEdit,
  setFilterTerm,
  cleanFilterTerm,
  cleanCreateUserStatus,
  cleanUserFetchDataStatus,
  setStoreStatus,
  setUserToDelete,
  cleanUserDeletedMessageStatus,
  setAssignRoleModal,
  cleanAssignRoleStatus,
  cleanUpdatedUserDataStatus,
  filterUsers,
  setUserToView,
} = userManagementSlice.actions;

export default userManagementSlice.reducer;
