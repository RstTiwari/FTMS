import React from 'react'
import {Box ,Button,IconButton,useMediaQuery,useTheme}  from "@mui/material"
import { useGetCoustomersQuery } from 'state/api'
import Headers from "../../components/Header"
import {DataGrid,GridActionsCellItem} from "@mui/x-data-grid"
import {EditIcon} from "@mui/icons-material"

const Customers = () => {
    const { data, isLoading } = useGetCoustomersQuery();
    const isLaptop = useMediaQuery("(min-width:1000px)")
    const theme = useTheme();
    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
        },
        {
            field: "email",
            headerName: "email",
            flex: 1,
        },
        {
            field: "phoneNumber",
            headerName: "Phone Number",
            flex: 1,
            renderCell: (params) => {
                return params.value.replace(
                    /^(\d{3})(\d{3})(\d{4})/,
                    "($1)$2-$3"
                );
            },
        },
        {
            field: "country",
            headerName: "Country",
            flex: 0.4,
        },
        {
            field: "occupation",
            headerName: "Occupation",
            flex: 1,
        },
        {
            field: "role",
            headerName: "Role",
            flex: 0.5,
        }
    ];
    return (
        <Box m={"1.5rem 2rem"}>
            <Headers title={"Coustomer"} subTitle={"All Coustomers"} />
            <Box
                mt={"40px"}
                height={"75vh"}
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: theme.palette.primary.light,
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderTop: "none",
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${theme.palette.secondary[200]} !important`,
                    },
                }}
            >
                <DataGrid
                    loading={isLoading || !data}
                    columns={columns}
                    getRowId={(row)=>row._id}
                    rows={data || []}
                />
            </Box>
        </Box>
    );
};

export default Customers
