import React from "react";
import "./App.css";
import { FileUploadForm } from "./pages/FileUploadForm";

function App() {
  return (
    <div className="App" data-testid="mainAppContainer">
      <FileUploadForm />
    </div>
  );
}

export default App;
