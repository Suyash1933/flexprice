import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function App() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground">FlexPrice Component Library</h1>
        <p className="mt-2 text-muted-foreground">
          Run <code className="rounded bg-muted px-2 py-1 text-sm">npm run storybook</code> to view the component library.
        </p>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
