import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/Login";
import MainLayout from "../layout/MainLayout";
import BusDriverForm from "../pages/AddBusDriver";
import BusDriversList from "../pages/BusDriverList";
import EditBusDriver from "../pages/EditBusDriver";
import TourForm from "../pages/BusDriverTour";
import TourHistory from "../pages/BusDriverHistory";
import RequireAuth from "../components/RequireAuth";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route element={<RequireAuth />}>
                    <Route element={<MainLayout />}>
                        <Route path="/AddBusDriver" element={<BusDriverForm />} />
                        <Route path="/BusDriverList" element={<BusDriversList />} />
                        <Route path="/bus-drivers/edit/:id" element={<EditBusDriver />} />
                        <Route path="/BusDriverTour" element={<TourForm />} />
                        <Route path="/BusDriverHistory" element={<TourHistory />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
