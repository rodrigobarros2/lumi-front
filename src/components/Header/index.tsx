import { Sun, Moon } from "lucide-react";
import { DropdownMenu } from "../ui/dropdown-menu";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../theme-provider";
import { Switch } from "../ui/switch";

export function Header() {
  const { setTheme, theme } = useTheme();
  const location = useLocation();

  const handleClick = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="bg-background text-foreground">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <img
            src={theme === "dark" ? "/src/assets/logo.svg" : "/src/assets/logo-black.svg"}
            alt="Logo"
            className="w-16 mr-3"
          />
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className={`${location.pathname === "/" ? "font-bold text-green-500" : ""}`}>
                  <h5 className="font-bold">Dashboard</h5>
                </Link>
              </li>
              <li>
                <Link
                  to="/invoices"
                  className={`${location.pathname === "/invoices" ? "font-bold text-green-500" : ""}`}
                >
                  <h5 className="font-bold">Faturas</h5>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <DropdownMenu>
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4" />
            <Switch checked={theme === "dark"} onCheckedChange={handleClick} aria-label="Toggle dark mode" />
            <Moon className="h-4 w-4" />
          </div>
        </DropdownMenu>
      </header>
    </div>
  );
}
