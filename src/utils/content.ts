import BeerRunLogo from "../assets/beer_run_logo.svg";
import FunderfulLogo from "../assets/funderful_logo_3.svg";
import WeeyeetLogo from "../assets/weeyeet_logo.svg";

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
  WEEYEET: {
    title: "Wee Yeet",
    subtitle: "A Mini Yeeter",
    logo: WeeyeetLogo,
    themeName: "weeyeet",
  },
};

export const APP_THEME =
  APP_THEME_OPTIONS[import.meta.env.VITE_APP_NAME] || APP_THEME_OPTIONS.BEERRUN;
