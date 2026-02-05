import { StrictMode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";

import { RootApp } from "./RootApp";
import { setupStore } from "./store";

const store = setupStore();
const root = document.getElementById("root");

if (root)
  createRoot(root).render(
    <BrowserRouter>
      <Provider store={store}>
        <StrictMode>
          <RootApp />
        </StrictMode>
      </Provider>
    </BrowserRouter>,
  );
