import React from "react";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector";
import { Messages, serverApi } from "../../../lib/config";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { T } from "../../../lib/types/common";

/** REDUX SLICE & SELECTOR */
const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({ pausedOrders })
);

interface PausedOrdersProps {
  setValue: (input: string) => void;
}

/** Simple card validation helpers */
const getCardValues = () => {
  const cardNumber = (
    document.querySelector('input[name="cardNumber"]') as HTMLInputElement
  )?.value?.replace(/\s/g, "") ?? "";
  const cardPeriod = (
    document.querySelector('input[name="cardPeriod"]') as HTMLInputElement
  )?.value ?? "";
  const cardCVV = (
    document.querySelector('input[name="cardCVV"]') as HTMLInputElement
  )?.value ?? "";
  const cardCreator = (
    document.querySelector('input[name="cardCreator"]') as HTMLInputElement
  )?.value ?? "";
  return { cardNumber, cardPeriod, cardCVV, cardCreator };
};

const validateCard = (): string | null => {
  const { cardNumber, cardPeriod, cardCVV, cardCreator } = getCardValues();

  if (!cardNumber || cardNumber.length < 12)
    return "Please enter a valid card number.";

  if (!cardPeriod || !/^\d{2}\s*\/\s*\d{2}$/.test(cardPeriod))
    return "Please enter card expiry (MM / YY).";

  if (!cardCVV || cardCVV.length < 3)
    return "Please enter a valid CVV.";

  if (!cardCreator.trim())
    return "Please enter the cardholder name.";

  return null; // valid
};

export default function PausedOrders(props: PausedOrdersProps) {
  const { setValue } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const { pausedOrders } = useSelector(pausedOrdersRetriever);

  /** Handlers **/
  const deleteOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.DELETE,
      };

      const confirmation = window.confirm("Do you want to delete the order?");
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const processOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);

      // ── Card validation ──────────────────────────────────
      const validationError = validateCard();
      if (validationError) {
        window.alert(validationError);
        return;
      }
      // ────────────────────────────────────────────────────

      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.PROCESS,
      };

      const confirmation = window.confirm(
        "Do you want to proceed with payment?"
      );
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setValue("2");
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value={"1"}>
      <Stack>
        {pausedOrders?.map((order: Order) => {
          return (
            <Box key={order._id} className={"order-main-box"}>
              <Box className={"order-box-scroll"}>
                {order?.orderItems?.map((item: OrderItem) => {
                  const product: Product = order.productData.filter(
                    (ele: Product) => item.productId === ele._id
                  )[0];

                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Box key={item._id} className={"orders-name-price"}>
                      <img
                        src={imagePath}
                        alt=""
                        className="order-dish-img"
                      />
                      <p className="title-dish">{product.productName}</p>
                      <Box className={"price-box"}>
                        <p>${item.itemPrice}</p>
                        <img src="/icons/close.svg" alt="" />
                        <p>{item.itemQuantity}</p>
                        <img src="/icons/pause.svg" alt="" />
                        <p style={{ marginLeft: "15px" }}>
                          ${item.itemQuantity * item.itemPrice}
                        </p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              <Box className={"total-price-box"}>
                <Box className={"box-total"}>
                  <p>Product Price</p>
                  <p>${order.orderTotal - order.orderDelivery}</p>
                  <img
                    src="/icons/plus.svg"
                    style={{ marginLeft: "20px" }}
                    alt=""
                  />
                  <p>Delivery cost</p>
                  <p>${order.orderDelivery}</p>
                  <img
                    src="/icons/pause.svg"
                    style={{ marginLeft: "20px" }}
                    alt=""
                  />
                  <p>Total</p>
                  <p>${order.orderTotal}</p>
                </Box>
                <Button
                  value={order._id}
                  variant="contained"
                  color="secondary"
                  className={"cancel-button"}
                  onClick={deleteOrderHandler}
                >
                  Cancel
                </Button>
                <Button
                  value={order._id}
                  variant="contained"
                  className="pay-button"
                  onClick={processOrderHandler}
                >
                  Payment
                </Button>
              </Box>
            </Box>
          );
        })}

        {!pausedOrders ||
          (pausedOrders.length === 0 && (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
            >
              <img
                src={"/icons/noimage-list.svg"}
                alt=""
                style={{ width: 300, height: 300 }}
              />
            </Box>
          ))}
      </Stack>
    </TabPanel>
  );
}
