import { Outlet } from "react-router"
import AppNavBar from "./AppBar"

const AppLayout = () => {
    return (<>
        <AppNavBar />
        <Outlet />
    </>)
}

export default AppLayout