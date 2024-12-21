import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import BlogPost from "@/pages/BlogPost";
import CreateBlog from "@/pages/CreateBlog";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/post/:id" element={<BlogPost />} />
        <Route path="/create" element={<CreateBlog />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;