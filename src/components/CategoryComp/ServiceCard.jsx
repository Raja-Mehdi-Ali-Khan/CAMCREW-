import { useCart } from "../../context/ServiceContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaLocationDot,
  FaRegImages,
  FaScaleBalanced,
} from "react-icons/fa6";
import { toast, Bounce } from "react-toastify";
import Star from "./Star";
import { useUser } from "../../context/UserContext";
import { useComparison } from "../../context/ComparsionContext";
import LoginRequiredModal from "../LoginRequiredModal";

const ServiceCard = ({ product }) => {
  const { addToCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const { addProduct } = useComparison();
  const { userData } = useUser();
  const isSignedIn = !!userData;
  const navigate = useNavigate();

  const imageCount = product?.image?.length || 0;
  const reviewCount = product?.count || 0;
  const locationLabel = [product?.pincode, product?.state]
    .filter(Boolean)
    .join(", ");

  const handleAddToCartClick = (e) => {
    e.stopPropagation();

    if (isSignedIn) {
      addToCart(product, product?._id);
      toast.success("Added to FavList", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } else {
      setShowModal(true);
    }
  };

  const handleCompareClick = (e) => {
    e.stopPropagation();
    addProduct(product);
    toast.success("Added to Compare", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  return (
    <>
      <article
        onClick={() => navigate(`/product/${product?._id}`)}
        className="group relative flex min-h-[34rem] w-full max-w-[23rem] cursor-pointer flex-col overflow-hidden rounded-[28px] border border-white/10 bg-gray-950/95 text-gray-100 shadow-[0_24px_60px_rgba(15,23,42,0.28)] transition duration-300 hover:-translate-y-1.5 hover:border-bgimage/60 hover:shadow-[0_28px_70px_rgba(15,23,42,0.34)]"
      >
        <div className="relative h-64 overflow-hidden bg-[linear-gradient(135deg,#2b1d12_0%,#1d1510_52%,#0f172a_100%)]">
          <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-4">
            <span className="rounded-full border border-amber-200/25 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-amber-100 shadow-sm backdrop-blur-sm">
              {product?.category || "Portfolio"}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-950/88 px-3 py-1 text-[11px] font-semibold text-white shadow-sm">
              <FaRegImages className="text-[11px] text-[#f6c65b]" />
              {imageCount} shot{imageCount === 1 ? "" : "s"}
            </span>
          </div>

          <img
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            src={product?.image?.[0]}
            alt={product?.title}
          />

          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />

          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
            <div className="rounded-2xl border border-white/10 bg-black/48 px-3 py-2 text-white backdrop-blur-md">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-100/80">
                Starting at
              </p>
              <p className="mt-1 text-2xl font-black leading-none">
                Rs. {product?.price}
                <span className="ml-1 text-xs font-semibold text-amber-100/80">
                  / day
                </span>
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddToCartClick}
              aria-label="Add to favourites"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-md backdrop-blur-sm transition duration-300 hover:scale-105 hover:bg-white/20"
            >
              <FaHeart className="text-base text-[#ffd27a]" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="min-w-0">
            <h5 className="line-clamp-2 text-[1.35rem] font-black leading-tight text-white">
              {product?.title}
            </h5>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-300">
              {product?.description}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 rounded-full bg-bgimage px-3 py-2 text-sm font-semibold text-slate-950">
              {Star(product?.averageRating, true)}
              <span>{Number(product?.averageRating || 0).toFixed(1)}</span>
            </div>
            <div className="rounded-full bg-white/10 px-3 py-2 text-sm font-medium text-gray-300">
              {reviewCount} review{reviewCount === 1 ? "" : "s"}
            </div>
          </div>

          <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-bgimage text-slate-950">
                <FaLocationDot />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-100/80">
                  Available in
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {locationLabel || "Location available on request"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-5">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleCompareClick}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-gray-100 transition duration-300 hover:-translate-y-0.5 hover:border-bgimage/50 hover:bg-white/10"
              >
                <FaScaleBalanced className="text-[#ffd27a]" />
                Compare
              </button>
              <button
                type="button"
                onClick={handleAddToCartClick}
                className="join-crew-button inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black text-slate-950 transition duration-300 hover:-translate-y-0.5"
              >
                <FaHeart className="relative z-10 text-[#9c4f18]" />
                <span className="relative z-10">Fav</span>
              </button>
            </div>

            <LoginRequiredModal
              open={showModal}
              onClose={(e) => {
                e.stopPropagation();
                setShowModal(false);
              }}
            />
          </div>
        </div>
      </article>
    </>
  );
};

export default ServiceCard;
