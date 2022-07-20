import { Select, MenuItem } from "@mui/material";

const SelectComponent = ({
  handleChange,
  selectedValue,
  array,
  disabled,
  className,
  label,
}) => {
  return (
    <span>
      <p>{label}</p>
      <Select
        onChange={handleChange}
        value={selectedValue}
        disabled={disabled}
        className={className}
      >
        {array.map((item, index) => {
          return (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          );
        })}
      </Select>
    </span>
  );
};

export default SelectComponent;
