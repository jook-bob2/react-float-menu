import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import "../../styles/layout.css";

export default function MainLayout({ children }) {
  return (
    <div className="layout">
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </div>
  );
}
