import React from "react";
import { Box, Button, Container, ListItemIcon, Menu, MenuItem, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { Logout } from "@mui/icons-material";

interface OtherNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}

export default function OtherNavbar(props: OtherNavbarProps) {
  const {
    cartItems, onAdd, onRemove, onDelete, onDeleteAll,
    setSignupOpen, setLoginOpen, handleLogoutClick,
    anchorEl, handleCloseLogout, handleLogoutRequest,
  } = props;
  const { authMember } = useGlobals();

  return (
    <>
      {/* FIXED NAV BAR — always white/frosted on non-hero pages */}
      <div className="nav-fixed-bar">
        <Container>
          <Stack className="menu">
            <Box>
              <NavLink to="/">
                <img className="brand-logo brand-logo-dark" src="/icons/logo.png" alt="Maypharm" />
              </NavLink>
            </Box>
            <Stack className="links">
              <Box className="hover-line">
                <NavLink to="/" exact>Home</NavLink>
              </Box>
             
              <Box className="hover-line">
                <NavLink to="/products" activeClassName="underline">Products</NavLink>
              </Box>
              {authMember && (
                <Box className="hover-line">
                  <NavLink to="/orders" activeClassName="underline">Orders</NavLink>
                </Box>
              )}
              {authMember && (
                <Box className="hover-line">
                  <NavLink to="/member-page" activeClassName="underline">My Page</NavLink>
                </Box>
              )}
              <Box className="hover-line">
                <NavLink to="/help" activeClassName="underline">Contact & Inquiry</NavLink>
              </Box>
              <Basket cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} onDelete={onDelete} onDeleteAll={onDeleteAll} />
              {!authMember ? (
                <Button variant="contained" className="login-button" onClick={() => setLoginOpen(true)}>Login</Button>
              ) : (
                <img
                  className="user-avatar"
                  src={authMember?.memberImage ? `${serverApi}/${authMember.memberImage}` : "/icons/default-user.svg"}
                  alt="user"
                  aria-controls="account-menu"
                  aria-haspopup="true"
                  onClick={handleLogoutClick}
                />
              )}
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={Boolean(anchorEl)}
                onClose={handleCloseLogout}
                onClick={handleCloseLogout}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": { width: 32, height: 32, ml: -0.5, mr: 1 },
                    "&:before": {
                      content: '""', display: "block", position: "absolute",
                      top: 0, right: 14, width: 10, height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)", zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleLogoutRequest}>
                  <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Stack>
          </Stack>
        </Container>
      </div>

      {/* Spacer so page content starts below the fixed bar */}
      <div className="other-navbar" />
    </>
  );
}
