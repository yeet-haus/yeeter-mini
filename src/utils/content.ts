import BeerRunLogo from "../assets/beer_run_logo.svg";
import FunderfulLogo from "../assets/funderful_logo.svg";

type CopyObj = {
  title: string;
  subtitle: string;
  logo: string;
  themeName: string;
};

const APP_THEME_OPTIONS: Record<string, CopyObj> = {
  BEERRUN: {
    title: "Beer Run",
    subtitle: "A Mini Yeeter",
    logo: BeerRunLogo,
    themeName: "beerrun",
  },
  FUNDERFUL: {
    title: "Funderful",
    subtitle: "A Mini Yeeter",
    logo: FunderfulLogo,
    themeName: "funderful",
  },
};

export const APP_THEME =
  APP_THEME_OPTIONS[import.meta.env.VITE_APP_NAME] || APP_THEME_OPTIONS.BEERRUN;
