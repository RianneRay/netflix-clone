import { useEffect, useState, useRef } from "react";
import { useContentStore } from "../store/content.js";
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/constants.js";
import { ChevronLeft, ChevronRight } from "lucide-react"

const MovieSlider = ({ category }) => {
  const { contentType } = useContentStore();
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showArrows, setShowArrows] = useState(false);
  
  const sliderRef = useRef(null);
  
  const formattedCategoryName =
    category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1);
  const formattedContentType = contentType === "movie" ? "Movie" : "TV shows";

  useEffect(() => {
    const getContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${category}`);
        
        if (res.data.success && Array.isArray(res.data.category)) {
          setContent(res.data.category);
        } else {
          setError(`No ${formattedCategoryName} found.`);
        }
      } catch (err) {
        console.error("Error fetching content:", err);
        setError("Error fetching content.");
      } finally {
        setLoading(false);
      }
    };

    getContent();
  }, [contentType, category]);
  
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-white">{error}</div>;
  }

  return (
    <div className="bg-black text-white relative px-5 md:px-20"
    onMouseEnter={() => setShowArrows(true)}
    onMouseLeave={() => setShowArrows(false)}
    >
      <h2 className="mb-4 text-2xl font-bold">{formattedCategoryName} {formattedContentType}</h2>

      <div className="flex space-x-4 overflow-x-scroll scrollbar-hide" ref={sliderRef}>
        {content.length === 0 ? (
          <p>No {formattedCategoryName} {formattedContentType} found.</p>
        ) : (
          content.map((item) => (
            <Link to={`/watch/${item.id}`} className="min-w-[250px] relative group" key={item.id}>
              <div className="rounded-lg overflow-hidden">
                <img
                  src={SMALL_IMG_BASE_URL + item.backdrop_path}
                  alt="content image"
                  className="transition-transform duration-300 ease-in-out group-hover:scale-125"
                />
              </div>
              <p className="mt-2 text-center">
                {item.title || item.name}
              </p>
            </Link>
          ))
        )}
      </div>
      {showArrows && (
        <>
          <button className="absolute top-1/2 -translate-y-1/2 left-5 md:left-20 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover-bg-opacity-75 text-white z-10 " onClick={scrollLeft}>
            <ChevronLeft size={24} />
          
          </button>
          <button className="absolute top-1/2 -translate-y-1/2 right-5 md:right-20 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover-bg-opacity-75 text-white z-10 " onClick={scrollRight}>
            <ChevronRight size={24} />
          
          </button>
        </>
      )}
    </div>
  );
};

export default MovieSlider;