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
              <img width={"140px"} src={"/icons/logo.png"} />
            </Box>
            <Box className={"foot-desc-txt"}>
              A global leader in cosmetic medicine and dermo-cosmetic products,
              dedicated to rejuvenating and elevating skin health. All products
              manufactured in strict accordance with KFDA safety standards.
            </Box>
            <Box className="sns-context">
              <a href="https://www.facebook.com/profile.php?id=100076786523475&locale=ru_RU" target="_blank" rel="noopener noreferrer">
            <img src={"/icons/facebook.svg"} alt="Facebook" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src={"/icons/twitter.svg"} alt="Twitter" />
              </a>
               <a href="https://www.instagram.com/1.ismaaill?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
            <img src={"/icons/instagram.svg"} alt="Instagram" />
               </a>
               <a href="https://youtu.be/241iic7NuJY?si=jeFPYEMt5LHXzSZ6" target="_blank" rel="noopener noreferrer">
            <img src={"/icons/youtube.svg"} alt="YouTube" />
               </a>
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
