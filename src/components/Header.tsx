import { Link } from "react-router-dom";
import { APP_THEME } from "../utils/content";

export const Header = () => {
  return (
    <header className="py-5 bg-primary text-white text-center">
      <Link to="/">
        <h1 className="text-6xl uppercase">{APP_THEME.title}</h1>
      </Link>
    </header>
  );
};
