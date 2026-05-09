import React from "react";
import { Box, Container, Stack } from "@mui/material";

export default function Events() {
  return (
    <div className="promo-video-frame">
      <Container>
        <Stack className="promo-video-main">
          <Box className="category-title">Promotional Video</Box>
          <Box className="promo-video-subtitle">
            Discover our latest aesthetic products and innovations
          </Box>
          <Box className="promo-video-wrapper">
            <iframe
              className="promo-video-iframe"
              src="https://www.youtube.com/embed/E4STG1ulLrg"
              title="Maypharm Promotional Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Box>
        </Stack>
      </Container>
    </div>
  );
}