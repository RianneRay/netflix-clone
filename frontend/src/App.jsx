import ScrollToTop from "./components/ScrollToTop.jsx"
import { Route, Routes, Navigate } from 'react-router-dom'
import HomePage from './pages/home/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import WatchPage from './pages/home/WatchPage.jsx'
import Footer from './components/footer.jsx'
import { Toaster } from "react-hot-toast"
import { useEffect } from "react"
import { useAuthStore } from "./store/authUser.js"
import { Loader } from "lucide-react"
import SearchPage from "./pages/SearchPage.jsx"
import HistorySearchPage from "./pages/HistorySearchPage"
import NotFoundPage from "./pages/NotFoundPage.jsx"

function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore();
  console.log("auth user is here", user)
  
  useEffect(() => {
    authCheck();
  }, [authCheck]);
  
  if(isCheckingAuth) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10"/>
        </div>
      </div>
    )
  }
  
  return (
    <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to={"/"} />} />
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
      <Route path="/watch/:id" element={user ? <WatchPage /> : <Navigate to={"/login"} />} />
      <Route path="/search" element={user ? <SearchPage /> : <Navigate to={"/login"} />} />
      <Route path="/history" element={user ? <HistorySearchPage /> : <Navigate to={"/login"} />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
    <Toaster />
    <Footer />
    </>
  );
}

export default App
