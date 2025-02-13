import { Link } from "react-router-dom";
import { APP_THEME } from "../utils/content";

export const Header = () => {
  return (
    <header className="py-5 bg-primary text-white text-center">
      <Link to="/">
        <div className="flex flex-col items-center">
          <h1 className="text-6xl uppercase">
            {APP_THEME.title}
            <p className="text-right font-sans text-sm lowercase font-bold">
              a mini yeeter
            </p>
          </h1>
        </div>
      </Link>
    </header>
  );
};
