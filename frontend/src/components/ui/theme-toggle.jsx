import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <Button
      variant="outline"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="fixed top-4 right-4"
    >
      {theme === "light" ? "Dark" : "Light"} Mode
    </Button>
  );
};

export default ThemeToggle;