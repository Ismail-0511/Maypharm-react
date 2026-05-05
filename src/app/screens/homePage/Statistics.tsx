import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Divider from "../../components/divider";

export default function Statistics() {
    return (
        <div className="static-frame">
            <Container>
                <Stack className="info">
                    <Stack className="static-box">
                        <Box className="static-num">200+</Box>
                        <Box className="static-text">Global Partners</Box>
                    </Stack>
                    <Divider height="64" width="2" bg="rgba(255,255,255,0.15)" />
                    <Stack className="static-box">
                        <Box className="static-num">15 years</Box>
                        <Box className="static-text">On the Market</Box>
                    </Stack>
                    <Divider height="64" width="2" bg="rgba(255,255,255,0.15)" />
                    <Stack className="static-box">
                        <Box className="static-num">100+</Box>
                        <Box className="static-text">Products</Box>
                    </Stack>
                    <Divider height="64" width="2" bg="rgba(255,255,255,0.15)" />
                    <Stack className="static-box">
                        <Box className="static-num">10,000+</Box>
                        <Box className="static-text">Clients</Box>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}
