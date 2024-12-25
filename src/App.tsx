import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import BlogPost from "@/pages/BlogPost";
import CreateBlog from "@/pages/CreateBlog";
import AddUser from "@/pages/AddUser";
import { Toaster } from "@/components/ui/toaster";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

function App() {
  return (
    <Router>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <main className="flex-1">
            <SidebarTrigger className="p-4" />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/post/:id" element={<BlogPost />} />
              <Route path="/create" element={<CreateBlog />} />
              <Route path="/add-user" element={<AddUser />} />
            </Routes>
          </main>
        </div>
      </SidebarProvider>
      <Toaster />
    </Router>
  );
}

export default App;