
import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ClientLayout } from './components/ClientLayout';
import { DashboardLayout } from './components/DashboardLayout';

const Home = lazy(() => import('./features/home/Home'));
const Booking = lazy(() => import('./features/booking/Booking'));
const MyAppointments = lazy(() => import('./features/my-appointments/MyAppointments'));
const Gallery = lazy(() => import('./features/gallery/Gallery'));
const Stylists = lazy(() => import('./features/stylists/Stylists'));
const Pricelist = lazy(() => import('./features/products/Products'));
const Contact = lazy(() => import('./features/contact/Contact'));
const VirtualTryOn = lazy(() => import('./features/virtual-try-on/VirtualTryOn'));

const DashboardOverview = lazy(() => import('./features/dashboard/overview/Overview'));
const DashboardCalendar = lazy(() => import('./features/dashboard/calendar/Calendar'));
const DashboardClients = lazy(() => import('./features/dashboard/clients/Clients'));
const DashboardProducts = lazy(() => import('./features/dashboard/products/ProductsAdmin'));
const DashboardServices = lazy(() => import('./features/dashboard/services/ServicesAdmin'));
const DashboardStylists = lazy(() => import('./features/dashboard/stylists/StylistsAdmin'));
const DashboardGalleryAdmin = lazy(() => import('./features/dashboard/gallery-admin/GalleryAdmin'));
const DashboardContentIdeas = lazy(() => import('./features/dashboard/content-ideas/ContentIdeas'));

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center h-screen bg-brand-dark">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gold"></div>
    </div>
);

const App: React.FC = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <HashRouter>
                    <Suspense fallback={<LoadingSpinner />}>
                        <Routes>
                            {/* Client Routes */}
                            <Route path="/" element={<ClientLayout />}>
                                <Route index element={<Home />} />
                                <Route path="booking" element={<Booking />} />
                                <Route path="my-appointments" element={<MyAppointments />} />
                                <Route path="gallery" element={<Gallery />} />
                                <Route path="stylists" element={<Stylists />} />
                                <Route path="pricelist" element={<Pricelist />} />
                                <Route path="contact" element={<Contact />} />
                                <Route path="virtual-try-on" element={<VirtualTryOn />} />
                            </Route>

                            {/* Admin Dashboard Routes */}
                            <Route path="/dashboard" element={<DashboardLayout />}>
                                <Route index element={<DashboardOverview />} />
                                <Route path="overview" element={<DashboardOverview />} />
                                <Route path="calendar" element={<DashboardCalendar />} />
                                <Route path="clients" element={<DashboardClients />} />
                                <Route path="products" element={<DashboardProducts />} />
                                <Route path="services" element={<DashboardServices />} />
                                <Route path="stylists" element={<DashboardStylists />} />
                                <Route path="gallery-admin" element={<DashboardGalleryAdmin />} />
                                <Route path="content-ideas" element={<DashboardContentIdeas />} />
                            </Route>

                             {/* Redirect any other path to home */}
                            <Route path="*" element={<Home />} />
                        </Routes>
                    </Suspense>
                </HashRouter>
            </CartProvider>
        </AuthProvider>
    );
};

export default App;