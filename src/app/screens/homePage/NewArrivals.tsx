import React from "react";
import { Container, Box, Stack } from "@mui/material";
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from "../../components/divider";
import Typography from '@mui/joy/Typography';
import { CssVarsProvider } from '@mui/joy/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewArrivals } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";

/** REDUX SLICE & SELECTOR **/
const NewArrivalsRetriever = createSelector(
    retrieveNewArrivals,
    (NewArrivals) => ({ NewArrivals })
);

export default function NewArrivals() {
    const { NewArrivals } = useSelector(NewArrivalsRetriever);
    const history = useHistory();

    return (
        <div className={"new-products-frame"}>
            <Container>
                <Stack className="main">
                    <Box className="category-title">New Arrivals</Box>
                    <Stack className="cards-frame">
                        <CssVarsProvider>
                            {NewArrivals.length !== 0 ? (
                                NewArrivals.map((product: Product) => {
                                    const imagePath = `${serverApi}/${product.productImages[0]}`;
                                    return (
                                        <Card 
                                            key={product._id} 
                                            variant="outlined" 
                                            className={"card"} 
                                            onClick={() => history.push(`/products/${product._id}`)}
                                            sx={{ cursor: "pointer" }}>
                                            <CardOverflow>
                                                <div className={"product-sale"}>
                                                    {product.productCollection}
                                                </div>
                                                <AspectRatio ratio={1}>
                                                    <img src={imagePath} alt={product.productName} />
                                                </AspectRatio>
                                                <CardOverflow variant="soft">
                                                </CardOverflow>
                                            </CardOverflow>

                                            <CardOverflow variant="soft" className="product-detail">
                                                <Stack className="info">
                                                    <Stack flexDirection={"row"}>
                                                        <Typography className={"title"}>
                                                            {product.productName}
                                                        </Typography>
                                                        <Divider width="2" height="24" bg="#d9d9d9" />
                                                        <Typography className={"price"}>
                                                            ${product.productPrice}
                                                        </Typography>
                                                    </Stack>
                                                    <Stack>
                                                        <Typography className="views">
                                                            {product.productViews}
                                                            <VisibilityIcon sx={{ fontSize: 20, marginLeft: "5px" }} />
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                            </CardOverflow>
                                        </Card>
                                    );
                                })
                            ) : (
                                <Box className="no-data">New arrivals are not available!</Box>
                            )}
                        </CssVarsProvider>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}
