import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AutomobileStore from "./store/automobileStore";
import {ChakraProvider} from "@chakra-ui/react";
import UserStore from "./store/userStore";
import RequestStore from "./store/requestStore";
import ManagersStore from "./store/managersStore";
import OrderStore from "./store/orderStore";

const root = ReactDOM.createRoot(document.getElementById('root'));
export const Context = createContext(null)


root.render(
    <React.StrictMode>
        <Context.Provider value={{
            automobiles: new AutomobileStore(),
            user: new UserStore(),
            requests: new RequestStore(),
            managers: new ManagersStore(),
            orders: new OrderStore()
        }}>
            <ChakraProvider>
                <App/>
            </ChakraProvider>
        </Context.Provider>
    </React.StrictMode>
);
