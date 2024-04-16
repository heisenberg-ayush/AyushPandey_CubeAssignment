import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from "../components/sidebar";

interface UnsplashImage {
  urls: {
    small: string; 
  }
}

function Assgn() {
  const apiKey = import.meta.env.VITE_CLI;

  const location = useLocation();
  const [index, setIndex] = useState<number | null>(null);
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1); // State to track current page number

  useEffect(() => {
    // Extract the query parameter "search"
    const queryParams = new URLSearchParams(location.search);
    const searchParam = queryParams.get('search');

    // Parse 
    const parsedIndex = searchParam ? JSON.parse(decodeURIComponent(searchParam)) : null;
    setIndex(parsedIndex);
  
    // Fetch images from Unsplash API with the current page number
    const fetchImages = async () => {
      try {
        const response = await fetch(`https://api.unsplash.com/search/photos?page=${currentPage}&query=office&per_page=9&client_id=${apiKey}`);
        const data = await response.json();
        console.log(data)
        setImages(data.results);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [location.search, currentPage]); 

  useEffect(() => {
    // Change page number every 10 seconds
    const intervalId = setInterval(() => {
      setCurrentPage((prevPage) => (prevPage % 1000) + 1);
    }, 10000);

    return () => clearInterval(intervalId); 
  }, []); 

  return (
    <>
      <div className="heading">
        <h2>Customer Portal</h2>
      </div>

      <div className="adminContainer">
        <Sidebar />

        <main className='mainy'>
          {/* name */}
          <h2>
            Customer {index !== null ? String(index + 1).padStart(2, '0') : ''}
          </h2>
          {/* title */}
          <h2>
            Software Engineer
          </h2>
          {/* address */}
          <h2>
          101, Bangalore
          </h2>

          {/* description */}
          <p style={{textAlign: 'center'}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus, id voluptatum? Ratione velit incidunt odio amet tempora veniam eius minus nemo. Quasi, ad fugiat beatae commodi rem repellendus labore ipsam voluptas cupiditate saepe sapiente deserunt qui sequi veritatis laudantium! Nesciunt, culpa error! Illo quibusdam quidem repellendus consequatur voluptatibus vero corrupti?</p>
          <div className="grid-container">
            {images.map((image, idx) => (
              <div className="grid-item" key={idx}>
                <img src={image.urls.small} alt={`Image ${idx}`} className='imgy'/>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

export default Assgn;