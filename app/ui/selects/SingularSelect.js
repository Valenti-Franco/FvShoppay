import { MenuItem, NativeSelect, InputLabel, FormControl } from "@mui/material";
import { ErrorMessage, useField } from "formik";
import styles from "./styles.module.scss";

export default function SingularSelect({
  data,
  handleChange,
  placeholder,
  header,
  disabled,
  ...rest
}) {
  const [field, meta] = useField(rest);
  return (
    <div className={styles.input + " " + "my-4"} >
      {header && (
        <div
          className={`${styles.header} ${meta.error ? styles.header__error : ""
            }`}
        >
          <div className={styles.flex}>
            {meta.error && (
              <img src="/images/warning.png" alt="warning" />
            )}
            {header}
          </div>
        </div>
      )}
      <FormControl fullWidth   >
        <InputLabel variant="standard" id="demo-simple-select-label">{placeholder}</InputLabel>
        <NativeSelect

          labelId="demo-simple-select-label"
          variant="standard"
          name={field.name}
          label={placeholder}
          disabled={disabled}
          value={field.value}
          onChange={handleChange}
          className={`${styles.input} ${meta.touched && meta.error && styles.error__select
            }`}
        >

          <option key={""} value={""}>
          </option>
          {data.map((option) => (
            <option key={option._id} value={option._id || option.name}>
              {option.name}
            </option>
          ))}
        </NativeSelect>
      </FormControl>

      {meta.touched && meta.error && (
        <p className={styles.error__msg}>
          <ErrorMessage name={field.name} />
        </p>
      )}
    </div>
  );
}
