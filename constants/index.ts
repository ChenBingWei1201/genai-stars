// base url
export const BASE_URL = "https://api.twelvelabs.io/v1.2";

// headers
export const HEADERS = {
  application: "application/json",
  "Content-Type": "application/json",
  "x-api-key": process.env.TWELVE_LABS_API_KEY,
};

// engines
export const ENGINES = [
  {
    name: "marengo2.6",
    options: ["visual", "conversation", "text_in_video", "logo"],
  },
  {
    name: "pegasus1",
    options: ["visual", "conversation"],
  },
];

export const PAGE_LIMIT = 9;

export const SECTIONS = [
  "Home",
  "Baseball",
  "Basketball",
  "Football",
  "Badminton",
  "Tennis",
];

export const SECTION_IDS: any = {
  Home: "Home",
  Baseball: "MLB.CPBL.WBC",
  Basketball: "NBA.Olympic Basketball.FIBA Basketball World Cup",
  Football: "FIFA World Cup.Premier League.UEFA EURO",
  Badminton: "Olympic Badminton.BWF World Championships",
  Tennis: "Wimbledon.The US Open (Tennis)",
};

export const SECTION_CLASS_MAP: any = {
  Baseball: ["MLB", "CPBL", "WBC"],
  Basketball: ["NBA", "Olympic Basketball", "FIBA Basketball World Cup"],
  Football: ["FIFA World Cup", "Premier League", "UEFA EURO"],
  Badminton: ["Olympic Badminton", "BWF World Championships"],
  Tennis: ["Wimbledon", "The US Open (Tennis)"],
};

export const CLASSES = [
  // Baseball
  { name: "MLB", prompts: ["baseball", "MLB"] },
  { name: "CPBL", prompts: ["baseball", "CPBL"] },
  { name: "WBC", prompts: ["baseball", "WBC"] },
  // Basketball
  { name: "NBA", prompts: ["basketball", "NBA"] },
  { name: "Olympic Basketball", prompts: ["basketball", "Olympic Basketball"] },
  {
    name: "FIBA Basketball World Cup",
    prompts: ["basketball", "FIBA Basketball World Cup"],
  },
  // Football
  { name: "FIFA World Cup", prompts: ["football", "FIFA World Cup"] },
  { name: "Premier League", prompts: ["football", "Premier League"] },
  { name: "UEFA EURO", prompts: ["football", "UEFA EURO"] },
  // Badminton
  { name: "Olympic Badminton", prompts: ["badminton", "Olympic Badminton"] },
  {
    name: "BWF World Championships",
    prompts: ["badminton", "BWF World Championships"],
  },
  // Tennis
  { name: "Wimbledon", prompts: ["tennis", "Wimbledon"] },
  { name: "The US Open (Tennis)", prompts: ["tennis", "The US Open (Tennis)"] },
];

export const IMAGES: any = {
  MLB: "mlb",
  CPBL: "cpbl",
  WBC: "wbc",
  NBA: "nba",
  "Olympic Basketball": "olympic-basketball",
  "FIBA Basketball World Cup": "fiba-basketball-world-cup",
  "FIFA World Cup": "fifa-world-cup",
  "Premier League": "premier-league",
  "UEFA EURO": "uefa-euro",
  "Olympic Badminton": "olympic-badminton",
  "BWF World Championships": "bwf-world-championships",
  Wimbledon: "wimbledon",
  "The US Open (Tennis)": "the-us-open-tennis",
};

export const AD = [
  {
    id: "1",
    imageUrl: "/images/bg-demo-1.png",
    name: "Demo 1",
    totalPodcasts: 1,
  },
  {
    id: "2",
    imageUrl: "/images/bg-demo-2.png",
    name: "Demo 2",
    totalPodcasts: 2,
  },
  {
    id: "3",
    imageUrl: "/images/bg-demo-3.png",
    name: "Demo 3",
    totalPodcasts: 3,
  },
  {
    id: "4",
    imageUrl: "/images/bg-demo-4.png",
    name: "Demo 4",
    totalPodcasts: 4,
  },
];
