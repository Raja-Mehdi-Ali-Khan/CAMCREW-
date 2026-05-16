import { useComparison } from "../context/ComparsionContext";
import Star from "../components/CategoryComp/Star";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";

const ComparisonPage = () => {
  const { selectedProducts, clearComparison, removeProduct } = useComparison();
  const navigate = useNavigate();
  console.log(selectedProducts);
  // Render the comparison table if there are two selectedProducts selected for comparison
  const renderComparisonTable = () => {
    if (selectedProducts?.length !== 2) {
      return (
        <p className="text-white">
          Please select exactly two selectedProducts for comparison.
        </p>
      );
    }

    const [product1, product2] = selectedProducts;

    return (
      <div className="text-white flex justify-center items-center ">
        <div className="text-white flex justify-between items-center">
          <table className="border-collapse border-2 text-2xl border-white">
            <thead className="text-white">
              <tr className="text-white  ">
                <th className="p-4 text-white "></th>

                <th className="p-4">
                  {" "}
                  <Button onClick={() => removeProduct(product1?._id)}>
                    Clear Choice 1{" "}
                  </Button>{" "}
                </th>
                <th className="p-4">
                  {" "}
                  <Button onClick={() => removeProduct(product2?._id)}>
                    Clear Choice 2{" "}
                  </Button>{" "}
                </th>
              </tr>
            </thead>
            <thead className="text-white">
              <tr className="text-white  ">
                <th className="p-4 text-white ">Attribute</th>
                <th className="p-4">{product1.title}</th>
                <th className="p-4">{product2.title}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4">Video</td>
                <td className="p-4">
                  <iframe
                    width="500"
                    height="320"
                    src={`https://www.youtube.com/embed/${product1?.youtube}?autoplay=1`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </td>

                <td className="p-4">
                  <iframe
                    width="500"
                    height="320"
                    src={`https://www.youtube.com/embed/${product2?.youtube}?autoplay=1`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </td>
              </tr>
              <tr>
                <td className="p-4">Image</td>
                <td className="p-4">
                  {" "}
                  <img
                    src={product1?.image[0]}
                    alt
                    className="object-fit w-full md:w-[40rem] md:h-[20rem] "
                  />
                </td>

                <td className="p-4">
                  {" "}
                  <img
                    src={product2?.image[0]}
                    alt
                    className="object-fit w-full md:w-[40rem] md:h-[20rem] "
                  />
                </td>
              </tr>
              <tr>
                <td className="p-4">Price</td>
                <td className="p-4">{product1.price}</td>
                <td className="p-4">{product2.price}</td>
              </tr>
              <tr>
                <td className="p-4">Category</td>
                <td className="p-4">
                  <button
                    type="button"
                    onClick={() => navigate(`/category/${product1?.category}`)}
                    className="join-crew-button inline-flex min-h-[2.6rem] items-center justify-center rounded-full px-6 py-2 text-xs font-black capitalize tracking-[0.08em] text-slate-950 shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-0.5"
                  >
                    <span className="relative z-10">{product1?.category}</span>
                  </button>
                </td>
                <td className="p-4">
                  <button
                    type="button"
                    onClick={() => navigate(`/category/${product2?.category}`)}
                    className="join-crew-button inline-flex min-h-[2.6rem] items-center justify-center rounded-full px-6 py-2 text-xs font-black capitalize tracking-[0.08em] text-slate-950 shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-0.5"
                  >
                    <span className="relative z-10">{product2?.category}</span>
                  </button>
                </td>
              </tr>
              <tr>
                <td className="p-4">Reviews</td>
                <td className="p-4">{Star(product1.averageRating)}</td>
                <td className="p-4">{Star(product2.averageRating)}</td>
              </tr>
              <tr>
                <td className="p-4"> Description</td>
                <td className="p-4">{product1.description}</td>
                <td className="p-4">{product2.description}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-[68px] sm:pt-[76px] xl:pt-[84px]">
      <h2 className=" text-white text-3xl font-bold flex justify-center items-center my-4 ">Product Comparison</h2>

      {renderComparisonTable()}
      <div className=" flex justify-center items-center m-10 ">
        <Button className="w-96" onClick={() => clearComparison()}>
          {" "}
          Clear All{" "}
        </Button>
      </div>
    </div>
  );
};

export default ComparisonPage;
