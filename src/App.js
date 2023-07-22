import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import UserProvider from "./core/provider/UserProvider";
import Main from "./pages";
import AboutIntro from "./pages/about/intro";
import AboutPrivacy from "./pages/about/privacy";
import AboutTerms from "./pages/about/terms";
import ImgGallery from "./pages/example/img-gallery";
import ModalWindow from "./pages/example/modal-window";
import TabMenu from "./pages/example/tab-menu";
import VisualSlideIndexRwd from "./pages/example/visual-slide-index-rwd";
import MoreNew from "./pages/more/new";
import MoreOuter from "./pages/more/outer";
import MorePants from "./pages/more/pants";
import MorePopular from "./pages/more/popular";
import MoreShoes from "./pages/more/shoes";
import MoreTop from "./pages/more/top";
import "./styles/App.css";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            {/* Main */}
            <Route path={"/"} element={<Main />} />
            {/* About */}
            <Route path={"/about/intro"} element={<AboutIntro />} />
            <Route path={"/about/privacy"} element={<AboutPrivacy />} />
            <Route path={"/about/terms"} element={<AboutTerms />} />
            {/* More */}
            <Route path={"/more/new"} element={<MoreNew />} />
            <Route path={"/more/popular"} element={<MorePopular />} />
            <Route path={"/more/top"} element={<MoreTop />} />
            <Route path={"/more/outer"} element={<MoreOuter />} />
            <Route path={"/more/pants"} element={<MorePants />} />
            <Route path={"/more/shoes"} element={<MoreShoes />} />
            {/* Example */}
            <Route path={"/example/tab-menu"} element={<TabMenu />} />
            <Route path={"/example/modal-window"} element={<ModalWindow />} />
            <Route path={"/example/img-gallery"} element={<ImgGallery />} />
            <Route
              path={"/example/visual-slide-index-rwd"}
              element={<VisualSlideIndexRwd />}
            />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
