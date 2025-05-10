import { useState } from "react";
import { Button } from "./components/ui/button";
import Section from "./components/wrappers/Section";
import { Moon, Sun } from "lucide-react";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
      console.log("aintDarkMode");
    } else {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
      console.log("isDarkMode");
    }
  };

  return (
    <>
      <header className="w-full flex justify-between p-4">
        <h1 className="text-3xl font-bold">BeteSeb Academy</h1>
        <div className="flex gap-4">
          <Button variant="outline">Login</Button>
          <Button variant="default">Sign Up</Button>
          <Button variant="outline" onClick={() => toggleDarkMode()}>
            {isDarkMode ? <Sun /> : <Moon />}
          </Button>
        </div>
      </header>
      <Section></Section>
    </>
  );
}

export default App;
