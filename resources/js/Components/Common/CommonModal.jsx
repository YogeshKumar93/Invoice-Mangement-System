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
    Divider,
} from "@mui/material";
import { X, Save, AlertCircle } from "lucide-react";
import Checkbox from "../Checkbox";

const CommonFormField = ({
    field,
    formData,
    handleChange,
    setValue,
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
            bgcolor: "#1e1e1e",
            borderRadius: "8px",
            transition: "all 0.2s",
            "& fieldset": {
                border: "1px solid #3a3a3a",
                boxShadow: "none",
            },
            "&:hover fieldset": { borderColor: "#5a5a5a" },
            "&.Mui-focused fieldset": {
                borderWidth: "1px",
                borderColor: "#9a9a9a",
            },
        },
        "& .MuiInputBase-input": {
            py: 1.5,
            fontSize: "0.875rem",
            color: "#e0e0e0",
            "&::placeholder": {
                color: "#7a7a7a",
                opacity: 0.8,
            },
        },
        "& .MuiInputLabel-root": {
            color: "#9a9a9a",
            "&.Mui-focused": {
                color: "#c0c0c0",
            },
        },
        "& .MuiFormHelperText-root": {
            color: "#f44336",
            fontSize: "0.7rem",
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
                        color: "#9a9a9a",
                        display: "flex",
                        opacity: 0.7,
                    }}
                >
                    <StartIcon size={18} />
                </Box>
            ) : null,
        },
    };

    if (type === "autocomplete") {
        return (
            <Box>
                <Typography
                    variant="body2"
                    sx={{
                        mb: 0.75,
                        fontWeight: 500,
                        color: "#b0b0b0",
                        fontSize: "0.7rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                    }}
                >
                    {label}{" "}
                    {required && <span style={{ color: "#f44336" }}>*</span>}
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
                                            color: "#9a9a9a",
                                            display: "flex",
                                            opacity: 0.7,
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

    if (type === "select") {
        return (
            <Box>
                <Typography
                    variant="body2"
                    sx={{
                        mb: 0.75,
                        fontWeight: 500,
                        color: "#b0b0b0",
                        fontSize: "0.7rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                    }}
                >
                    {label}{" "}
                    {required && <span style={{ color: "#f44336" }}>*</span>}
                </Typography>
                <TextField
                    select
                    fullWidth
                    name={name}
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
                        displayEmpty: true,
                        renderValue: (selected) => {
                            if (!selected || selected === "") {
                                return <em style={{ color: '#7a7a7a' }}>Select {label}</em>;
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
                                    color: "#9a9a9a",
                                    display: "flex",
                                    opacity: 0.7,
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
            </Box>
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

    return (
        <Box>
            <Typography
                variant="body2"
                sx={{
                    mb: 0.75,
                    fontWeight: 500,
                    color: "#b0b0b0",
                    fontSize: "0.7rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                }}
            >
                {label}{" "}
                {required && <span style={{ color: "#f44336" }}>*</span>}
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
                    borderRadius: "12px",
                    overflow: "hidden",
                    bgcolor: "#1a1a1a",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                },
            }}
        >
            {/* Header Section - New Design */}
            <Box
                sx={{
                    pt: 3,
                    pb: 2,
                    px: 3,
                    bgcolor: "#121212",
                    borderBottom: "1px solid #2a2a2a",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Box
                            sx={{
                                width: 40,
                                height: 40,
                                bgcolor: "#2a2a2a",
                                borderRadius: "8px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Save size={20} color="#c0c0c0" />
                        </Box>
                        <Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: "#e0e0e0",
                                    fontWeight: 600,
                                    fontSize: "1.1rem",
                                    letterSpacing: "0px",
                                }}
                            >
                                {title || "IMS Form"}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: "#7a7a7a",
                                    fontSize: "0.7rem",
                                }}
                            >
                                Fill in the details below
                            </Typography>
                        </Box>
                    </Box>
                    
                    <IconButton
                        onClick={onClose}
                        sx={{
                            color: "#9a9a9a",
                            "&:hover": {
                                color: "#e0e0e0",
                                bgcolor: "#2a2a2a",
                            },
                        }}
                    >
                        <X size={20} />
                    </IconButton>
                </Box>

                {/* Progress Indicator */}
                <Box sx={{ mt: 2 }}>
                    <Box
                        sx={{
                            height: "3px",
                            bgcolor: "#2a2a2a",
                            borderRadius: "2px",
                            overflow: "hidden",
                        }}
                    >
                        <Box
                            sx={{
                                width: "60%",
                                height: "100%",
                                bgcolor: "#9a9a9a",
                                borderRadius: "2px",
                            }}
                        />
                    </Box>
                </Box>
            </Box>

            <DialogContent sx={{ px: 3, py: 3, overflowY: "auto" }}>
                {children ? (
                    children
                ) : (
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                            columnGap: 2.5,
                            rowGap: 2,
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
                
                {/* Error Summary */}
                {Object.keys(errors).length > 0 && (
                    <Box
                        sx={{
                            mt: 2,
                            p: 1.5,
                            bgcolor: "#2a1a1a",
                            borderRadius: "8px",
                            border: "1px solid #4a2a2a",
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <AlertCircle size={16} color="#f44336" />
                        <Typography
                            variant="caption"
                            sx={{ color: "#f44336", fontSize: "0.7rem" }}
                        >
                            Please fix the errors before proceeding
                        </Typography>
                    </Box>
                )}
            </DialogContent>

            {!hideActions && (
                <DialogActions
                    sx={{
                        px: 3,
                        pb: 3,
                        pt: 2,
                        gap: 2,
                        borderTop: "1px solid #2a2a2a",
                        bgcolor: "#121212",
                    }}
                >
                    <Button
                        onClick={onClose}
                        variant="outlined"
                        disabled={loading}
                        sx={{
                            borderRadius: "6px",
                            px: 3,
                            py: 0.75,
                            textTransform: "none",
                            fontWeight: 500,
                            fontSize: "0.8rem",
                            borderColor: "#3a3a3a",
                            color: "#b0b0b0",
                            "&:hover": {
                                borderColor: "#5a5a5a",
                                bgcolor: "#2a2a2a",
                                color: "#e0e0e0",
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
                            borderRadius: "6px",
                            px: 4,
                            py: 0.75,
                            textTransform: "none",
                            fontWeight: 500,
                            fontSize: "0.8rem",
                            bgcolor: "#2a2a2a",
                            color: "#e0e0e0",
                            "&:hover": {
                                bgcolor: "#3a3a3a",
                            },
                            "&.Mui-disabled": {
                                bgcolor: "#1e1e1e",
                                color: "#7a7a7a",
                            },
                        }}
                    >
                        {loading ? "Processing..." : saveText}
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    );
};

export default CommonModal;