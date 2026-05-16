import { useEffect, useState } from "react";
import Star from "./Star";
import { categories } from "../../data";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faArrowTrendDown,
  faArrowTrendUp,
  faWandMagicSparkles,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useFilter } from "../../context/FilterContext";
import axios from "axios";
import { apiUrl } from "../../config/api";

const PRICE_MIN = 300;
const PRICE_MAX = 5000;

const ratingOptions = [
  {
    value: 4.5,
    label: "Exceptional",
    description: "Top-tier crews with standout reviews",
  },
  {
    value: 4,
    label: "Highly Rated",
    description: "Strong client satisfaction and consistency",
  },
  {
    value: 3.5,
    label: "Trusted Picks",
    description: "Reliable options for most briefs",
  },
];

const sortOptions = [
  {
    key: "priceAsc",
    label: "Budget First",
    description: "Lower day-rates appear first",
    icon: faArrowTrendDown,
  },
  {
    key: "priceDesc",
    label: "Premium First",
    description: "Higher day-rates appear first",
    icon: faArrowTrendUp,
  },
  {
    key: "popularDesc",
    label: "Best Reviewed",
    description: "Highest-rated crews at the top",
    icon: faWandMagicSparkles,
  },
  {
    key: "popularAsc",
    label: "Lowest Rated First",
    description: "Lower review scores appear first",
    icon: faStar,
  },
];

const formatBudgetLabel = (value, isUpperBound = false) => {
  if (isUpperBound && value >= PRICE_MAX) {
    return "Rs. 5000+";
  }

  return `Rs. ${value}`;
};

const optionCardBase =
  "w-full rounded-[1.35rem] border px-5 py-4 text-left transition duration-300";
const resetPillBase =
  "inline-flex min-w-[6.75rem] items-center justify-center rounded-full border px-4 py-2 text-[11px] font-black uppercase tracking-[0.12em] transition duration-300";

export const AccordionItem = ({ title, content, index }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative mb-3" key={index}>
      <h6 className="mb-0">
        <button
          className="group relative flex w-full items-center border-b border-white/10 px-4 py-2 text-left text-[11px] font-black uppercase tracking-[0.12em] text-amber-100 transition-all ease-in hover:text-white"
          onClick={toggleAccordion}
        >
          <span>{title}</span>
          <FontAwesomeIcon
            icon={isOpen ? faChevronUp : faChevronDown}
            className="ml-auto text-[10px]"
          />
        </button>
      </h6>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } overflow-hidden text-xl transition-all duration-300 ease-in-out`}
      >
        {content}
      </div>
    </div>
  );
};

const SideBar = ({ category }) => {
  const { filters, setFilters, sort, setSort } = useFilter();
  const selectedPriceRange = filters.price ?? {
    min: PRICE_MIN,
    max: PRICE_MAX,
  };
  const minPricePercent =
    ((selectedPriceRange.min - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
  const maxPricePercent =
    ((selectedPriceRange.max - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [pincode, setPincode] = useState("");

  useEffect(() => {
    axios
      .get(apiUrl("/api/states"))
      .then((response) => {
        setStates(response.data.states);
      })
      .catch((error) => {
        console.error("Error fetching states:", error);
      });
  }, []);

  const handleStateChange = (state) => {
    setFilters({ ...filters, state });
  };

  const handleRatingChange = (rating) => {
    setFilters({
      ...filters,
      rating: filters.rating === rating ? null : rating,
    });
  };

  const handlePriceChange = (price) => {
    setFilters({ ...filters, price });
  };

  const setPriceRange = (nextMin, nextMax) => {
    const normalizedMin = Math.max(PRICE_MIN, Math.min(nextMin, nextMax));
    const normalizedMax = Math.min(PRICE_MAX, Math.max(nextMax, normalizedMin));

    if (normalizedMin === PRICE_MIN && normalizedMax === PRICE_MAX) {
      setFilters({ ...filters, price: null });
      return;
    }

    handlePriceChange({
      min: normalizedMin,
      max: normalizedMax,
    });
  };

  const handleMinPriceChange = (value) => {
    setPriceRange(Number(value), selectedPriceRange.max);
  };

  const handleMaxPriceChange = (value) => {
    setPriceRange(selectedPriceRange.min, Number(value));
  };

  const handlePincodeChange = (value) => {
    setFilters({ ...filters, pincode: value });
  };

  const handleSortChange = (key) => {
    const nextSort = {
      priceAsc: false,
      priceDesc: false,
      popularAsc: false,
      popularDesc: false,
    };

    nextSort[key] = true;
    setSort(nextSort);
  };

  const clearSort = () => {
    setSort({
      priceAsc: false,
      priceDesc: false,
      popularAsc: false,
      popularDesc: false,
    });
  };

  return (
    <div>
      <AccordionItem
        title="Categories"
        content={
          <div className="space-y-2 p-1">
            {categories.map((product) => (
              <Link
                key={product.id}
                className={`flex w-full rounded-[1.2rem] border border-transparent px-5 py-3.5 text-left text-sm font-semibold text-gray-300 transition duration-300 hover:border-white/10 hover:bg-white/5 hover:text-amber-100 ${
                  category === product.name.toLowerCase()
                    ? "border-amber-200/20 bg-bgimage text-slate-950 shadow-[0_10px_25px_rgba(0,0,0,0.14)]"
                    : ""
                }`}
                to={`/category/${product.name.toLowerCase()}`}
              >
                {product.name}
              </Link>
            ))}
          </div>
        }
        index={1}
      />
      <AccordionItem
        title="Minimum Rating"
        content={
          <div className="space-y-3 p-1">
            <button
              type="button"
              onClick={() => setFilters({ ...filters, rating: null })}
              className={`${optionCardBase} flex items-center justify-between text-sm font-semibold ${
                filters.rating === null
                  ? "border-amber-200/25 bg-bgimage text-slate-950 shadow-[0_10px_25px_rgba(0,0,0,0.14)]"
                  : "border-white/10 bg-white/5 text-gray-200 hover:border-white/20 hover:bg-white/10"
              }`}
            >
              <span>Any rating</span>
              <span className={`${resetPillBase} ${
                filters.rating === null
                  ? "border-slate-950/10 bg-slate-950/10 text-slate-900"
                  : "border-white/10 bg-white/10 text-amber-100"
              }`}>
                Reset
              </span>
            </button>

            {ratingOptions.map((option) => {
              const isActive = filters.rating === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleRatingChange(option.value)}
                  className={`${optionCardBase} ${
                    isActive
                      ? "border-amber-200/25 bg-bgimage text-slate-950 shadow-[0_10px_25px_rgba(0,0,0,0.14)]"
                      : "border-white/10 bg-white/5 text-gray-100 hover:border-white/20 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.12em]">
                        {option.label}
                      </p>
                      <p
                        className={`mt-1 text-xs leading-5 ${
                          isActive ? "text-slate-800/80" : "text-gray-400"
                        }`}
                      >
                        {option.description}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em] ${
                        isActive
                          ? "bg-slate-950/10 text-slate-900"
                          : "bg-white/10 text-amber-100"
                      }`}
                    >
                      {option.value}+
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="flex items-center text-sm">
                      {Star(option.value, true)}
                    </div>
                    <span
                      className={`text-xs font-semibold uppercase tracking-[0.12em] ${
                        isActive ? "text-slate-900/70" : "text-gray-400"
                      }`}
                    >
                      and up
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        }
        index={2}
      />
      <AccordionItem
        title="Search by States"
        content={
          <div className="flex flex-col items-center p-1 text-xl">
            <select
              value={selectedState}
              onChange={(e) => {
                handleStateChange(e.target.value);
                setSelectedState(e.target.value);
              }}
              className="w-full rounded-[1.2rem] border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-medium text-gray-100 outline-none transition duration-300 focus:border-amber-300"
            >
              <option value="">Select</option>
              {states.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        }
        index={3}
      />
      <AccordionItem
        title="Search by Pincode"
        content={
          <div className="flex flex-col items-center p-1 text-xl">
            <input
              type="text"
              placeholder="Enter pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="w-full rounded-[1.2rem] border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-medium text-gray-100 outline-none transition duration-300 placeholder:text-gray-500 focus:border-amber-300"
            />
            <button
              onClick={() => handlePincodeChange(pincode)}
              className="join-crew-button mt-3 inline-flex min-h-[3.35rem] w-full items-center justify-center rounded-[1.2rem] px-7 py-3.5 text-sm font-black uppercase tracking-[0.12em] text-slate-950 shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-0.5"
            >
              <span className="relative z-10">Search</span>
            </button>
          </div>
        }
        index={4}
      />
      <AccordionItem
        title="Sort"
        content={
          <div className="space-y-3 p-1">
            <button
              type="button"
              onClick={clearSort}
              className={`${optionCardBase} flex items-center justify-between text-sm font-semibold ${
                !sort.priceAsc &&
                !sort.priceDesc &&
                !sort.popularAsc &&
                !sort.popularDesc
                  ? "border-amber-200/25 bg-bgimage text-slate-950 shadow-[0_10px_25px_rgba(0,0,0,0.14)]"
                  : "border-white/10 bg-white/5 text-gray-200 hover:border-white/20 hover:bg-white/10"
              }`}
            >
              <span>Default order</span>
              <span className={`${resetPillBase} ${
                !sort.priceAsc &&
                !sort.priceDesc &&
                !sort.popularAsc &&
                !sort.popularDesc
                  ? "border-slate-950/10 bg-slate-950/10 text-slate-900"
                  : "border-white/10 bg-white/10 text-amber-100"
              }`}>
                Reset
              </span>
            </button>

            {sortOptions.map((option) => {
              const isActive = sort[option.key];

              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => handleSortChange(option.key)}
                  className={`${optionCardBase} ${
                    isActive
                      ? "border-amber-200/25 bg-bgimage text-slate-950 shadow-[0_10px_25px_rgba(0,0,0,0.14)]"
                      : "border-white/10 bg-white/5 text-gray-100 hover:border-white/20 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.12em]">
                        {option.label}
                      </p>
                      <p
                        className={`mt-1 text-xs leading-5 ${
                          isActive ? "text-slate-800/80" : "text-gray-400"
                        }`}
                      >
                        {option.description}
                      </p>
                    </div>
                    <span
                      className={`inline-flex h-9 w-9 items-center justify-center rounded-full ${
                        isActive
                          ? "bg-slate-950/10 text-slate-900"
                          : "bg-white/10 text-amber-100"
                      }`}
                    >
                      <FontAwesomeIcon icon={option.icon} />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        }
        index={5}
      />
      <AccordionItem
        title="Budget Range"
        content={
          <div className="p-1">
            <div className="rounded-[1.45rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-5 shadow-[0_14px_36px_rgba(0,0,0,0.18)]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-amber-100">
                    Budget Range
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-400">
                    Drag either end to focus the price window.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPriceRange(PRICE_MIN, PRICE_MAX)}
                  className={`${resetPillBase} ${
                    filters.price === null
                      ? "border-amber-200/25 bg-bgimage text-slate-950 shadow-[0_10px_25px_rgba(0,0,0,0.14)]"
                      : "border-white/10 bg-white/5 text-gray-200 hover:border-white/20 hover:bg-white/10"
                  }`}
                >
                  Reset
                </button>
              </div>

              <div className="mt-4 rounded-[1.15rem] border border-white/10 bg-black/20 p-4">
                <div className="flex justify-center">
                  <div className="inline-flex items-center rounded-full border border-amber-200/20 bg-bgimage px-4 py-2 text-sm font-black text-slate-950 shadow-[0_10px_25px_rgba(0,0,0,0.18)] sm:text-base">
                    {formatBudgetLabel(selectedPriceRange.min)}
                    <span className="mx-2 text-slate-900/55">-</span>
                    {formatBudgetLabel(selectedPriceRange.max, true)}
                  </div>
                </div>

                <div className="relative h-10">
                  <div className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-white/10" />
                  <div
                    className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-[linear-gradient(135deg,#fff0be_0%,#ffd36d_38%,#ffbf4d_68%,#f2a62f_100%)]"
                    style={{
                      left: `${minPricePercent}%`,
                      right: `${100 - maxPricePercent}%`,
                    }}
                  />
                  <input
                    type="range"
                    min={PRICE_MIN}
                    max={PRICE_MAX}
                    step={100}
                    value={selectedPriceRange.min}
                    onChange={(e) => handleMinPriceChange(e.target.value)}
                    className="budget-range-input absolute inset-0 z-20 h-10 w-full"
                    aria-label="Minimum budget"
                  />
                  <input
                    type="range"
                    min={PRICE_MIN}
                    max={PRICE_MAX}
                    step={100}
                    value={selectedPriceRange.max}
                    onChange={(e) => handleMaxPriceChange(e.target.value)}
                    className="budget-range-input absolute inset-0 z-10 h-10 w-full"
                    aria-label="Maximum budget"
                  />
                </div>

                <div className="mt-1 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400">
                  <span>{formatBudgetLabel(PRICE_MIN)}</span>
                  <span>{formatBudgetLabel(PRICE_MAX, true)}</span>
                </div>
              </div>
            </div>
          </div>
        }
        index={6}
      />
    </div>
  );
};

export default SideBar;
