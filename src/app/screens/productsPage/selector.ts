import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectProductsPage = (state: AppRootState) => state.productsPage;

export const retrievecompany = createSelector(
    selectProductsPage, (productsPage) => productsPage.company
);

export const retrieveChosenProduct = createSelector(
    selectProductsPage, (productsPage) => productsPage.chosenProduct
);

export const retrieveProducts = createSelector(
    selectProductsPage, (productsPage) => productsPage.products
)