import { useState } from "react"
import { useContentStore } from "../store/content.js"
import Navbar from "../components/Navbar.jsx"
import axios from "axios"
import toast from "react-hot-toast"
import { Search } from "lucide-react"

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("movie");
  const [searchTerm, setSearchTerm] = useState("");
  
  const [results, setResults] = useState([]);
  const { setContentType } = useContentStore();
  
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    tab === "movie" ? setContentType("movie") : setContentType("tv")
    setResults([]);
  };
  
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
      setResults(res.data.content);
    } catch (error) {
      if(error.response.status === 404){
        toast.error("nothing found, make sure you are searching on the right category");
      } else {
        toast.error("An error occured, please try again later");
      }
    }
  }
  
  return <div className="bg-black min-h-screen text-white">
    <Navbar />
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-center gap-3 mb-4">
        <button className={`py-2 px-4 rounded ${activeTab === "movie" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`} onClick={() => handleTabClick("movie")}
        >
          Movies
        </button>
        <button className={`py-2 px-4 rounded ${activeTab === "tv" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`} onClick={() => handleTabClick("tv")}
        >
          TV Shows
        </button>
        <button className={`py-2 px-4 rounded ${activeTab === "person" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`} onClick={() => handleTabClick("person")}
        >
          Person
        </button>
      </div>
      
      <form className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto" onSubmit={handleSearch}>
        <input 
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={"Search for a " + activeTab}
          className="w-full p-2 rounded bg-gray-800 text-white" />
        
        <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded">
          <Search className="w-6 h-6" />
        </button>
      </form>
      
    </div>
  </div>;
}

export default SearchPage;