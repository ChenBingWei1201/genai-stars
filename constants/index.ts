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

export const PAGE_LIMIT = 1;

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
