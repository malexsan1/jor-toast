import React from "react";

export const useEscapeKey = (callback) => {
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && typeof callback === "function") {
        callback();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [callback]);
};
