import { TextField } from "@mui/material";

export default function AppInput(props) {
    return (
        <TextField
            fullWidth
            size="small"
            {...props}
        />
    );
}