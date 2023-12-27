import React from "react";
import { Box, useTheme, Typography, IconButton, Button, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowBackOutlined , AddOutlined } from "@mui/icons-material";
import FlexBetween from "./FlexBetween";

const Header = ({ title, subTitle,backLink,addNewLink }) => {
    const theme = useTheme();
    const navigate = useNavigate()
    const handleBackClick = () => {
        navigate(`${backLink}`);
    };
    const handleAddClick = () => {
        navigate(`${addNewLink}`);
    };
    return (
        <Box>
            <FlexBetween>
                <Typography>
                    <IconButton onClick={handleBackClick}>
                        <ArrowBackOutlined  />
                        Back
                    </IconButton>                 
                </Typography> 
                <Typography
                    variant="h3"
                    color={theme.palette.secondary[100]}
                    fontWeight={"bold"}
                    sx={{ mb: "5px" }}
                >
                    {title}
                    <Typography
                        variant="h5"
                        color={theme.palette.secondary[300]}
                        fontWeight={"bold"}
                        sx={{ mb: "5px" }}
                    >
                        {subTitle}
                    </Typography>
                </Typography>
                <IconButton onClick={handleAddClick}>
                    <AddOutlined />
                    Add
                </IconButton>
            </FlexBetween>
        </Box>
    );
};

export default Header
