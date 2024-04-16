import { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {lazy} from 'react'
import Loader from "./components/loader"
import { SelectedComponentProvider } from './context/SelectedComponentContext';

// import dotenv from 'dotenv';

// Load environment variables
// dotenv.config();

// lazy loading
const Assgn = lazy(()=>import("./screens/assgn"))

function App() {
  return (
    <Router>
      <SelectedComponentProvider>
        <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path="/" element={<Assgn/>}/>
        </Routes>
        </Suspense>
      </SelectedComponentProvider>
    </Router>
  )
}

export default App