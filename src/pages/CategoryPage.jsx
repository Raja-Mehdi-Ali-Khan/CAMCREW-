import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link, useParams } from "react-router-dom";
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

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { products, setProducts, filters, setFilters, applyFilters, setSort } =
    useFilter();
  const [list, setList] = useState([]);
  const isDesktop = useMediaQuery({ minWidth: 768 });
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
  }, [categoryId, filters, isDesktop, setProducts]);

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
      setProducts(applyFilters(mockProducts, filters));
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
        setProducts(filteredProducts);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setProducts(applyFilters(mockProducts, filters));
      });
  }, [list, categoryId, filters, isDesktop, applyFilters, setProducts]);

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
    <div className="pt-[68px] sm:pt-[76px] xl:pt-[84px]">
      <div className="flex p-2 justify-between">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <Link
                to={"/"}
                className="inline-flex items-center text-md font-medium text-gray-100 hover:text-blue-600  dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3 me-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Category Page
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-100 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="ms-1 text-md capitalize font-medium text-gray-100 md:ms-2">
                  {categoryId}
                </span>
              </div>
            </li>
            {}
          </ol>
        </nav>

        <button
          className={`p-3 mx-2 border border-red-600 rounded-xl transition-all duration-300 ${
            isSidebarOpen
              ? "bg-red-500 text-white"
              : "bg-bgimage text-gray-900 hover:bg-bgimage/90"
          }`}
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <span> Close Sort Filters </span>
          ) : (
            <span> Open Sort Filters </span>
          )}
        </button>
      </div>

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
          className={`absolute left-0 top-0 h-full w-[280px] sm:w-[320px] bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full overflow-y-auto">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold text-gray-900">Filters</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
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
              <div className="flex justify-center items-center mb-6">
                <div
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
                  <Button>Clear Filters</Button>
                </div>
              </div>
              <div className="px-4">
                <SideBar category={categoryId} />
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div className="min-h-[800px] border pt-10 pb-10 px-4 sm:px-10">
        <div className="flex flex-wrap justify-center gap-6">{Products}</div>
      </div>
    </div>
  );
};

export default CategoryPage;
