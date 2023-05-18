// import {BrowserRouter} from "react-router-dom";
// import AppRouter from "./components/AppRouter";
// import {Header} from "./components/Header";
// import './App.css'
// import {Flex, Spinner} from "@chakra-ui/react";
// import {useContext, useEffect, useState} from "react";
// import {check} from "./http/userAPI";
// import {Context} from "./index";
// import {observer} from "mobx-react-lite";
// import LargeWithAppLinksAndSocial from "./components/Footer";
//
// const App = observer(() => {
//     const {user} = useContext(Context)
//     const [loading, setLoading] = useState(true)
//
//     useEffect(() => {
//         check().then(data => {
//             user.setUser(true)
//             user.setIsAuth(true)
//
//         }).catch(err => {
//
//         }).finally(() => setLoading(false))
//     }, []);
//
//
//     if (loading) {
//         return <Flex
//             style={{alignItems: 'center', justifyContent: 'center', width: '100%', height: window.screen.height - 154}}>
//             <Spinner
//                 thickness='4px'
//                 speed='0.65s'
//                 emptyColor='gray.200'
//                 color='purple.600'
//                 size='xl'
//             />
//         </Flex>
//
//     }
//     return (
//         <BrowserRouter>
//             <Flex >
//                 <Header/>
//                 <AppRouter/>
//                 <LargeWithAppLinksAndSocial/>
//             </Flex>
//         </BrowserRouter>
//     );
// })
//
// export default App;

//className='App'




import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { Header } from "./components/Header";
import "./App.css";
import { Flex, Spinner } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { check } from "./http/userAPI";
import { Context } from "./index";
import { observer } from "mobx-react-lite";
import LargeWithAppLinksAndSocial from "./components/Footer";

const App = observer(() => {
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        check()
            .then((data) => {
                user.setUser(true);
                user.setIsAuth(true);
            })
            .catch((err) => {})
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <Flex
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: window.screen.height - 154,
                }}
            >
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="purple.600"
                    size="xl"
                />
            </Flex>
        );
    }

    return (
        <BrowserRouter>
            <Flex flexDirection="column" minHeight="100vh">
                <Header />
                <Flex flex="1">
                    <AppRouter />
                </Flex>
                <LargeWithAppLinksAndSocial
                    style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
                />
            </Flex>
        </BrowserRouter>
    );
});

export default App;
