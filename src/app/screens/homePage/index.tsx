import React, { useEffect } from "react";
import About from "./About";
import Statistics from "./Statistics";
import PopularProducts from './PopularProducts';
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import NewArrivals from "./NewArrivals";
import "../../../css/home.css";

import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewArrivals, setPopularProducts, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { Member } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";

const actionDispatch = (dispatch: Dispatch) => ({
    setPopularProducts: (data: Product[]) => dispatch(setPopularProducts(data)),
    setNewArrivals: (data: Product[]) => dispatch(setNewArrivals(data)),
    setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

export default function HomePage() {
    const { setPopularProducts, setNewArrivals, setTopUsers } = actionDispatch(useDispatch());

    useEffect(() => {
        const product = new ProductService();

        // Top products by views across ALL collections (no productCollection filter)
        product.getProducts({
            page: 1,
            limit: 4,
            order: "productViews",
        })
        .then((data) => setPopularProducts(data))
        .catch((err) => console.log(err));

        // Newest across all collections → New Arrivals
        product.getProducts({
            page: 1,
            limit: 4,
            order: "createdAt",
        })
        .then((data) => setNewArrivals(data))
        .catch((err) => console.log(err));

        const member = new MemberService();
        member
            .getTopUsers()
            .then((data) => setTopUsers(data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className={"homepage"}>
            <About />
            <PopularProducts />
            <NewArrivals />
            <ActiveUsers />
            <Events />
        </div>
    );
}
