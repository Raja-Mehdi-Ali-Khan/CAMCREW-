import { useCart } from "../../context/ServiceContext";
import { IoMdClose } from "react-icons/io";

const FavCard = ({ item }) => {
  const { removeFromCart } = useCart();
  const { _id, title, image, price, quantity } = item;

  return (
    <div className="group relative w-full bg-white/5 border border-white/10 rounded-2xl p-4 transition-all duration-300 hover:bg-white/10 hover:border-bgimage/30">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Image Container */}
        <div className="relative h-24 w-full sm:w-24 flex-shrink-0 overflow-hidden rounded-xl border border-white/10">
          <img
            src={image[0]}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Content Container */}
        <div className="flex flex-1 flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-bgimage transition-colors">
                {title}
              </h3>
              <p className="text-sm text-gray-400 mt-1 line-clamp-1">
                Professional Photography Service
              </p>
            </div>
            <button
              onClick={() => removeFromCart(_id)}
              className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all"
              aria-label="Remove item"
            >
              <IoMdClose className="text-xl" />
            </button>
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 uppercase tracking-wider">Price</span>
              <span className="text-xl font-black text-white">₹{price}</span>
            </div>
            
            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-500 uppercase tracking-wider">Subtotal</span>
              <span className="text-lg font-bold text-bgimage">
                ₹{parseFloat(price * quantity).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavCard;
