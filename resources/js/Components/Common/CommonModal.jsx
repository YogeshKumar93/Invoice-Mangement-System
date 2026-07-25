import React, { useState, useEffect } from "react";
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
    InputAdornment,
} from "@mui/material";
import { X, Save, AlertCircle, FileText } from "lucide-react";
import Checkbox from "../Checkbox";
import themeColors from "../../Utils/setThemeColors";
// Import your logo image
import companyLogo from "../../Images/invoce logo.png";

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

    // Compact floating label styles with bolder borders
    const inputSx = {
        "& .MuiOutlinedInput-root": {
            bgcolor: themeColors.white,
            borderRadius: "3px",
            transition: "all 0.2s",
            "& fieldset": {
                border: `2px solid ${themeColors.border}`,
                boxShadow: "none",
            },
            "&:hover fieldset": { 
                borderColor: themeColors.secondary,
                borderWidth: "2px",
            },
            "&.Mui-focused fieldset": {
                borderWidth: "2px",
                borderColor: themeColors.secondary,
            },
        },
        "& .MuiInputBase-input": {
            py: 1,
            fontSize: "0.8rem",
            color: themeColors.text,
            "&::placeholder": {
                color: themeColors.textLight,
                opacity: 0.8,
            },
        },
        "& .MuiInputLabel-root": {
            color: themeColors.textLight,
            fontSize: "0.8rem",
            "&.Mui-focused": {
                color: themeColors.secondary,
            },
            "&.Mui-error": {
                color: themeColors.error,
            },
        },
        "& .MuiFormHelperText-root": {
            color: themeColors.error,
            fontSize: "0.65rem",
            marginLeft: 0,
            marginTop: "2px",
        },
        "& .MuiInputLabel-shrink": {
            transform: "translate(14px, -6px) scale(0.8)",
            backgroundColor: themeColors.white,
            padding: "0 4px",
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
        label: label,
        required: required,
        InputProps: {
            startAdornment: StartIcon ? (
                <InputAdornment position="start" sx={{ ml: 0.5 }}>
                    <StartIcon 
                        size={16} 
                        color={formData[name] ? themeColors.secondary : themeColors.textLight}
                    />
                </InputAdornment>
            ) : null,
        },
    };

    if (type === "autocomplete") {
        return (
            <Box>
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
                            label={label}
                            placeholder={placeholder || `Select ${label}`}
                            error={!!errorMessage}
                            helperText={errorMessage}
                            disabled={loading}
                            required={required}
                            sx={{
                                ...inputSx,
                                "& .MuiAutocomplete-inputRoot": {
                                    padding: "0 !important",
                                },
                            }}
                            InputProps={{
                                ...params.InputProps,
                                startAdornment: StartIcon ? (
                                    <InputAdornment position="start" sx={{ ml: 0.5 }}>
                                        <StartIcon 
                                            size={16} 
                                            color={formData[name] ? themeColors.secondary : themeColors.textLight}
                                        />
                                    </InputAdornment>
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
                <TextField
                    select
                    fullWidth
                    name={name}
                    label={label}
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
                    required={required}
                    sx={inputSx}
                    SelectProps={{
                        displayEmpty: true,
                        renderValue: (selected) => {
                            if (!selected || selected === "") {
                                return <em style={{ color: themeColors.textLight, fontSize: "0.8rem" }}>Select {label}</em>;
                            }
                            const option = options.find(opt => opt.value === selected);
                            return option?.label || selected;
                        }
                    }}
                    InputProps={{
                        startAdornment: StartIcon ? (
                            <InputAdornment position="start" sx={{ ml: 0.5 }}>
                                <StartIcon 
                                    size={16} 
                                    color={formData[name] ? themeColors.secondary : themeColors.textLight}
                                />
                            </InputAdornment>
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
                            sx={{ fontSize: "0.8rem" }}
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
                label={label}
                InputLabelProps={{ shrink: true }}
                sx={inputSx}
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
                        sx={{
                            color: themeColors.secondary,
                            '&.Mui-checked': {
                                color: themeColors.secondary,
                            },
                        }}
                    />
                }
                label={field.label}
                sx={{
                    '& .MuiFormControlLabel-label': {
                        color: themeColors.text,
                        fontSize: '0.8rem',
                    }
                }}
            />
        );
    }

    return (
        <Box>
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
                    bgcolor: themeColors.white,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                },
            }}
        >
            {/* Header Section - White Background with Secondary Text */}
            <Box
                sx={{
                    pt: 2.5,
                    pb: 2,
                    px: 3,
                    bgcolor: themeColors.white,
                    // borderBottom: `2px solid ${themeColors.secondary}`,
                    position: 'relative',
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    {/* Logo - Left with Company Logo - Increased Width */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flex: 1 }}>
                        <Box
                            sx={{
                                width: 60, // Increased from 36 to 60
                                height: 60, // Increased from 36 to 60
                                borderRadius: "8px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                                overflow: "hidden",
                                bgcolor: themeColors.white,
                                border: `1px solid ${themeColors.border}`,
                                p: 1, // Added padding
                            }}
                        >
                            <img 
                                src={companyLogo} 
                                alt="Company Logo" 
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                }}
                            />
                        </Box>
                    </Box>

                    {/* Title - Center with Secondary Color */}
                    <Box sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: 1.5,
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                    }}>
                        <Typography
                            variant="h6"
                            sx={{
                                color: themeColors.secondary,
                                fontWeight: 700,
                                fontSize: "1rem",
                                letterSpacing: "0px",
                            }}
                        >
                            {title || "IMS"}
                        </Typography>
                        <Box
                            sx={{
                                px: 1,
                                py: 0.25,
                                bgcolor: themeColors.secondary,
                                borderRadius: "3px",
                            }}
                        >
                            <Typography
                                variant="caption"
                                sx={{
                                    color: themeColors.white,
                                    fontWeight: 600,
                                    fontSize: "0.5rem",
                                    letterSpacing: "0.5px",
                                    textTransform: "uppercase",
                                }}
                            >
                                Form
                            </Typography>
                        </Box>
                    </Box>

                    {/* Cross Icon - Right with rounded hover */}
                    <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                        <IconButton
                            onClick={onClose}
                            sx={{
                                color: themeColors.textLight,
                                width: 32,
                                height: 32,
                                borderRadius: "50%",
                                transition: 'all 0.2s ease',
                                "&:hover": {
                                    color: themeColors.secondary,
                                    bgcolor: `${themeColors.secondary}10`,
                                    transform: 'rotate(90deg)',
                                },
                            }}
                        >
                            <X size={18} />
                        </IconButton>
                    </Box>
                </Box>

                {/* Progress Indicator with Secondary Color */}
                <Box sx={{ mt: 1.5 }}>
                    <Box
                        sx={{
                            height: "3px",
                            bgcolor: `${themeColors.secondary}20`,
                            borderRadius: "2px",
                            overflow: "hidden",
                        }}
                    >
                        <Box
                            sx={{
                                width: "60%",
                                height: "100%",
                                bgcolor: themeColors.secondary,
                                borderRadius: "2px",
                            }}
                        />
                    </Box>
                </Box>
            </Box>

            <DialogContent sx={{ px: 3, py: 2, overflowY: "auto" }}>
                {children ? (
                    children
                ) : (
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                            columnGap: 2,
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
                
                {/* Error Summary */}
                {Object.keys(errors).length > 0 && (
                    <Box
                        sx={{
                            mt: 1.5,
                            p: 1,
                            bgcolor: `${themeColors.error}10`,
                            borderRadius: "6px",
                            border: `1px solid ${themeColors.error}30`,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <AlertCircle size={14} color={themeColors.error} />
                        <Typography
                            variant="caption"
                            sx={{ color: themeColors.error, fontSize: "0.65rem" }}
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
                        pb: 2.5,
                        pt: 1.5,
                        gap: 1.5,
                        borderTop: `1px solid ${themeColors.border}`,
                        bgcolor: themeColors.white,
                    }}
                >
                    <Button
                        onClick={onClose}
                        variant="outlined"
                        disabled={loading}
                        sx={{
                            borderRadius: "6px",
                            px: 2.5,
                            py: 0.5,
                            textTransform: "none",
                            fontWeight: 500,
                            fontSize: "0.75rem",
                            borderColor: themeColors.border,
                            color: themeColors.textLight,
                            borderWidth: "2px",
                            "&:hover": {
                                borderColor: themeColors.secondary,
                                borderWidth: "2px",
                                bgcolor: `${themeColors.secondary}10`,
                                color: themeColors.secondary,
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
                            px: 3.5,
                            py: 0.5,
                            textTransform: "none",
                            fontWeight: 600,
                            fontSize: "0.75rem",
                            bgcolor: themeColors.primary,
                            color: themeColors.white,
                            boxShadow: `0 3px 10px ${themeColors.primary}40`,
                            "&:hover": {
                                bgcolor: themeColors.primaryDark,
                                boxShadow: `0 4px 14px ${themeColors.primary}60`,
                                transform: 'translateY(-1px)',
                            },
                            "&.Mui-disabled": {
                                background: themeColors.border,
                                color: themeColors.textLight,
                                boxShadow: 'none',
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