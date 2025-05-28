
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoomProvider } from "@/lib/liveblocks";
import Index from "./pages/Index";
import ComponentDemo from "./pages/ComponentDemo";
import ComponentShowcase from "./pages/ComponentShowcase";
import NotFound from "./pages/NotFound";
import { Navigation } from "./components/Navigation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <RoomProvider id="collaborative-editor" initialPresence={{ cursor: null, name: "", color: "", cursorPosition: 0 }} initialStorage={{ content: "" }}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/demo" element={<ComponentDemo />} />
              <Route path="/showcase" element={<ComponentShowcase />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </RoomProvider>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
