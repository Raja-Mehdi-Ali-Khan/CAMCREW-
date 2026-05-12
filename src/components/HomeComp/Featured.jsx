import { Link } from "react-router-dom";
import { categories } from "../../data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheck } from "@fortawesome/free-solid-svg-icons";

const Featured = () => {
  return (
    <section
      id="category"
      className="bg-[rgb(22,21,21)] px-4 py-10 text-white sm:px-6 sm:py-14 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-[92rem]">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end lg:mb-10 lg:gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-bgdarkimage sm:text-sm">
              Browse by need
            </p>
            <h2 className="mt-2 max-w-2xl text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
              Find the right creative crew faster.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-gray-300 sm:text-base sm:leading-7">
            Choose a category, compare portfolios, and move from discovery to
            booking without losing context.
          </p>
        </div>

        <div id="featured-services" className="space-y-5 lg:space-y-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/category/${category.name.toLowerCase()}`}
              className="group grid overflow-hidden rounded-md border border-bgimage/15 bg-[#211f1d] text-gray-100 shadow-xl shadow-black/25 outline-none transition duration-300 hover:-translate-y-1 hover:border-bgimage/60 hover:shadow-bgimage/10 focus:ring-2 focus:ring-bgimage focus:ring-offset-2 focus:ring-offset-[rgb(22,21,21)] lg:grid-cols-[1.12fr_0.88fr]"
            >
              <div
                className={`relative min-h-[16rem] overflow-hidden sm:min-h-[20rem] lg:min-h-[24rem] ${
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
                <div className="absolute bottom-4 left-4 rounded-md bg-bgimage px-3 py-1.5 text-xs font-black uppercase text-gray-950 sm:bottom-5 sm:left-5 sm:px-4 sm:py-2 sm:text-sm">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>

              <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-12">
                <p className="text-xs font-black uppercase tracking-wide text-bgdarkimage sm:text-sm">
                  {category.tone}
                </p>
                <h3 className="mt-2 text-2xl font-black leading-tight sm:text-3xl md:text-4xl">
                  {category.name}
                </h3>
                <p className="mt-4 text-sm leading-7 text-gray-300 sm:text-base sm:leading-8">
                  {category.description}
                </p>

                <div className="mt-5 rounded-md border border-bgimage/20 bg-white/5 p-3 sm:mt-6 sm:p-4">
                  <div className="flex gap-3">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-bgimage text-xs text-gray-950">
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <div>
                      <p className="text-sm font-black uppercase text-bgimage">
                        Best for
                      </p>
                      <p className="mt-1 text-xs leading-5 text-gray-300 sm:text-sm sm:leading-6">
                        {category.bestFor}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 inline-flex w-fit items-center gap-3 rounded-md bg-bgimage px-5 py-2.5 text-xs font-black uppercase text-gray-950 transition group-hover:-translate-y-0.5 group-hover:bg-bgdarkimage sm:mt-7 sm:px-6 sm:py-3 sm:text-sm">
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
