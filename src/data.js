import axios from "axios";
import { apiUrl } from "./config/api";

export const categories = [
  {
    id: 1,
    name: "Event Photography",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    description:
      "Coverage for weddings, ceremonies, parties, conferences, launches, and intimate celebrations.",
    bestFor: "Milestones, gatherings, portraits, and candid event stories",
    tone: "Warm, detailed, people-first",
  },
  {
    id: 2,
    name: "Marketing Videography",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=82",
    description:
      "Production-ready video crews for product launches, ads, reels, campaigns, and branded content.",
    bestFor: "Promos, social content, product films, and launch assets",
    tone: "Sharp, polished, conversion-focused",
  },
  {
    id: 3,
    name: "Drone Videography",
    image:
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1600&q=82",
    description:
      "Aerial perspectives for venues, travel shoots, outdoor events, real estate, and cinematic openers.",
    bestFor: "Aerial views, landscapes, properties, and scale shots",
    tone: "Expansive, cinematic, high-impact",
  },
  {
    id: 4,
    name: "Media Videography",
    image:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80",
    description:
      "Flexible camera support for interviews, creator shoots, editorial work, podcasts, and coverage days.",
    bestFor: "Interviews, YouTube shoots, creator media, and documentary work",
    tone: "Flexible, modern, platform-ready",
  },
];

// const axios = require('axios');

// Function to fetch all data from the API
export const list = async () => {
  try {
    const response = await axios.get(apiUrl("/api/items"));
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

