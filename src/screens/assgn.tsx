import { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import { useSelectedComponent } from '../context/SelectedComponentContext';

interface UnsplashImage {
  urls: {
    small: string;
  };
}

function Assgn() {
  // Making the api key public for testing
  const apiKey: string = 'lw_i9MMceKN_ML_T57zwDlTh0z8aIhlI-KPQD92i4-Y';
  // const apiKey: string = import.meta.env.VITE_CLI;

  // const location = useLocation();
  const { selectedComponent } = useSelectedComponent();
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1); // State to track current page number

  useEffect(() => {
    // Fetch images based on selected component info
    const fetchImages = async () => {
      if (selectedComponent && apiKey) {
        try {
          const response = await fetch(
            `https://api.unsplash.com/search/photos?page=${currentPage}&query=office&per_page=9&client_id=${apiKey}`
          );
          const data = await response.json();
          setImages(data.results);
        } catch (error) {
          console.error('Error fetching images:', error);
        }
      }
    };

    fetchImages();
  }, [selectedComponent, currentPage, apiKey]);

  // Reset currentPage when selectedComponent changes to trigger image refresh
  useEffect(() => {
    setCurrentPage(1); // Reset currentPage to 1 when selectedComponent changes
  }, [selectedComponent]);

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
          {selectedComponent && (
            <>
              <h2>Customer {String(selectedComponent.index + 1).padStart(2, '0')} details here</h2>
              <h2>{selectedComponent.title}</h2>
              <h2>{selectedComponent.address}</h2>
              <p style={{ textAlign: 'center' }}>{selectedComponent.description}</p>
            </>
          )}
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
