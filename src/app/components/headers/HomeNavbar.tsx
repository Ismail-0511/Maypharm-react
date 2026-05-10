import React from "react";
import { Box, Button, Container, ListItemIcon, Menu, MenuItem, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { Logout } from "@mui/icons-material";

interface HomeNavbarProps {
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

export default function HomeNavbar(props: HomeNavbarProps) {
  const {
    cartItems, onAdd, onRemove, onDelete, onDeleteAll,
    setSignupOpen, setLoginOpen, handleLogoutClick,
    anchorEl, handleCloseLogout, handleLogoutRequest,
  } = props;
  const { authMember } = useGlobals();

  return (
    <div className="nav-fixed-bar">
      <Container>
        <Stack className="menu" style={{ position: "relative" }}>

          {/* Logo — unchanged */}
          <Box>
            <NavLink to="/">
              <img className="brand-logo brand-logo-dark" src="/icons/logo.png" alt="Maypharm" />
            </NavLink>
          </Box>

          {/* Pill nav — centered absolutely */}
          <Stack className="links">
            <div className="pill-nav">
              <Box className="hover-line">
                <NavLink to="/" activeClassName="underline" exact>Home</NavLink>
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
            </div>
          </Stack>

          {/* Right: basket + auth */}
          <Stack direction="row" alignItems="center" gap="16px" className="right-group">
            <Basket
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
              onDelete={onDelete}
              onDeleteAll={onDeleteAll}
            />

            {!authMember ? (
              <>
                <Button className="signup-btn" onClick={() => setSignupOpen(true)}>
                  Sign Up
                </Button>
                <div className="auth-sep" />
                <Button className="login-button" onClick={() => setLoginOpen(true)}>
                  Login
                </Button>
              </>
            ) : (
              <>
                <img
                  className="user-avatar"
                  src={
                    authMember?.memberImage
                      ? `${serverApi}/${authMember.memberImage}`
                      : "/icons/default-user.svg"
                  }
                  alt="user"
                  aria-controls="account-menu"
                  aria-haspopup="true"
                  onClick={handleLogoutClick}
                />
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
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.12))",
                      mt: 1.5,
                      borderRadius: "12px",
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
              </>
            )}
          </Stack>

        </Stack>
      </Container>
    </div>
  );
}
