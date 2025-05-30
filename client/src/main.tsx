import { Provider } from "./components/ui/provider";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ParallaxProvider>
      <Provider>
        <App />
      </Provider>
    </ParallaxProvider>
  </BrowserRouter>,
);
