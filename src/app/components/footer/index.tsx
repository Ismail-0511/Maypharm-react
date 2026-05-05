import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Footers = styled.div`
  width: 100%;
  height: 590px;
  display: flex;
  background: #212121;
  background-size: cover;
`;

export default function Footer() {
  const authMember = null;

  return (
    <Footers>
      <Container>
        <Stack flexDirection={"row"} sx={{ mt: "94px" }}>
          <Stack flexDirection={"column"} style={{ width: "340px" }}>
            <Box>
              <img width={"140px"} src={"/icons/logo.svg"} />
            </Box>
            <Box className={"foot-desc-txt"}>
              A global leader in cosmetic medicine and dermo-cosmetic products,
              dedicated to rejuvenating and elevating skin health. All products
              manufactured in strict accordance with KFDA safety standards.
            </Box>
            <Box className="sns-context">
              <img src={"/icons/facebook.svg"} />
              <img src={"/icons/twitter.svg"} />
              <img src={"/icons/instagram.svg"} />
              <img src={"/icons/youtube.svg"} />
            </Box>
          </Stack>
          <Stack sx={{ ml: "288px" }} flexDirection={"row"}>
            <Stack>
              <Box>
                <Box className={"foot-category-title"}>Navigation</Box>
                <Box className={"foot-category-link"}>
                  <Link to="/">Home</Link>
                  <Link to="/about">About Us</Link>
                  <Link to="/products">Products</Link>
                  {authMember && <Link to="/orders">Orders</Link>}
                  <Link to="/help">Contact & Inquiry</Link>
                </Box>
              </Box>
            </Stack>
            <Stack sx={{ ml: "100px" }}>
              <Box>
                <Box className={"foot-category-title"}>Find us</Box>
                <Box
                  flexDirection={"column"}
                  sx={{ mt: "20px" }}
                  className={"foot-category-link"}
                  justifyContent={"space-between"}
                >
                  <Box flexDirection={"row"} className={"find-us"}>
                    <span>L.</span>
                    <div>#1515, 15F, A1 Tower, Geumcheon-gu, Seoul, Korea</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>P.</span>
                    <div>+82-2-6933-6086</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>E.</span>
                    <div>sales@maypharm.co.kr</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>F.</span>
                    <div>+82-70-8224-0187</div>
                  </Box>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          style={{ border: "1px solid #C5C8C9", width: "100%", opacity: "0.2" }}
          sx={{ mt: "80px" }}
        ></Stack>
        <Stack className={"copyright-txt"}>
          © Copyright {new Date().getFullYear()} MAYPHARM, INC. All Rights Reserved.
        </Stack>
      </Container>
    </Footers>
  );
}
