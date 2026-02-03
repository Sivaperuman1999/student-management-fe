import { Button as MuiButton } from "@mui/material";

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  buttonType?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
}

const Button = ({
  label,
  onClick,
  buttonType = "primary",
  type = "button",
}: ButtonProps) => {
  return (
    <MuiButton
      type={type}
      onClick={onClick}
      variant="contained"
      sx={{
        backgroundColor: buttonType === "primary" ? "#7B68EE" : "#6C757D",
        color: "#fff",
        textTransform: "none",
        fontWeight: 600,
        borderRadius: 2,
        padding: "8px 0",
        "&:hover": {
          backgroundColor:
            buttonType === "primary" ? "#7B68EE" : "#545B62",
        },
      }}
      fullWidth
    >
      {label}
    </MuiButton>
  );
};


export default Button;
