import React, { ChangeEvent, useEffect, useState } from "react";
import { Container, Box, Stack, Button } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useDispatch, useSelector } from "react-redux";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(
  retrieveProducts,
  (products) => ({ products })
);

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);

  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: undefined,
    search: "",
  });

  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  // FIX 1: fetch products whenever filters change
  useEffect(() => {
    const productService = new ProductService();
    productService
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch]);

  // FIX 2: only reset search and re-fetch when searchText is cleared
  useEffect(() => {
    if (searchText === "") {
      setProductSearch((prev) => ({ ...prev, search: "" }));
    }
  }, [searchText]);

  /** HANDLERS **/
  const searchCollectionHandler = (collection: ProductCollection) => {
  setProductSearch((prev) => ({
    ...prev,
    page: 1,
    productCollection: prev.productCollection === collection ? undefined : collection,
  }));
};

  const searchOrderHandler = (order: string) => {
    setProductSearch((prev) => ({ ...prev, page: 1, order }));
  };

  const searchProductHandler = () => {
    setProductSearch((prev) => ({ ...prev, search: searchText }));
  };

  const paginationHandler = (_e: ChangeEvent<unknown>, value: number) => {
    setProductSearch((prev) => ({ ...prev, page: value }));
  };

  const chooseProductHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <div className={"products"}>
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>

          {/* Search Bar */}
          <Stack className={"avatar-big-box"}>
            <Stack className={"top-text"}>
              <p>Products</p>
              <Stack className={"single-search-big-box"}>
                <input
                  type={"search"}
                  className={"single-search-input"}
                  name={"singleResearch"}
                  placeholder={"Type here"}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") searchProductHandler();
                  }}
                />
                <Button
                  className={"single-button-search"}
                  variant="contained"
                  onClick={searchProductHandler}
                >
                  Search
                </Button>
              </Stack>
            </Stack>
          </Stack>

          {/* Order Filter */}
          <Stack className={"dishes-filter-section"}>
            <Stack className={"dishes-filter-box"}>
              <Button
                className={"order"}
                variant={"contained"}
                color={productSearch.order === "createdAt" ? "primary" : "secondary"}
                onClick={() => searchOrderHandler("createdAt")}
              >
                New
              </Button>
              <Button
                className={"order"}
                variant={"contained"}
                color={productSearch.order === "productPrice" ? "primary" : "secondary"}
                onClick={() => searchOrderHandler("productPrice")}
              >
                Price
              </Button>
              <Button
                className={"order"}
                variant={"contained"}
                color={productSearch.order === "productViews" ? "primary" : "secondary"}
                onClick={() => searchOrderHandler("productViews")}
              >
                Views
              </Button>
            </Stack>
          </Stack>

          {/* Category + Product Grid */}
          <Stack className={"list-category-section"}>


            <Stack className="product-category">
              <div className="category-main">
                {[
                  ProductCollection.FILLER,
                  ProductCollection.LIPOLYSIS,
                  ProductCollection.SKIN_BOOSTER,
                  ProductCollection.COSMETIC,
                  ProductCollection.HAIR_CARE,
                  ProductCollection.TOXINS,
                ].map((col) => (
                  <Button
                    key={col}
                    className={"order"}
                    variant={"contained"}
                    color={productSearch.productCollection === col ? "primary" : "secondary"}
                    onClick={() => searchCollectionHandler(col)}
                  >
                    {col.replace("_", " ")}
                  </Button>
                ))}
              </div>
            </Stack>

            {/* Product Cards */}
            <Stack className={"product-wrapper"}>
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;

                  return (
                    <Stack
                      key={product._id}
                      className={"product-card"}
                      onClick={() => chooseProductHandler(product._id)}
                    >
                      <Stack
                        className={"product-img"}
                        sx={{ backgroundImage: `url(${imagePath})` }}
                      >
                        <Button
                          className={"shop-btn"}
                          onClick={(e) => {
                            e.stopPropagation();
                            onAdd({
                              _id: product._id,
                              quantity: 1,
                              name: product.productName,
                              price: product.productPrice,
                              image: product.productImages[0],
                            });
                          }}
                        >
                          <img
                            src={"/icons/shopping-cart.svg"}
                            style={{ display: "flex" }}
                            alt="add to cart"
                          />
                        </Button>
                        <Button className={"view-btn"} sx={{ right: "36px" }}>
                          <Badge
                            badgeContent={product.productViews}
                            color={"secondary"}
                          >
                            <RemoveRedEyeIcon
                              sx={{
                                color: product.productViews === 0 ? "gray" : "white",
                              }}
                            />
                          </Badge>
                        </Button>
                      </Stack>
                      <Box className={"product-desc"}>
                        <span className={"product-title"}>
                          {product.productName}
                        </span>
                        <div className={"product-desc"}>
                          <MonetizationOnIcon />
                          {product.productPrice}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className={"no-data"}>Products are not available!</Box>
              )}
            </Stack>
          </Stack>

          {/* Pagination */}
          <Stack className={"pagination-section"}>
            <Pagination
              count={
                products.length !== 0
                  ? productSearch.page + 1
                  : productSearch.page
              }
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color={"secondary"}
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>

      {/* Certifications / Brands Section */}
      <div className={"brands-logo"}>
        <Container className={"family-brands"}>
          <Box className={"category-title"}>Our Certifications</Box>
          <Stack className={"brand-list"}>
            {["CE", "CPNP", "KFDA", "GMP"].map((cert) => (
              <Box key={cert} className={"review-box"} sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                fontWeight: 700,
                color: "#d7b686",
                letterSpacing: "2px",
              }}>
                {cert}
              </Box>
            ))}
          </Stack>
        </Container>
      </div>

      {/* Address Section */}
      <div className={"address"}>
        <Container>
          <Stack className="address-area">
            <Box className="title">Our Address</Box>
            <iframe
              style={{ marginTop: "60px" }}
              src="https://maps.google.com/maps?q=Gasan+Digital+1-ro+205-27+Geumcheon-gu+Seoul+Korea&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="600"
              height="450"
              title="Maypharm Office Location"
              loading="lazy"
            />
          </Stack>
        </Container>
      </div>
    </div>
  );
}
