import { Link } from "react-router-dom";
import { categories } from "../../data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheck } from "@fortawesome/free-solid-svg-icons";

const Featured = () => {
  return (
    <section
      id="category"
      className="bg-[rgb(22,21,21)] px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-[92rem]">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase text-bgdarkimage">
              Browse by need
            </p>
            <h2 className="mt-3 max-w-2xl text-4xl font-black leading-tight md:text-5xl">
              Find the right creative crew faster.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-gray-300">
            Choose a category, compare portfolios, and move from discovery to
            booking without losing context.
          </p>
        </div>

        <div id="featured-services" className="space-y-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/category/${category.name.toLowerCase()}`}
              className="group grid overflow-hidden rounded-md border border-bgimage/15 bg-[#211f1d] text-gray-100 shadow-xl shadow-black/25 outline-none transition duration-300 hover:-translate-y-1 hover:border-bgimage/60 hover:shadow-bgimage/10 focus:ring-2 focus:ring-bgimage focus:ring-offset-2 focus:ring-offset-[rgb(22,21,21)] lg:grid-cols-[1.12fr_0.88fr]"
            >
              <div
                className={`relative min-h-[24rem] overflow-hidden ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-bgimage/35 via-transparent to-white/10 mix-blend-soft-light"></div>
                <div
                  className={`absolute inset-y-0 hidden w-2/5 lg:block ${
                    index % 2 === 1
                      ? "left-0 bg-gradient-to-r from-[#211f1d] via-[#211f1d]/85 to-transparent"
                      : "right-0 bg-gradient-to-l from-[#211f1d] via-[#211f1d]/85 to-transparent"
                  }`}
                ></div>
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#211f1d] via-[#211f1d]/75 to-transparent lg:hidden"></div>
                <div className="absolute bottom-5 left-5 rounded-md bg-bgimage px-4 py-2 text-sm font-black uppercase text-gray-950">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>

              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
                <p className="text-sm font-black uppercase text-bgdarkimage">
                  {category.tone}
                </p>
                <h3 className="mt-3 text-3xl font-black leading-tight md:text-4xl">
                  {category.name}
                </h3>
                <p className="mt-5 text-base leading-8 text-gray-300">
                  {category.description}
                </p>

                <div className="mt-6 rounded-md border border-bgimage/20 bg-white/5 p-4">
                  <div className="flex gap-3">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-bgimage text-xs text-gray-950">
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <div>
                      <p className="text-sm font-black uppercase text-bgimage">
                        Best for
                      </p>
                      <p className="mt-1 text-sm leading-6 text-gray-300">
                        {category.bestFor}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-7 inline-flex w-fit items-center gap-3 rounded-md bg-bgimage px-6 py-3 text-sm font-black uppercase text-gray-950 transition group-hover:-translate-y-0.5 group-hover:bg-bgdarkimage">
                  Browse crews
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
