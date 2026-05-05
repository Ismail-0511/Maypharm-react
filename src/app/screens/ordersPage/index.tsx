import { Container, Stack, Box } from "@mui/material";
import { useState, SyntheticEvent, useEffect } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext  from "@mui/lab/TabContext";
import LocationOn  from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import { useDispatch} from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setPausedOrders, setProcessOrders, setFinishedOrders } from "./slice";
import "../../../css/order.css"
import { Order, OrderInquiry } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
    setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
    setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
    setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});


export default function OrdersPage() {
    const {setPausedOrders, setProcessOrders, setFinishedOrders} = 
    actionDispatch(useDispatch());
    const {orderBuilder} = useGlobals();
    const [value, setValue] = useState("1")
    const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
        page: 1,
        limit: 5,
        orderStatus: OrderStatus.PAUSE,
    })


    useEffect(() => {
        const order = new OrderService()

        order
        .getMyOrders({... orderInquiry, orderStatus: OrderStatus.PAUSE})
        .then((data) => setPausedOrders(data))
        .catch((err) => console.log(err));

         order
        .getMyOrders({... orderInquiry, orderStatus: OrderStatus.PROCESS})
        .then((data) => setProcessOrders(data))
        .catch((err) => console.log(err));

         order
        .getMyOrders({... orderInquiry, orderStatus: OrderStatus.FINISH})
        .then((data) => setFinishedOrders(data))
        .catch((err) => console.log(err));
    },[orderInquiry, orderBuilder])

    const handleChange = (e: SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    return (

    <div className="order-page">
        <Container className={"order-container"}>
            <Stack className={"order-left"}>
                <TabContext value={value}>
                    <Box className = {"order-nav-frame"}>
                        <Box sx={{borderBottom:1, borderColor: "divider"}}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="basic-tabs-example"
                                className={"table_list"}
                                >
                                <Tab label="PAUSED ORDERS" value={"1"}/>
                                <Tab label="PROCESS ORDERS" value={"2"}/>
                                <Tab label="FINISHED ORDERS" value={"3"}/>
                            </Tabs>
                        </Box>
                    </Box>
                    <Stack className={"order-main-content"}>
                        <PausedOrders setValue={setValue} />
                        <ProcessOrders setValue={setValue}/>
                        <FinishedOrders/>
                    </Stack>
                </TabContext>
            </Stack>
            <Stack className={"order-right"}>
                <Box className={"order-info-box"}>
                    <Box className={"member-box"}>
                        <div className="order-user-image">
                            <img  className={"order-user-avatar"} src="/icons/default-user.svg" />
                            <div className={"order-user-icon-box"}>
                                <img src={"/icons/user-badge.svg"} className={"order-user-prof-img"} />
                            </div>
                            <span className={"order-user-name"}>Alex</span>
                            <span className={"order-user-prof"}>User</span>
                        </div>

                    </Box>
                    <Box className={"linier"}></Box>
                    <Stack className={"order-user-location"} >
                        <Box className={"order-user-location-frame"}>
                            <div>                            
                                <img src="/icons/location.svg" className={"user-location-svg"} style={{width: 24, height: 24, marginLeft: 30}} alt="" />
                            </div>
                            <div>
                            <Box className={"order-user-location-txt"}>South Korea, Busan</Box>
                            </div>
                        </Box>
                    </Stack>
                </Box>
                <Stack className={"order-user-card-frame"}>
                    <Stack className={"order-user-card-inputs"}>
                        <input type="text" name="cardNumber" placeholder={"Card number : **** 4090 2002 7495"}
                        className={"card-input"} />
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
                            <input                 
                            type={"text"}
                            name={"cardPeriod"}
                            placeholder={"07 / 24"}
                            className={"card-half-input"}/>
                            <input
                            type={"text"}
                            name={"cardCVV"}
                            placeholder={"CVV : 010"}
                            className={"card-half-input"}/>
                        </div>
                        <input
                        type={"text"}
                        name={"cardCreator"}
                        placeholder={"Justin Robertson"}
                        className={"card-input"}/>
                    </Stack>
                    <Stack className={"order-user-card-cardbox"} sx={{}}>
                        <img src="icons/western-card.svg" alt="" />
                        <img src="icons/master-card.svg" alt="" />
                        <img src="icons/paypal-card.svg" alt="" />
                        <img src="icons/visa-card.svg" alt="" />
                    </Stack>
                </Stack>
            </Stack>

        </Container>
    </div>
    )
}