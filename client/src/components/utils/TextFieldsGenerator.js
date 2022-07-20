import { TextField, Grid } from "@mui/material";

export default function TextFieldsGenerator({
  array,
  handleChange,
  values,
  value,
  className,
  labels,
  types,
}) {
  return (
    <>
      {array.map((item, index) => (
        <Grid key={index} item>
          <br />
          <div className={className}>
            <TextField
              label={labels[index]}
              autoFocus={false}
              fullWidth
              onChange={handleChange(item)}
              value={values[value[index]]}
              type={types[index]}
            />
          </div>
        </Grid>
      ))}
    </>
  );
}
