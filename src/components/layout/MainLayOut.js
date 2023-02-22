import { Outlet } from "react-router-dom";
import { Nav } from ".././Nav";
import { Footer } from ".././Footer";

export const MainLayOut = () => {
    return(
        <>
            <Nav />
            <Outlet />
            <Footer />
        </>
    )
}