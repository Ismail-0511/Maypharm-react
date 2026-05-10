import { Container, Stack, Box } from "@mui/material";
import { useState, SyntheticEvent, useEffect } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext  from "@mui/lab/TabContext";
import LocationOn  from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./ReceivedOrders";
import { useDispatch} from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setPausedOrders, setProcessOrders, setReceivedOrders } from "./slice";
import "../../../css/order.css"
import { Order, OrderInquiry } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";
import { MemberType } from "../../../lib/enums/member.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setReceivedOrders(data)),
});

export default function OrdersPage() {
  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
    actionDispatch(useDispatch());
  const { orderBuilder, authMember } = useGlobals();
  const history = useHistory();
  const [value, setValue] = useState("1");
  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    const order = new OrderService();
    order.getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
      .then((data) => setPausedOrders(data))
      .catch((err) => console.log(err));
    order.getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));
    order.getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [orderInquiry, orderBuilder]);

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="order-page">
      {/* ── HERO BANNER — full width profile + payment strip ── */}
      <Box className="order-container">
        <Container>

        {/* RIGHT rendered first so CSS order:-1 pulls it to top */}
        <Stack className="order-right" style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%" }}>

          {/* Profile info — stretches full banner width */}
          <Box className="order-info-box">
            <Box className="member-box">

              {/* Avatar */}
              <div className="order-user-img">
                <img
                  src={
                    authMember?.memberImage
                      ? `${serverApi}/${authMember.memberImage}`
                      : "/icons/default-user.svg"
                  }
                  className="order-user-avatar"
                  alt="profile"
                />
                <div className="order-user-icon-box">
                  <img
                    src={
                      authMember?.memberType === MemberType.COMPANY
                        ? "/icons/restaurant.svg"
                        : "/icons/default-user.svg"
                    }
                    className="order-user-prof-img"
                    alt="badge"
                  />
                </div>
              </div>

              {/* Name + role */}
              <div>
                <span className="order-user-name">
                  {authMember?.memberNick ?? "Guest"}
                </span>
                <br />
                <span className="order-user-prof">
                  {authMember?.memberType ?? "Member"}
                </span>
              </div>

              {/* Divider hidden in CSS */}
              <Box className="liner" />

              {/* Address */}
              <Box className="order-user-address">
                <LocationOn />
                <div className="spec-address-txt">
                  {authMember?.memberAddress ?? "No address on file"}
                </div>
              </Box>
            </Box>
          </Box>

          {/* Payment card — sits inline to the right inside banner */}
          <Stack className="order-user-card-frame">
            <Stack className="order-user-card-inputs">
              <input
                type="text"
                name="cardNumber"
                placeholder="Card number"
                className="card-input"
              />
              <div style={{ display: "flex", flexDirection: "row", gap: 8 }}>
                <input
                  type="text"
                  name="cardPeriod"
                  placeholder="MM / YY"
                  className="card-half-input"
                />
                <input
                  type="text"
                  name="cardCVV"
                  placeholder="CVV"
                  className="card-half-input"
                />
              </div>
              <input
                type="text"
                name="cardCreator"
                placeholder="Cardholder name"
                className="card-input"
              />
            </Stack>
            <Stack className="order-user-card-cardbox">
              <img src="icons/western-card.svg"  alt="western"    />
              <img src="icons/master-card.svg"   alt="mastercard" />
              <img src="icons/paypal-card.svg"   alt="paypal"     />
              <img src="icons/visa-card.svg"     alt="visa"       />
            </Stack>
          </Stack>
        </Stack>

        {/* ── LEFT — tabs + orders below the banner ── */}
        <Stack className="order-left">
          <TabContext value={value}>
            <Box className="order-nav-frame">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="order-tabs"
                  className="table_list"
                >
                  <Tab label="Paused Orders"   value={"1"} />
                  <Tab label="Process Orders"  value={"2"} />
                  <Tab label="Received Orders" value={"3"} />
                </Tabs>
              </Box>
            </Box>
            <Stack className="order-main-content">
              <PausedOrders  setValue={setValue} />
              <ProcessOrders setValue={setValue} />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>

        </Container>
      </Box>
    </div>
  );
}
