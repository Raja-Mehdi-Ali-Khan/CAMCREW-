import { Link } from "react-router-dom";
import { categories } from "../../data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheck } from "@fortawesome/free-solid-svg-icons";

const Featured = () => {
  return (
    <section
      id="category"
      className="relative z-0 -mt-4 bg-[linear-gradient(180deg,#ffe9b6_0%,#ffd374_26%,#f0ad43_68%,#d8891f_100%)] px-4 pb-10 pt-8 text-slate-900 sm:-mt-6 sm:px-6 sm:pb-12 sm:pt-10 lg:-mt-8 lg:px-8 lg:pb-16 lg:pt-12"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_14%,rgba(255,255,255,0.32),transparent_20%)]" />
      <div className="mx-auto max-w-[94rem]">
        <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-end lg:mb-7 lg:gap-5">
          <div>
            <p className="editorial-kicker sm:text-sm">
              Browse by need
            </p>
            <h2 className="editorial-title mt-2 max-w-2xl text-3xl font-black leading-tight text-[#251809] sm:text-4xl md:text-5xl">
              Find the right creative crew faster.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-[#5f4321] sm:text-base sm:leading-7">
            Choose a category, compare portfolios, and move from discovery to
            booking without losing context.
          </p>
        </div>

        <div id="featured-services" className="space-y-4 lg:space-y-5">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/category/${category.name.toLowerCase()}`}
              className="editorial-shell group grid overflow-hidden rounded-[2rem] text-gray-100 outline-none transition duration-300 hover:-translate-y-1 hover:border-bgimage/60 hover:shadow-[0_26px_70px_rgba(15,23,42,0.34)] focus:ring-2 focus:ring-bgimage focus:ring-offset-2 focus:ring-offset-[#d38a1f] lg:grid-cols-[1.08fr_0.92fr]"
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
                      ? "left-0 bg-gradient-to-r from-gray-950 via-gray-950/88 to-transparent"
                      : "right-0 bg-gradient-to-l from-gray-950 via-gray-950/88 to-transparent"
                  }`}
                ></div>
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-gray-950 via-gray-950/78 to-transparent lg:hidden"></div>
                <div className="absolute bottom-4 left-4 rounded-md bg-bgimage px-3 py-1.5 text-xs font-black uppercase text-gray-950 sm:bottom-5 sm:left-5 sm:px-4 sm:py-2 sm:text-sm">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>

              <div className="relative z-10 flex flex-col justify-center p-5 sm:p-8 lg:p-12">
                <p className="editorial-kicker sm:text-sm">
                  {category.tone}
                </p>
                <h3 className="editorial-title mt-2 text-2xl font-black leading-tight sm:text-3xl md:text-4xl">
                  {category.name}
                </h3>
                <p className="editorial-copy mt-4 text-sm sm:text-base sm:leading-8">
                  {category.description}
                </p>

                <div className="editorial-panel mt-5 rounded-[1.25rem] p-3 sm:mt-6 sm:p-4">
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

                <div className="mt-6 sm:mt-7">
                  <div className="join-crew-button inline-flex w-fit items-center gap-3 rounded-full px-5 py-2.5 text-xs font-black uppercase text-slate-950 shadow-lg shadow-black/20 transition group-hover:-translate-y-0.5 sm:px-6 sm:py-3 sm:text-sm">
                    <span className="relative z-10">Browse crews</span>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="relative z-10"
                    />
                  </div>
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
