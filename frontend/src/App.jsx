import { BrowserRouter, Route, Router, Routes } from "react-router"
import Dashboard from "./pages/Dashboard/index"

function App() {

  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route index element={<Dashboard />} />
            {/* <Route path="/" element={<Books />} />
            <Route path="/" element={<Contact />} />
            <Route path="/" element={<Team />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
};

export default App
