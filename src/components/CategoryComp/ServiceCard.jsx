import { useCart } from "../../context/ServiceContext";
import { useState } from "react";
import Star from "./Star";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useComparison } from "../../context/ComparsionContext";
import { toast, Bounce } from "react-toastify";
import LoginRequiredModal from "../LoginRequiredModal";

const ServiceCard = ({ product }) => {
  const { addToCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const { addProduct } = useComparison();
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  // console.log(isAuthenticated);
  const handleAddToCartClick = (e) => {
    e.stopPropagation(); // Stop the event propagation here
    
    if (isAuthenticated) {
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

  return (
    <>
      <div
        onClick={() => navigate(`/product/${product?._id}`)}
        className="w-full h-[31rem] relative  max-w-[22rem] bg-white border border-gray-200 rounded-lg shadow  "
      >
        <div className="flex justify-center items-center">
          <img
            className="p-8 h-64 rounded-t-lg hover:scale-105 transition-all duration-300 "
            src={product?.image[0]}
            alt={product?.title}
          />
        </div>
        <div className="px-5 pb-5">
          <h5 className="text-xl font-semibold tracking-tight text-black ">
            {product?.title}
          </h5>

          <div className="flex items-center mt-2.5 mb-5">
            <div className="flex items-center space-x-1 ">
              {Star(product?.averageRating)}
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded  ms-3">
              {product?.count} customer reviews
            </span>
          </div>
          <div className=" font-bold ">
            Available In {product?.pincode} ,{product?.state}
          </div>
          <div className="flex flex-col gap-4 absolute bottom-8 items-start justify-between pr-8 w-full">
            {/* <div className=""> */}
            <div>
              <span className="text-3xl text-left   font-bold text-black ">
                ₹{product?.price}
                <span className="text-sm"> /day</span>
              </span>
            </div>
            <div className=" flex gap-4 mx-auto justify-around ">
              <p
                onClick={(e) => {
                  e.stopPropagation();
                  addProduct(product);
                  // alert("Added to Compare");
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
                  console.log("add to", product);
                }}
                className="text-white   bg-gray-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Compare
              </p>
              <p
                onClick={handleAddToCartClick}
                className="text-white bg-gray-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add to Fav.
              </p>
            </div>
            <LoginRequiredModal
              open={showModal}
              onClose={(e) => {
                e.stopPropagation();
                setShowModal(false);
              }}
            />
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceCard;
