import { Button } from "@mui/material";

export default function AppButton({
    children,
    ...props
}) {
    return (
        <Button
            variant="contained"
            sx={{
                borderRadius: 2,
                textTransform: "none",
            }}
            {...props}
        >
            {children}
        </Button>
    );
}