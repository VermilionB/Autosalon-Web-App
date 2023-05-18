import {
    ADMIN_ROUTE,
    AUTOMOBILE_ROUTE, CHAT_ROUTE,
    LOGIN_ROUTE, MAIN_ROUTE,
    ORDERS_ROUTE,
    REGISTRATION_ROUTE,
    REQUESTS_ROUTE, USER_ROUTE
} from "./utils/consts";

import MainPage from "./pages/MainPage";
import AutomobilePage from "./pages/AutomobilePage";
import Auth from "./pages/AuthPage";
import OrdersPage from "./pages/OrdersPage";
import AutomobileInfoPage from "./pages/AutomobileInfoPage";
import RequestsPage from "./pages/RequestsPage";
import AdminPage from "./components/adminComponents/AdminPage";
import UserPage from "./pages/UserPage";
import Chat from "./components/chatComponents/Chat";

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
    {
        path: AUTOMOBILE_ROUTE,
        Component: AutomobilePage
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: AUTOMOBILE_ROUTE + '/:id',
        Component: AutomobileInfoPage
    }
]

export const authRoutes = [
    {
        path: ORDERS_ROUTE,
        Component: OrdersPage
    },
    {
        path: REQUESTS_ROUTE,
        Component: RequestsPage
    },
    {
        path: ADMIN_ROUTE,
        Component: AdminPage
    },
    {
        path: USER_ROUTE,
        Component: UserPage
    },
    {
        path: CHAT_ROUTE,
        Component: Chat
    }
]