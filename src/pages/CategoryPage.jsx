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

const leftRibbonTopClass = "top-[98px] sm:top-[112px] xl:top-[124px]";
const defaultSortState = {
  priceAsc: false,
  priceDesc: false,
  popularAsc: false,
  popularDesc: false,
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
  const activeFilterCount = [
    filters.rating !== null,
    filters.price !== null,
    Boolean(filters.pincode),
    Boolean(filters.state),
    sort.priceAsc || sort.priceDesc || sort.popularAsc || sort.popularDesc,
  ].filter(Boolean).length;
  const hasActiveFilters = activeFilterCount > 0;

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
    <ServiceCard key={item._id} crew={item} />
  ));

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const clearAllFilters = () => {
    setFilters({
      rating: null,
      price: null,
      pincode: null,
      state: null,
    });
    setSort(defaultSortState);
  };

  return (
    <div className="relative overflow-hidden bg-[#161515] pt-[61px] text-white sm:pt-[68px] xl:pt-[76px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(255,213,122,0.2),transparent_26%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(255,240,198,0.1),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[30rem] bg-gradient-to-b from-[#2a1d13]/80 via-[#1a1411]/72 to-transparent" />

      <button
        type="button"
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? "Close filters" : "Open filters"}
        aria-expanded={isSidebarOpen}
        className={`group fixed left-0 ${leftRibbonTopClass} z-[70] overflow-hidden rounded-r-[1.25rem] border border-l-0 border-white/10 bg-[linear-gradient(180deg,rgba(30,27,23,0.97),rgba(48,39,31,0.95))] text-white shadow-[0_12px_26px_rgba(0,0,0,0.24)] backdrop-blur-md transition duration-300 hover:border-amber-200/25 hover:bg-[linear-gradient(180deg,rgba(36,32,27,0.98),rgba(58,47,37,0.96))] hover:shadow-[0_16px_30px_rgba(0,0,0,0.28)] ${
          isSidebarOpen ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <span className="block h-1 w-full bg-[linear-gradient(90deg,#fff1c5_0%,#ffd369_42%,#f2a62f_100%)]" />
        <span className="pointer-events-none absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,rgba(255,255,255,0.12),transparent_58%)] opacity-0 transition duration-300 group-hover:opacity-100" />
        <span className="pointer-events-none absolute inset-y-0 right-0 w-px bg-white/10" />
        <span className="flex min-h-[6.75rem] w-[2.8rem] flex-col items-center justify-between px-1 py-2.5 sm:min-h-[7.2rem] sm:w-[3rem] sm:px-1.5 sm:py-3">
          <span className="inline-flex h-6 w-6 items-center justify-center text-amber-100/90 transition duration-300 group-hover:translate-x-0.5 group-hover:text-amber-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
          <span className="flex flex-col items-center gap-1">
            <span className="text-[11px] font-black uppercase tracking-[0.12em] text-amber-50/95 transition duration-300 group-hover:text-white [writing-mode:vertical-rl]">
              Filters
            </span>
            <span
              className={`inline-flex min-h-[1.45rem] min-w-[1.45rem] items-center justify-center rounded-full border px-1 text-[8px] font-black uppercase tracking-[0.08em] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition duration-300 group-hover:border-amber-200/30 ${
                hasActiveFilters
                  ? "border-amber-200/20 bg-amber-200/10 text-amber-50"
                  : "border-white/10 bg-white/[0.05] text-gray-300"
              }`}
            >
              {hasActiveFilters ? activeFilterCount : "All"}
            </span>
          </span>
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
          className={`absolute left-0 top-0 h-screen w-[320px] border-r border-white/10 bg-[linear-gradient(180deg,rgba(16,15,14,0.99),rgba(28,24,20,0.98))] text-white shadow-2xl shadow-black/50 transition-transform duration-300 ease-in-out sm:w-[380px] ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="no-scrollbar flex h-full flex-col overflow-y-auto">
            {/* Drawer Header */}
            <div className="border-b border-white/10 px-4 py-4 sm:px-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-amber-100/75">
                    Portfolio Filters
                  </p>
                  <h2 className="mt-1 text-lg font-black uppercase tracking-[0.14em] text-white">
                    Refine Results
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  {hasActiveFilters ? (
                    <button
                      type="button"
                      onClick={clearAllFilters}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-gray-200 transition-colors hover:border-amber-200/20 hover:bg-white/10 hover:text-amber-100"
                    >
                      Clear
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="rounded-full border border-white/10 bg-white/5 p-2 text-gray-200 transition-colors hover:bg-white/10"
                    aria-label="Close filters"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
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
              </div>
            </div>

            <div className="flex flex-col py-6 pb-10">
              <div className="mb-6 flex items-center justify-center px-4">
                <Button
                  className="w-full min-h-[3.35rem] rounded-[1.2rem] px-7 py-3.5 text-sm"
                  onClick={clearAllFilters}
                >
                  {hasActiveFilters ? "Reset All Filters" : "Filters Ready"}
                </Button>
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
