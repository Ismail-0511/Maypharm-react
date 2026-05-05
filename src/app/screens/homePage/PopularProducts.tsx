import React, { useState } from "react";
import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useHistory } from "react-router-dom";
import { retrievePopularProducts } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

const PopularProductsRetriever = createSelector(
    retrievePopularProducts,
    (PopularProducts) => ({ PopularProducts })
);

export default function PopularProducts() {
    const { PopularProducts } = useSelector(PopularProductsRetriever);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const history = useHistory();

    // Sort by views descending, take top 3
    const products = [...PopularProducts]
        .sort((a: any, b: any) => (b.productViews ?? 0) - (a.productViews ?? 0))
        .slice(0, 3);

    const handleViewProduct = (productId: string) => {
        // Navigate to products page with the product id as a query param
        history.push(`/products?productId=${productId}`);
    };

    return (
        <div className="popular-dishes-frame">
            <Container maxWidth="lg">
                {/* Section Header */}
                <div className="pp-header">
                    <span className="pp-eyebrow"></span>
                    <h2 className="pp-title">Bestsellers Now</h2>
                    <div className="pp-title-rule" />
                </div>

                {/* Product Grid */}
                <div className="pp-grid">
                    {products.map((product: any, index: number) => {
                        const imagePath = product.productImages?.[0]
                            ? `${serverApi}/${product.productImages[0]}`
                            : "";
                        const isHovered = hoveredId === product._id;
                        const rankLabel = ["01", "02", "03"][index];

                        return (
                            <div
                                key={product._id}
                                className={`pp-card ${isHovered ? "pp-card--hovered" : ""} pp-card--${index}`}
                                onMouseEnter={() => setHoveredId(product._id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                {/* Image */}
                                <div className="pp-card__image-wrap">
                                    {imagePath && (
                                        <img
                                            src={imagePath}
                                            alt={product.productName}
                                            className="pp-card__img"
                                        />
                                    )}
                                    <div className="pp-card__overlay" />

                                    {/* Rank Badge */}
                                    <span className="pp-card__rank">{rankLabel}</span>

                                    {/* Views pill */}
                                    <div className="pp-card__views">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                            <circle cx="12" cy="12" r="3"/>
                                        </svg>
                                        {product.productViews?.toLocaleString() ?? "—"}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="pp-card__content">
                                    <div className="pp-card__meta">
                                        <span className="pp-card__category">Bestseller</span>
                                        {product.productPrice && (
                                            <span className="pp-card__price">${product.productPrice}</span>
                                        )}
                                    </div>
                                    <h3 className="pp-card__name">{product.productName}</h3>
                                    <p className="pp-card__desc">{product.productDesc}</p>
                                    <button
                                        className="pp-card__cta"
                                        onClick={() => handleViewProduct(product._id)}
                                    >
                                        View Product
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M5 12h14M12 5l7 7-7 7"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </div>
    );
}
