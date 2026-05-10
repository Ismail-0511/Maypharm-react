import React from "react";
import { Box, IconButton, Badge, Menu, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import { Messages, serverApi } from "../../../lib/config";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";

interface BasketProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

export default function Basket(props: BasketProps) {
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const history = useHistory();

  const itemsPrice = cartItems.reduce((a, c) => a + c.quantity * c.price, 0);
  const shippingCost = itemsPrice < 100 ? 5 : 0;
  const totalPrice = (itemsPrice + shippingCost).toFixed(1);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const proceedOrderHandler = async () => {
    try {
      handleClose();
      if (!authMember) throw new Error(Messages.error2);
      const order = new OrderService();
      await order.createOrder(cartItems);
      onDeleteAll();
      setOrderBuilder(new Date());
      history.push("/orders");
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Box className={"hover-line"}>
      <IconButton
        aria-label="cart"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Badge badgeContent={cartItems.length} color="secondary">
          <img src={"/icons/shopping-cart.svg"} alt="cart" />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="basket-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 16px rgba(0,0,0,0.10))",
            mt: 1.5,
            borderRadius: "12px",
            border: "0.5px solid #eeece8",
            "&:before": {
              content: '""', display: "block", position: "absolute",
              top: 0, right: 14, width: 10, height: 10,
              bgcolor: "#f5f3ef",
              transform: "translateY(-50%) rotate(45deg)", zIndex: 0,
              borderTop: "0.5px solid #eeece8",
              borderLeft: "0.5px solid #eeece8",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box className="bk">
          {/* Header */}
          <Box className="bk-head">
            <Box className="bk-head-left">
              <span className="bk-head-icon">🛍</span>
              <Box>
                <div className="bk-head-title">Your basket</div>
                <div className="bk-head-count">{cartItems.length} item{cartItems.length !== 1 ? "s" : ""}</div>
              </Box>
            </Box>
            {cartItems.length > 0 && (
              <button className="bk-head-clear" onClick={() => { onDeleteAll(); handleClose(); }}>
                🗑 Clear all
              </button>
            )}
          </Box>

          {/* Items */}
          <Box className="bk-items">
            {cartItems.length === 0 ? (
              <Box className="bk-empty">
                <div className="bk-empty-icon">🛒</div>
                Your cart is empty
              </Box>
            ) : (
              cartItems.map((item: CartItem) => {
                const imagePath = `${serverApi}/${item.image}`;
                return (
                  <Box className="bk-item" key={item._id}>
                    <img src={imagePath} className="bk-img" alt={item.name} />
                    <Box className="bk-info">
                      <div className="bk-name">{item.name}</div>
                      <div className="bk-price">${item.price.toFixed(2)} each</div>
                      <Box className="bk-qty">
                        <button className="bk-qty-btn" onClick={() => onRemove(item)}>−</button>
                        <span className="bk-qty-num">{item.quantity}</span>
                        <button className="bk-qty-btn" onClick={() => onAdd(item)}>+</button>
                      </Box>
                    </Box>
                    <button className="bk-del" onClick={() => onDelete(item)} aria-label="Remove">✕</button>
                  </Box>
                );
              })
            )}
          </Box>

          {/* Summary + Order button */}
          {cartItems.length > 0 && (
            <>
              <Box className="bk-summary">
                <Box className="bk-summary-row">
                  <span>Subtotal</span><span>${itemsPrice.toFixed(2)}</span>
                </Box>
                <Box className="bk-summary-row">
                  <span>Shipping</span><span>${shippingCost.toFixed(2)}</span>
                </Box>
                <Box className="bk-summary-total">
                  <span className="bk-total-label">Total</span>
                  <span className="bk-total-val">${totalPrice}</span>
                </Box>
              </Box>
              <button className="bk-btn" onClick={proceedOrderHandler}>
                🛒 Place order
              </button>
            </>
          )}
        </Box>
      </Menu>
    </Box>
  );
}
