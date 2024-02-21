import { FormControl, InputLabel, MenuItem, NativeSelect, TextField } from "@mui/material";
import { ErrorMessage, useField } from "formik";
import styles from "./styles.module.scss";
import Warning from "../../../public/warning.png";
export default function SingularSelect({
  data,
  handleChange,
  placeholder,
  header,
  disabled,
  ...rest
}) {
  const [field, meta] = useField(rest);
  // console.log(data[1] === "size" && "DATAAAA ->>>>>>", data[0])
  return (
    <div style={{ marginBottom: "1rem" }}>
      {header && (
        <div
          className={`${styles.header} ${meta.error ? styles.header__error : ""
            }`}
        >
          <div className={styles.flex}>
            {meta.error && (
              <img className=" w-5" src={Warning.src} alt="warning" />
            )}
            {header}
          </div>
        </div>
      )}
      <FormControl fullWidth   >
        <InputLabel variant="outlined" id="demo-simple-select-label">{placeholder}</InputLabel>
        <NativeSelect

          labelId="demo-simple-select-label"
          variant="outlined"
          name={field.name}
          // label={placeholder}
          disabled={disabled}
          value={field.value}
          onChange={handleChange}
          className={`${styles.input} ${meta.touched && meta.error && styles.error__select
            }`}
        >
          <option key={""} value={""}>

          </option>
          {data[0]?.map((option) => (
            <option key={option.id} value={option.id || option.nombre}>

              {data[1] === "color" ? <div className=" flex gap-2"> {option.color} <div style={{ background: option.style }} className=" shadow-md w-4 h-4 rounded-full"></div></div> : data[1] === "brand" ? option.marca : data[1] === "size" ? option?.tipo : option.nombre}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
      {/* <TextField
        variant="outlined"
        name={field.name}
        select
        label={placeholder}
        disabled={disabled}
        value={field.value}
        onChange={handleChange}
        className={`${styles.select} ${meta.touched && meta.error && styles.error__select
          }`}
      >
        <MenuItem key={""} value={""}>
          No Selected / Or Empty
        </MenuItem>
        {data[0]?.map((option) => (
          <MenuItem key={option.id} value={option.id || option.nombre}>

            {data[1] === "color" ? <div className=" flex gap-2"> {option.color} <div style={{ background: option.style }} className=" shadow-md w-4 h-4 rounded-full"></div></div> : data[1] === "brand" ? option.marca : data[1] === "size" ? option?.tipo : option.nombre}
          </MenuItem>
        ))}
      </TextField> */}
      {
        meta.touched && meta.error && (
          <p className={styles.error__msg}>
            <ErrorMessage name={field.name} />
          </p>
        )
      }
    </div >
  );
}
