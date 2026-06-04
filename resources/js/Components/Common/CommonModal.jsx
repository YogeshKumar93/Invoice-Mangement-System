import React from "react";
import {
    Dialog,
    DialogContent,
    DialogActions,
    IconButton,
    Button,
    Box,
    Typography,
    TextField,
    MenuItem,
    useTheme,
    useMediaQuery,
    Autocomplete,
    FormControlLabel,
} from "@mui/material";
import { X } from "lucide-react";
import logo from "@/images/invoce logo.png";
import Checkbox from "../Checkbox";

const CommonFormField = ({
    field,
    formData,
    handleChange,
    setValue, // ✅ ADD THIS
    errors,
    loading,
}) => {
    const {
        name,
        label,
        type,
        placeholder,
        icon: StartIcon,
        options = [],
        required,
    } = field;
    const hasValue =
        formData[name] !== undefined &&
        formData[name] !== null &&
        formData[name].toString().length > 0;

    const errorMessage =
        typeof errors[name] === "string"
            ? errors[name]
            : errors[name]?.message || "";

    const inputSx = {
        "& .MuiOutlinedInput-root": {
            bgcolor: "#ffffff", // Pure White Background
            borderRadius: "12px",
            transition: "all 0.2s",
            "& fieldset": {
                border: "1px solid #e2e8f0",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)", // Subtle depth like in your image
            },
            "&:hover fieldset": { borderColor: "#cbd5e1" },
            "&.Mui-focused fieldset": {
                borderWidth: "1.5px",
                borderColor: "#7c3aed",
            },
        },
        "& .MuiInputBase-input": {
            py: 1.5,
            fontSize: "0.875rem",
            color: "#1e293b",
            // --- Placeholder Dark Color Fix ---
            "&::placeholder": {
                color: "#475569", // Darker for better visibility
                opacity: 0.8,
            },
        },
    };

    const commonProps = {
        fullWidth: true,
        name,
         autoFocus: field.autoFocus || false,

        value: formData[name] ?? "",
        onChange: (e) => {
            const value = e.target.value;

            if (handleChange) {
                handleChange(e);
            }
            if (setValue) {
                setValue(name, value);
            }
        },
        placeholder: placeholder || `Enter ${label}`,
        error: !!errorMessage,
        helperText: errorMessage,
        disabled: loading,
        sx: inputSx,
        InputProps: {
            startAdornment: StartIcon ? (
                <Box
                    sx={{
                        mr: 1.5,
                        color: "#9A3FEE",
                        display: "flex",
                        opacity: 0.8,
                    }}
                >
                    <StartIcon size={18} />
                </Box>
            ) : null,
        },
    };

    // ✅ AUTOCOMPLETE HANDLE
    if (type === "autocomplete") {
        return (
            <Box>
                <Typography
                    variant="body2"
                    sx={{
                        mb: 0.2,
                        fontWeight: 600,
                        color: "#475569",
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        opacity: hasValue ? 1 : 0,
                        transform: hasValue
                            ? "translateY(0)"
                            : "translateY(5px)",
                        transition: "all 0.2s ease",
                        height: hasValue ? "auto" : "0px",
                        pointerEvents: "none",
                    }}
                >
                    {label}{" "}
                    {required && <span style={{ color: "#ef4444" }}>*</span>}
                </Typography>

                <Autocomplete
                    options={options}
                    getOptionLabel={(opt) => opt?.label || ""}
                    value={
                        options.find((o) => o.value == formData[name]) || null
                    }
                    onChange={(e, newValue) => {
                        if (setValue) {
                            setValue(name, newValue ? newValue.value : "");
                        }
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder={placeholder || `Select ${label}`}
                            error={!!errorMessage}
                            helperText={errorMessage}
                            disabled={loading}
                            sx={{
                                ...inputSx,
                                "& .MuiAutocomplete-inputRoot": {
                                    padding: "0 !important",
                                },
                            }}
                            InputProps={{
                                ...params.InputProps,
                                startAdornment: StartIcon ? (
                                    <Box
                                        sx={{
                                            mr: 1.5,
                                            color: "#9A3FEE",
                                            display: "flex",
                                            opacity: 0.8,
                                        }}
                                    >
                                        <StartIcon size={18} />
                                    </Box>
                                ) : null,
                            }}
                        />
                    )}
                    disabled={loading}
                />
            </Box>
        );
    }

    // ✅ SELECT HANDLE
    // ✅ SELECT HANDLE (FIXED WITH PLACEHOLDER)
if (type === "select") {
    return (
        <TextField
            select
            fullWidth
            name={name}
            label={
                <>
                    {label}
                    {required && <span style={{ color: "#ef4444" }}> *</span>}
                </>
            }
            value={formData[name] ?? ""}
            onChange={(e) => {
                const value = e.target.value;
                if (handleChange) {
                    handleChange(e);
                }
                if (setValue) {
                    setValue(name, value);
                }
            }}
            error={!!errorMessage}
            helperText={errorMessage}
            disabled={loading}
            sx={inputSx}
            SelectProps={{
                displayEmpty: true,  // This allows showing placeholder when value is empty
                renderValue: (selected) => {
                    if (!selected || selected === "") {
                        return <em style={{ color: '#9ca3af' }}>Select {label}</em>;
                    }
                    const option = options.find(opt => opt.value === selected);
                    return option?.label || selected;
                }
            }}
            InputProps={{
                startAdornment: StartIcon ? (
                    <Box
                        sx={{
                            mr: 1.5,
                            color: "#9A3FEE",
                            display: "flex",
                            opacity: 0.8,
                        }}
                    >
                        <StartIcon size={18} />
                    </Box>
                ) : null,
            }}
        >
            <MenuItem value="" disabled>
                Select {label}
            </MenuItem>
            {options.map((opt) => (
                <MenuItem
                    key={opt.value}
                    value={opt.value}
                    sx={{ fontSize: "0.875rem" }}
                >
                    {opt.label}
                </MenuItem>
            ))}
        </TextField>
    );
}

    if (field.type === "file") {
        return (
            <TextField
                type="file"
                fullWidth
                name={field.name}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
            />
        );
    }

    if (field.type === "checkbox") {
        return (
            <FormControlLabel
                control={
                    <Checkbox
                        name={field.name}
                        checked={formData[field.name] || false}
                        onChange={(e) => {
                            const checked = e.target.checked;

                            if (setValue) {
                                setValue(field.name, checked);
                            }
                        }}
                    />
                }
                label={field.label}
            />
        );
    }

    // ✅ DEFAULT INPUT HANDLE
    return (
        <Box>
            <Typography
                variant="body2"
                sx={{
                    mb: 0.2,
                    fontWeight: 600,
                    color: "#475569",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    opacity: hasValue ? 1 : 0,
                    transform: hasValue ? "translateY(0)" : "translateY(5px)",
                    transition: "all 0.2s ease",
                    height: hasValue ? "auto" : "0px",
                    pointerEvents: "none",
                }}
            >
                {label}{" "}
                {required && <span style={{ color: "#ef4444" }}>*</span>}
            </Typography>
            <TextField {...commonProps} type={type || "text"} />
        </Box>
    );
};

const CommonModal = ({
    open,
    onClose,
    title,
    fieldConfig = [],
    formData = {},
    handleChange,
    errors = {},
    loading = false,
    onSave,
    saveText = "Save",
    maxWidth = "md",
    children,
    hideActions = false,
}) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullScreen={fullScreen}
            maxWidth={maxWidth}
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: "24px",
                    overflow: "hidden",
                    bgcolor: "#fcfcfd", // Light grey background for the modal to make white inputs pop
                },
            }}
        >
            <Box
                sx={{
                    pt: 2,
                    pb: 1.5,
                    textAlign: "center",
                    position: "relative",
                }}
            >
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 20,
                        top: 20,
                        color: "#94a3b8",
                    }}
                >
                    <X size={28} />
                </IconButton>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <img
                        src={logo}
                        alt="IMPSGURU"
                        style={{ height: "42px", marginBottom: "6px" }}
                    />
                    <Typography
                        variant="body1"
                        sx={{
                            color: "#2c5c8c",
                            letterSpacing: "1px",
                            fontWeight: 700,
                            fontSize: "0.7rem",
                        }}
                    >
                        PROCEED YOUR JOURNEY WITH IMPSGURU
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", mt: 2, height: "3.5px", px: 5 }}>
                    <Box
                        sx={{
                            flex: 1,
                            bgcolor: "#9A3FEE",
                            borderRadius: "10px 0 0 10px",
                        }}
                    />
                    <Box
                        sx={{
                            flex: 1,
                            bgcolor: "#f97316",
                            borderRadius: "0 10px 10px 0",
                        }}
                    />
                </Box>
            </Box>

            <DialogContent sx={{ px: 5, py: 2, overflowY: "auto" }}>
                {children ? (
                    children
                ) : (
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                            columnGap: 3,
                            rowGap: 1.5,
                        }}
                    >
                        {fieldConfig.map((field, index) => (
                            <Box
                                key={index}
                                sx={{
                                    gridColumn: field.fullWidth
                                        ? "1 / -1"
                                        : "auto",
                                }}
                            >
                                <CommonFormField
                                    field={field}
                                    formData={formData}
                                    handleChange={handleChange}
                                    setValue={(name, value) =>
                                        handleChange({
                                            target: {
                                                name,
                                                value,
                                            },
                                        })
                                    }
                                    errors={errors}
                                    loading={loading}
                                />
                            </Box>
                        ))}
                    </Box>
                )}
            </DialogContent>

            {!hideActions && (
                <DialogActions sx={{ px: 5, pb: 4, pt: 1, gap: 2 }}>
                    <Button
                        onClick={onClose}
                        variant="outlined"
                        sx={{
                            borderRadius: "12px",
                            px: 4,
                            py: 1,
                            textTransform: "none",
                            fontWeight: 700,
                            borderColor: "#7c3aed",
                            color: "#7c3aed",
                            "&:hover": {
                                borderColor: "#6d28d9",
                                bgcolor: "#f5f3ff",
                            },
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={onSave}
                        variant="contained"
                        disabled={loading}
                        sx={{
                            borderRadius: "12px",
                            px: 5,
                            py: 1,
                            textTransform: "none",
                            fontWeight: 700,
                            bgcolor: "#7c3aed",
                            boxShadow:
                                "0 8px 15px -3px rgba(124, 58, 237, 0.3)",
                            "&:hover": {
                                bgcolor: "#6d28d9",
                                boxShadow: "none",
                            },
                        }}
                    >
                        {loading ? "Please wait..." : saveText}
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    );
};

export default CommonModal;
