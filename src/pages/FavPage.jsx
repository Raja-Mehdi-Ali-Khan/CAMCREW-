import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/ServiceContext";
import FavCard from "../components/CartComp/FavCard";
import { FiTrash2, FiShoppingBag } from "react-icons/fi";

const FavPage = () => {
  const { cart, total, setCart } = useCart();
  useEffect(() => {
    const storedCartJSON = localStorage.getItem("cartvalue");
    if (storedCartJSON) {
      try {
        const localArray = JSON.parse(storedCartJSON);
        if (localArray && localArray.length !== 0) {
          setCart((currentCart) => {
            // Avoid duplicates if cart already has items
            const existingIds = new Set(currentCart.map(item => item._id));
            const newItems = localArray.filter(item => !existingIds.has(item._id));
            return [...currentCart, ...newItems];
          });
        }
      } catch (err) {
        console.warn(`Error parsing JSON from local storage: ${err}`);
      }
    }
  }, [setCart]);

  useEffect(() => {
    localStorage.setItem("cartvalue", JSON.stringify(cart));
  }, [cart]);

  const clearCart = () => {
    localStorage.setItem("cartvalue", JSON.stringify([]));
    setCart([]);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pt-24 sm:pt-28 lg:pt-32 pb-12 min-h-[70vh]">
      <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
        <h1 className="text-3xl font-bold text-white tracking-tight">Your Favourites</h1>
        {cart.length > 0 && (
          <span className="bg-bgimage/20 text-bgimage px-3 py-1 rounded-full text-sm font-medium">
            {cart.length} {cart.length === 1 ? 'item' : 'items'}
          </span>
        )}
      </div>

      {cart && cart?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-2xl border border-white/10">
          <FiShoppingBag className="text-6xl text-gray-500 mb-4 opacity-50" />
          <p className="text-xl font-medium text-gray-400 mb-6">
            Your Favourite list is empty.
          </p>
          <Link
            to="/category/media%20videography"
            className="px-8 py-3 bg-bgimage text-gray-900 font-bold rounded-lg hover:bg-bgdarkimage transition duration-300 shadow-lg shadow-bgimage/20"
          >
            Go to Portfolios
          </Link>
        </div>
      ) : (
        <div className="grid gap-8">
          <div className="space-y-4">
            {cart.map((item) => (
              <FavCard item={item} key={item._id} />
            ))}
          </div>

          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                Estimated Total
              </p>
              <p className="text-3xl font-black text-white">
                ₹{total.toFixed(2)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Not including taxes and shipping costs
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                type="button"
                onClick={clearCart}
                className="flex items-center gap-2 px-6 py-3 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition duration-300"
              >
                <FiTrash2 />
                Clear All
              </button>
              <Link
                to="/"
                className="flex items-center gap-2 px-8 py-3 bg-bgimage text-gray-900 font-bold rounded-lg hover:bg-bgdarkimage transition duration-300"
              >
                Continue Booking
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavPage;
