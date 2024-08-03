import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import "./App.tsx";
import "./index.tsx";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Whiteboard from "./pages/Whiteboard.jsx";
import OldWhiteboard from "./pages/oldWhiteboard.jsx";
import CreateNewUser from "./pages/CreateNewUser";

// import SnapshotExample from "./pages/testWhiteboad.js";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/tldraw":
        title = "";
        metaDescription = "";
        break;
      case "/login":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/newuser' element={<CreateNewUser />} />
      <Route path='/whiteboard' element={<Whiteboard />} />
      {/* <Route path='/testWhiteboard' element={<SnapshotExample />} /> */}
      <Route path='/oldWhiteboard' element={<OldWhiteboard />} />
      <Route path='/home' element={<Home />} />
    </Routes>
  );
}
export default App;
