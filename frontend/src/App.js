import "@/App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProgressProvider } from "@/context/ProgressContext";
import Layout from "@/components/Layout";
import ExploreIndia from "@/pages/ExploreIndia";
import WorldExplorer from "@/pages/WorldExplorer";
import LearnPlay from "@/pages/LearnPlay";
import Passport from "@/pages/Passport";

function App() {
  return (
    <div className="App">
      <ProgressProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<ExploreIndia />} />
              <Route path="/world" element={<WorldExplorer />} />
              <Route path="/play" element={<LearnPlay />} />
              <Route path="/passport" element={<Passport />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ProgressProvider>
    </div>
  );
}

export default App;
