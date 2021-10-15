import {
    Box,
    BoxProps,
    InputLabel,
    InputLabelProps,
    FormControl,
    FormControlProps,
    Select,
    SelectProps,
    Button,
    ButtonProps,
    CircularProgress,
    CircularProgressProps,
} from "@mui/material";
import { styled as styledMui } from "@mui/material/styles";

export const BoxStyled = styledMui(Box)<BoxProps>(() => ({
    marginTop: 97,
}));

export const SelectStyled = styledMui(Select)<SelectProps>(() => ({
    height: 42,
    fontSize: 12,
    backgroundColor: "#EDEDED",
    "&.Mui-disabled": { backgroundColor: "#F8F8F8" },
    "& .MuiSvgIcon-root": { right: 10 },
    "& fieldset": { border: 0 },
}));

export const FormControlStyled = styledMui(FormControl)<FormControlProps>(
    () => ({
        marginBottom: 20,
        position: "relative",
    })
);

export const InputLabelStyled = styledMui(InputLabel)<InputLabelProps>(() => ({
    fontSize: 12,
    left: -1,
    top: -4,
    "&.Mui-disabled": { color: "#BFBFBF" },
}));

export const ButtonStyled = styledMui(Button)<ButtonProps>(() => ({
    height: 38,
    backgroundColor: "#FFCC00",
    color: "#000",
    letterSpacing: 1.34,
    padding: "0 28px 0 30px",
    justifyContent: "space-between",
    fontWeight: 400,
    fontSize: 15,
    borderRadius: 20,
    marginTop: 11,
    boxShadow: "0px 1px 3px #00000033",
    "&:hover": {
        backgroundColor: "#FFCC00",
        boxShadow: "0px 1px 3px #00000033",
    },
}));

export const CircularProgressStyled = styledMui(
    CircularProgress
)<CircularProgressProps>(() => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: "-12px",
    marginLeft: "-12px",
}));
