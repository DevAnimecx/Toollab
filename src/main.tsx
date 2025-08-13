import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import * as pdfjsLib from 'pdfjs-dist';

// Set the worker source for pdfjs-dist
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js`;

createRoot(document.getElementById("root")!).render(<App />);