import { TextField } from "@mui/material";

export interface InputProps {
  placeholder?: string;
  label?: string;
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: boolean;
  helperText?: string;
}

const Input = ({
  placeholder,
  type = "text",
  label,
  value,
  onChange,
  error,
  helperText,
}: InputProps) => {
  return (
    <TextField
      fullWidth
      size="small"
      variant="outlined"
      type={type}
      placeholder={placeholder}
      label={label}
      value={value}
      error={error}
      helperText={helperText}
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
};

export default Input;
