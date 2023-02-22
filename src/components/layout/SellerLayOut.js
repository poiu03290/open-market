import { Outlet } from "react-router-dom";
import { SellerCenterNav } from "../SellerCenterNav";

export const SellerLayOut = () => {
    return(
        <>
            <SellerCenterNav />
            <Outlet />
        </>
    )
}