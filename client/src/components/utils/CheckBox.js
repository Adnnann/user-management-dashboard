import { Checkbox } from "@mui/material";

const CheckBox = ({ changeHandler, checked, label }) => {
  return (
    <span style={{ justifyContent: "center", display: "flex" }}>
      <p style={{ minWidth: "100px", marginBottom: "5px" }}>{label}</p>
      <Checkbox onChange={changeHandler} checked={checked} />
    </span>
  );
};

export default CheckBox;
