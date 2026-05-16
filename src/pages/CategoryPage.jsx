import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ServiceCard from "../components/CategoryComp/ServiceCard";
import { Button } from "../components/Button";
import SideBar from "../components/CategoryComp/SideBar";
import { useFilter } from "../context/FilterContext";
import axios from "axios";
import { apiUrl } from "../config/api";

const MOCK_PORTFOLIOS = [
  {
    _id: "mock-cam-1",
    title: "Aarav Films",
    category: "Media Videography",
    email: "aarav@example.com",
    description: "Cinematic wedding and event coverage with clean edits.",
    price: "25000",
    image: [
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
    ],
    youtube: "dQw4w9WgXcQ",
    pincode: "560001",
    averageRating: 4.8,
    count: 12,
    state: "Karnataka",
    isMock: true,
  },
  {
    _id: "mock-cam-2",
    title: "Lens & Light Studio",
    category: "Event Photography",
    email: "lenslight@example.com",
    description: "Natural event storytelling with warm portraits and candids.",
    price: "18000",
    image: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    ],
    youtube: "",
    pincode: "110001",
    averageRating: 4.6,
    count: 9,
    state: "Delhi",
    isMock: true,
  },
  {
    _id: "mock-cam-3",
    title: "SkyFrame Visuals",
    category: "Drone Videography",
    email: "skyframe@example.com",
    description: "Aerial venue films, outdoor events, and real-estate flyovers.",
    price: "32000",
    image: [
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1200&q=80",
    ],
    youtube: "",
    pincode: "400001",
    averageRating: 4.9,
    count: 21,
    state: "Maharashtra",
    isMock: true,
  },
  {
    _id: "mock-cam-4",
    title: "BrandCut Motion",
    category: "Marketing Videography",
    email: "brandcut@example.com",
    description: "Sharp commercial reels, launches, and conversion-focused edits.",
    price: "40000",
    image: [
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
    ],
    youtube: "",
    pincode: "600001",
    averageRating: 4.7,
    count: 15,
    state: "Tamil Nadu",
    isMock: true,
  },
  {
    _id: "mock-cam-5",
    title: "Frame Theory",
    category: "Media Videography",
    email: "frametheory@example.com",
    description: "Creator shoots, interviews, podcasts, and documentary coverage.",
    price: "22000",
    image: [
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80",
    ],
    youtube: "",
    pincode: "700001",
    averageRating: 4.5,
    count: 7,
    state: "West Bengal",
    isMock: true,
  },
];

const sortProducts = (items, sort) => {
  const sortedProducts = [...items];

  if (sort.priceAsc) {
    return sortedProducts.sort((a, b) => Number(a.price) - Number(b.price));
  }

  if (sort.priceDesc) {
    return sortedProducts.sort((a, b) => Number(b.price) - Number(a.price));
  }

  if (sort.popularAsc) {
    return sortedProducts.sort(
      (a, b) => Number(a.averageRating || 0) - Number(b.averageRating || 0)
    );
  }

  if (sort.popularDesc) {
    return sortedProducts.sort(
      (a, b) => Number(b.averageRating || 0) - Number(a.averageRating || 0)
    );
  }

  return items;
};

const CategoryPage = () => {
  const { categoryId } = useParams();
  const {
    products,
    setProducts,
    filters,
    setFilters,
    applyFilters,
    sort,
    setSort,
  } = useFilter();
  const [list, setList] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl("/api/items"));
      console.log(response.data);
      setList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setProducts([]);
    fetchData(); // Call the async function
  }, [categoryId, setProducts]);

  useEffect(() => {
    // Filter products based on category after list is updated
    const categoryProducts = list.filter(
      (product) => product.category.toLowerCase() === categoryId
    );
    const mockProducts = MOCK_PORTFOLIOS.filter(
      (product) => product.category.toLowerCase() === categoryId
    );
    const apiProducts = categoryProducts.filter((product) => !product.isMock);

    if (apiProducts.length === 0) {
      setProducts(sortProducts(applyFilters(mockProducts, filters), sort));
      return;
    }

    // Create an array to store all the promises for fetching rating data
    const fetchRatingPromises = apiProducts.map((product) =>
      axios.get(apiUrl(`/api/rating/rat/${product?._id}`))
    );

    // Create an array to store all the promises for fetching state data
    const fetchStatePromises = apiProducts.map((product) =>
      axios.get(apiUrl(`/state/${product.email}`))
    );

    // Use Promise.all to wait for all API requests to complete
    Promise.all([...fetchRatingPromises, ...fetchStatePromises])
      .then((responses) => {
        // Extract rating data and state data from responses
        const ratingResponses = responses.slice(0, fetchRatingPromises.length);
        const stateResponses = responses.slice(fetchRatingPromises.length);

        // Map over the rating responses to extract averageRating and count for each product
        const updatedProducts = apiProducts.map((product, index) => {
          const { averageRating, count } = ratingResponses[index].data;
          const state = stateResponses[index].data.state;
          // Return the product object with averageRating, count, and state added
          return {
            ...product,
            averageRating,
            count,
            state,
          };
        });

        console.log(updatedProducts);

        // Apply filters to the updated products list
        const filteredProducts = applyFilters(
          [...mockProducts, ...updatedProducts],
          filters
        );
        // Set the updated products with average rating, count, and state to the state
        setProducts(sortProducts(filteredProducts, sort));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setProducts(sortProducts(applyFilters(mockProducts, filters), sort));
      });
  }, [list, categoryId, filters, sort, applyFilters, setProducts]);

  useEffect(() => {
    console.log(products);
  }, [products]);

  // list.map((categories) => console.log(categories.category == categoryId));
  const Products = products.map((item) => (
    <ServiceCard key={item._id} product={item} />
  ));

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative overflow-hidden bg-[#161515] pt-[68px] text-white sm:pt-[76px] xl:pt-[84px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(255,213,122,0.2),transparent_26%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(255,240,198,0.1),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[30rem] bg-gradient-to-b from-[#2a1d13]/80 via-[#1a1411]/72 to-transparent" />

      <button
        type="button"
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? "Close filters" : "Open filters"}
        className={`absolute bottom-0 left-0 top-[68px] z-[70] flex w-7 items-start justify-center bg-[#6e655e] text-white shadow-[4px_0_18px_rgba(0,0,0,0.16)] transition duration-300 hover:bg-[#5f5751] sm:top-[76px] sm:w-8 xl:top-[84px] ${
          isSidebarOpen ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        style={{
          clipPath:
            "polygon(0 0, 100% 0, 100% 78px, 68% 92px, 100% 106px, 100% 100%, 0 100%)",
        }}
      >
        <span className="mt-4 block rotate-180 text-xs font-semibold uppercase tracking-[0.05em] [text-orientation:mixed] [writing-mode:vertical-rl] sm:mt-5 sm:text-sm">
          Filter
        </span>
      </button>

      {/* Side Panel Drawer */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
        
        {/* Drawer Content */}
        <aside
          className={`absolute left-0 top-0 h-full w-[312px] border-r border-white/10 bg-gray-950 text-white shadow-2xl shadow-black/50 transition-transform duration-300 ease-in-out sm:w-[360px] ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="no-scrollbar flex h-full flex-col overflow-y-auto">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <h2 className="text-xl font-black uppercase tracking-[0.14em] text-amber-100">
                Filters
              </h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="rounded-full border border-white/10 bg-white/5 p-2 text-gray-200 transition-colors hover:bg-white/10"
                aria-label="Close filters"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-col py-6 pb-10">
              <div className="mb-6 flex items-center justify-center px-4">
                <div
                  className="w-full"
                  onClick={() => {
                    setFilters({
                      rating: null,
                      price: null,
                      pincode: null,
                      state: null,
                    });
                    setSort({
                      priceAsc: false,
                      priceDesc: false,
                      popularAsc: false,
                      popularDesc: false,
                    });
                  }}
                >
                  <Button className="w-full min-h-[3.35rem] rounded-[1.2rem] px-7 py-3.5 text-sm">
                    Clear Filters
                  </Button>
                </div>
              </div>
              <div className="px-5">
                <SideBar category={categoryId} />
              </div>
            </div>
          </div>
        </aside>
      </div>

      <section className="relative px-0 pb-0 pt-2">
        <div className="min-h-[calc(100vh-11rem)] w-full rounded-t-[2.5rem] rounded-b-none bg-[linear-gradient(180deg,#ffe49a_0%,#ffc85c_24%,#f0ad43_68%,#dc8d1f_100%)] px-4 py-8 shadow-[0_24px_70px_rgba(0,0,0,0.2)] sm:px-6 sm:py-10 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6">{Products}</div>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
