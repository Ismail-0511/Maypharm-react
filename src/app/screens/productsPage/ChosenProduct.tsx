import React, { useEffect, useLayoutEffect } from "react";
import { Container, Stack, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Divider from "../../components/divider";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";

import { useDispatch, useSelector} from "react-redux";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import {  setChosenPoduct, setcompany } from "./slice";
import { Product } from "../../../lib/types/product";
import { retrieveChosenProduct, retrievecompany  } from "./selector";
import { useParams } from "react-router-dom";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";

/** REDUX SLICE & SELECTOR **/

// actionDispatch → STORE ga data yuborish
const actionDispatch = (dispatch: Dispatch) => ({
    setcompany: (data: Member) => dispatch(setcompany(data)),
    setChosenPoduct: (data: Product) => dispatch(setChosenPoduct(data)),

});

// STEP:3 
// store dan data olish
const chosenProductRetriever = createSelector(
    retrieveChosenProduct,
    (chosenProduct) => ({chosenProduct})
);

const companyRetriever = createSelector(
    retrievecompany,
    (company) => ({company})
);

interface ChosenProductsProps {
    onAdd: (item: CartItem) => void;
}

export default function ChosenProduct(props: ChosenProductsProps) {
  const { onAdd } = props; // distraction
  const {productId} = useParams<{ productId: string}>();
  const {setcompany, setChosenPoduct} = actionDispatch(useDispatch());
  const {chosenProduct} = useSelector(chosenProductRetriever);
  const {company} = useSelector(companyRetriever);


  useEffect(() => {
    const product = new  ProductService();
    product.getProduct(productId)
    .then((data) => setChosenPoduct(data))
    .catch((err) => console.log(err));

    const member = new MemberService();
    member.getcompany()
    .then((data) => setcompany(data))
    .catch((err) => console.log(err))
  }, []);
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  if(!chosenProduct) return null;
  return (
    <div className={"chosen-product"}>
      <Box className={"title"}>Product Detail</Box>
      <Container className={"product-container"}>
        <Stack className={"chosen-product-slider"}>
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="swiper-area"
          >
            {chosenProduct?.productImages.map(
              (ele: string, index: number) => {

                const imagePath = `${serverApi}/${ele}`;
                return (
                  <SwiperSlide key={index}>
                    <img className="slider-image" src={imagePath} />
                  </SwiperSlide>
                );
              }
            )}
          </Swiper>
        </Stack>
        <Stack className={"chosen-product-info"}>
          <Box className={"info-box"}>
            <strong className={"product-name"}>{chosenProduct?.productName}</strong>
            <span className={"resto-name"}>{company?.memberNick}</span> 
            <span className={"resto-name"}>{company?.memberPhone}</span> 
            <Box className={"rating-box"}>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
              <div className={"evaluation-box"}>
                <div className={"product-view"}>
                  <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                  <span>{chosenProduct?.productViews}</span>
                </div>
              </div>
            </Box>
            <p className={"product-desc"}>{chosenProduct?.productDesc ? chosenProduct?.productDesc : "No Description" }</p>
            <Divider height="1" width="100%" bg="#000000" />
            <div className={"product-price"}>
              <span>Price:</span>
              <span>${chosenProduct?.productPrice}</span>
            </div>
            <div className={"button-box"}>
              <Button 
                variant="contained"
                onClick={() => {
                  onAdd({
                    _id: chosenProduct._id,
                    quantity: 1,
                    name: chosenProduct.productName,
                    price: chosenProduct.productPrice,
                    image: chosenProduct.productImages[0],
                  });
                }}
              >
                Add To Basket
              </Button>
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
