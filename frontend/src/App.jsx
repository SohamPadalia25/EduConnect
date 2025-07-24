import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
// import Header from "./components/Header";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Events from "./pages/Events";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HostEvent from "./pages/HostEvent";
import NotFound from "./pages/NotFound";
import StudentView from "./pages/StudentView";
import Dashboard1 from './pages/Dashboard1';
import Admin from './pages/enhanced-admin-dashboard';

import Ai from "./pages/Ai";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            {/* <Header /> */}
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/events" element={<Events />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/host-event" element={<HostEvent />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path='/student-dashboard' element={<StudentView/>} />
                <Route path="/ai" element={<Ai/>}/>
                <Route path='/provider-dashboard' element={<Dashboard1/>}/>
                <Route path='/admin-dashboard' element={<Admin/>}/>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
