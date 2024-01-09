import React,{useState} from 'react'
import {
    Box,
    Card,
    CardAction,
    CardContent,
    Collapse,
    Button,
    Typography,
    Rating,
    useTheme,
    useMediaQuery,
    CardActions
} from "@mui/material";
import { useGetProductsQuery } from 'state/api';
import Headers from "components/Header"
import { useCookies } from 'react-cookie';

const Products = () => {
    const [cookies,setCookie] = useState([])
    const Product = ({
        _id,
        name,
        price,
        description,
        category,
        supply,
        yearlySalesTotal,
        yearlyTotalSoldUnits,
        rating
    }) => {
        const theme = useTheme();
        const [isExpand, setIsExapand] = useState(false)
        return (
            <Card
                sx={{
                    backgroundImage: "none",
                    backgroundColor: theme.palette.background.alt,
                    borderRadius: "0.55rem",
                }}
            >
                <CardContent>
                    <Typography
                        sx={{
                            fontSize: 14,
                            color: theme.palette.secondary[700],
                        }}
                        gutterBottom
                    >
                        {category}
                    </Typography>
                    <Typography>{name}</Typography>
                    <Typography
                        sx={{ mb: "1.5rem" }}
                        color={theme.palette.secondary[400]}
                    >
                        ${Number(price).toFixed(2)}
                    </Typography>
                    <Rating value={rating} readOnly />
                    <Typography>{description}</Typography>
                </CardContent>
                <CardActions>
                    <Button
                        variant="primary"
                        size="small"
                        onClick={() => setIsExapand(!isExpand)}
                    >
                        See more
                    </Button>
                </CardActions>
                <Collapse in={isExpand}>
                    <CardContent>
                        <Typography>id:{_id}</Typography>
                        <Typography>supply Left:{supply}</Typography>
                        <Typography>
                            Yearly Sales This Year : {yearlySalesTotal}
                        </Typography>
                        <Typography>
                            Yearly Sold unit This Year :{yearlyTotalSoldUnits}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        );
    };
    const {data,isLoading} = useGetProductsQuery()
        const isLaptop = useMediaQuery("(min-width:1000px)")
  return (
      <Box m="1.5rem 2rem">
          <Headers title={"PRODUCTS"} subTitle={"List of  all Products"}  backLink={"/dashboard"} addNewLink ={"/addProduct"}/>
          {data && !isLoading ? (
              <Box
                  mt={"20px"}
                  display={"grid"}
                  gridTemplateColumns={"repeat(4,minmax(0,1fr))"}
                  justifyContent={"space-between"}
                  rowGap={"20px"}
                  columnGap={"1.33%"}
                  sx={{
                      "& > div": {
                          gridColumn: isLaptop ? undefined : "span 4",
                      },
                  }}
              >
                {data.map((item)=>{
                    return (
                        <Product
                            key={item._id}
                            _id={item._id}
                            name={item.name}
                            price = {item.price}
                            description={item.description}
                            category={item.category}
                            yearlySalesTotal={item.yearlySalesTotal}
                            yearlyTotalSoldUnits={item.yearlyTotalSoldUnits}
                            rating={item.rating}

                        />
                    );
                })}
              </Box>
          ) : (
              "...LODING....."
          )}
      </Box>
  );
}

export default Products
