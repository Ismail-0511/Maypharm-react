import { createSelector } from 'reselect';
import { AppRootState } from '../../../lib/types/screen';
import OrdersPage from '.';

const selectOrdersPage = (state: AppRootState) => state.ordersPage;
export const retrievePausedOrders = createSelector(
    selectOrdersPage,
    (OrdersPage) => OrdersPage.pausedOrders
);

export const retrieveProcessOrders = createSelector(
    selectOrdersPage,
    (OrdersPage) => OrdersPage.processOrders
);

export const retrieveReceivedOrders = createSelector(
    selectOrdersPage,
    (OrdersPage) => OrdersPage.ReceivedOrders
);