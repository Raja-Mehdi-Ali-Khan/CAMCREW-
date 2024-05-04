import axios from "axios";

export const categories = [
  {
    id: 1,
    name: "Event Photography",
    image:
      "https://josephkingphotography.in/wp-content/uploads/2022/08/Best-wedding-Photographer-Indore-Joseph-King-Photography3.jpg",
  },
  {
    id: 2,
    name: "Marketing Videography",
    image:
      "https://lidolive.com/wp-content/uploads/2018/06/video-marketing-1.jpg",
  },
  {
    id: 3,
    name: "Drone Videography",
    image:
      "https://2bridges.b-cdn.net/wp-content/uploads/2019/08/aerialcinematography.jpg",
  },
  {
    id: 4,
    name: "Media Videography",
    image:
      "https://quickframe.com/wp-content/uploads/2022/11/QF-SEO-Blog-Post-Imagery_Top-10-Social-Media-Video-Marketing-Trends-for-2023.png",
  },
];

// const axios = require('axios');

// Function to fetch all data from the API
export const list = async () => {
  try {
    const response = await axios.get("https://camapi-in57.onrender.com/api/items");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

