import { Link, useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaCheck,
  FaLocationDot,
  FaRegImages,
  FaScaleBalanced,
  FaVideo,
} from "react-icons/fa6";
import { FiTrash2 } from "react-icons/fi";
import { Button } from "../components/Button";
import Star from "../components/CategoryComp/Star";
import { useComparison } from "../context/ComparsionContext";

const formatRate = (value) => {
  const numericValue = Number(value) || 0;
  return `Rs. ${numericValue.toLocaleString("en-IN")}`;
};

const getEmbedUrl = (youtubeId) => {
  if (!youtubeId) return null;
  return `https://www.youtube.com/embed/${youtubeId}`;
};

const ComparisonRow = ({ label, crewA, crewB, renderValue }) => (
  <div className="grid gap-4 border-t border-white/10 px-5 py-5 lg:grid-cols-[11rem_minmax(0,1fr)_minmax(0,1fr)] lg:px-6">
    <div className="text-[11px] font-black uppercase tracking-[0.16em] text-amber-100/70">
      {label}
    </div>
    <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-gray-100">
      {renderValue(crewA)}
    </div>
    <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-gray-100">
      {renderValue(crewB)}
    </div>
  </div>
);

const CrewSummaryCard = ({ crew, slotLabel, onRemove, onOpenCategory }) => {
  const locationLabel = [crew?.pincode, crew?.state].filter(Boolean).join(", ");

  return (
    <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] shadow-[0_26px_70px_rgba(0,0,0,0.24)]">
      <div className="relative h-60 overflow-hidden bg-[linear-gradient(135deg,#2b1d12_0%,#1a1411_48%,#0f172a_100%)]">
        <img
          src={crew?.image?.[0]}
          alt={crew?.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
          <span className="rounded-full border border-amber-200/20 bg-black/35 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-amber-100 backdrop-blur-sm">
            {slotLabel}
          </span>
          <button
            type="button"
            onClick={() => onRemove(crew?._id)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/35 text-gray-100 backdrop-blur-sm transition duration-300 hover:border-amber-200/20 hover:bg-black/55 hover:text-amber-100"
            aria-label={`Remove ${crew?.title} from comparison`}
          >
            <FiTrash2 />
          </button>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm">
            <FaRegImages className="text-[#ffd27a]" />
            {crew?.image?.length || 0} shot{crew?.image?.length === 1 ? "" : "s"}
          </span>
          <h2 className="mt-4 text-[1.8rem] font-black leading-tight text-white">
            {crew?.title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-200">
            {crew?.description}
          </p>
        </div>
      </div>

      <div className="grid gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-2 rounded-full bg-bgimage px-3 py-2 text-sm font-semibold text-slate-950">
            {Star(crew?.averageRating, true)}
            <span>{Number(crew?.averageRating || 0).toFixed(1)}</span>
          </span>
          <span className="rounded-full bg-white/10 px-3 py-2 text-sm font-medium text-gray-200">
            {crew?.count || 0} review{crew?.count === 1 ? "" : "s"}
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.14em] text-amber-100/75">
              Day Rate
            </p>
            <p className="mt-2 text-xl font-black text-white">
              {formatRate(crew?.price)}
            </p>
          </div>
          <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.14em] text-amber-100/75">
              Base Category
            </p>
            <button
              type="button"
              onClick={() => onOpenCategory(crew?.category)}
              className="mt-2 inline-flex min-h-[2.5rem] items-center justify-center rounded-full border border-amber-200/14 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition duration-300 hover:border-amber-200/30 hover:bg-white/10 hover:text-amber-100"
            >
              {crew?.category || "Portfolio"}
            </button>
          </div>
        </div>

        <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-bgimage text-slate-950">
              <FaLocationDot />
            </span>
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.14em] text-amber-100/75">
                Available In
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                {locationLabel || "Location available on request"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

const EmptyState = ({ selectedCount }) => (
  <div className="rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-8 text-center shadow-[0_24px_70px_rgba(0,0,0,0.18)] sm:p-10">
    <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full border border-amber-200/20 bg-white/5 text-bgimage">
      <FaScaleBalanced className="text-2xl" />
    </div>
    <h2 className="mt-5 text-3xl font-black tracking-tight text-white">
      Build your crew comparison
    </h2>
    <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base">
      Shortlist two crews to compare their rates, visuals, reviews, and availability in one clean view.
    </p>
    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
      <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-gray-200">
        {selectedCount}/2 crews selected
      </span>
      <span className="rounded-full border border-amber-200/20 bg-amber-200/10 px-4 py-2 text-sm font-semibold text-amber-50">
        {selectedCount === 0
          ? "Pick two crews to unlock the full comparison"
          : "Add one more crew to unlock the full comparison"}
      </span>
    </div>
    <div className="mt-8 flex justify-center">
      <Link
        to="/category/media videography"
        className="join-crew-button inline-flex min-h-[3.35rem] items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-black uppercase tracking-[0.12em] text-slate-950 shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-0.5"
      >
        <span className="relative z-10">Browse Portfolios</span>
        <FaArrowRight className="relative z-10" />
      </Link>
    </div>
  </div>
);

const ComparisonPage = () => {
  const navigate = useNavigate();
  const { selectedCrews, clearComparison, removeCrew } = useComparison();
  const crewCount = selectedCrews?.length || 0;
  const [crewA, crewB] = selectedCrews;
  const hasFullComparison = crewCount === 2;

  const openCategory = (category) => {
    if (!category) return;
    navigate(`/category/${category.toLowerCase()}`);
  };

  return (
    <div className="relative overflow-hidden bg-[#161515] pt-[61px] text-white sm:pt-[68px] xl:pt-[76px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(255,213,122,0.18),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(255,240,198,0.09),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[30rem] bg-gradient-to-b from-[#2a1d13]/80 via-[#1a1411]/72 to-transparent" />

      <section className="relative px-4 pb-16 pt-6 sm:px-6 sm:pb-20 sm:pt-8 lg:px-8">
        <div className="mx-auto max-w-[88rem]">
          <div className="rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(17,17,17,0.96),rgba(24,22,20,0.98))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-8 lg:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-amber-100/75">
                  Comparison Studio
                </p>
                <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
                  Compare crews with clarity.
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base">
                  Review creative fit, pricing, review strength, visuals, and location side by side before you commit to a booking conversation.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-gray-200">
                  {crewCount}/2 crews selected
                </div>
                <button
                  type="button"
                  onClick={clearComparison}
                  disabled={crewCount === 0}
                  className="inline-flex min-h-[2.9rem] items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-bold text-white transition duration-300 hover:border-amber-200/25 hover:bg-white/10 hover:text-amber-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FiTrash2 />
                  Clear Line-up
                </button>
              </div>
            </div>

            <div className="mt-8 grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 sm:grid-cols-3 sm:p-5">
              {["Pick your first crew", "Add a second crew", "Compare and decide"].map(
                (step, index) => {
                  const isActive = crewCount > index;

                  return (
                    <div
                      key={step}
                      className={`rounded-[1.5rem] border p-4 transition duration-300 ${
                        isActive
                          ? "border-amber-200/20 bg-amber-200/10 text-amber-50"
                          : "border-white/10 bg-white/[0.03] text-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-black ${
                            isActive
                              ? "bg-bgimage text-slate-950"
                              : "bg-white/10 text-gray-200"
                          }`}
                        >
                          {isActive ? <FaCheck /> : index + 1}
                        </span>
                        <div>
                          <p className="text-xs font-black uppercase tracking-[0.14em]">
                            Step {index + 1}
                          </p>
                          <p className="mt-1 text-sm font-semibold">{step}</p>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>

            <div className="mt-10">
              {!hasFullComparison ? (
                <EmptyState selectedCount={crewCount} />
              ) : (
                <div className="space-y-8">
                  <div className="grid gap-6 xl:grid-cols-2">
                    <CrewSummaryCard
                      crew={crewA}
                      slotLabel="Crew A"
                      onRemove={removeCrew}
                      onOpenCategory={openCategory}
                    />
                    <CrewSummaryCard
                      crew={crewB}
                      slotLabel="Crew B"
                      onRemove={removeCrew}
                      onOpenCategory={openCategory}
                    />
                  </div>

                  <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] shadow-[0_24px_70px_rgba(0,0,0,0.18)]">
                    <div className="grid gap-4 border-b border-white/10 px-5 py-5 lg:grid-cols-[11rem_minmax(0,1fr)_minmax(0,1fr)] lg:px-6">
                      <div className="text-[11px] font-black uppercase tracking-[0.16em] text-amber-100/75">
                        Side By Side
                      </div>
                      <div>
                        <p className="text-lg font-black text-white">{crewA?.title}</p>
                        <p className="mt-1 text-sm text-gray-400">
                          First shortlisted crew
                        </p>
                      </div>
                      <div>
                        <p className="text-lg font-black text-white">{crewB?.title}</p>
                        <p className="mt-1 text-sm text-gray-400">
                          Second shortlisted crew
                        </p>
                      </div>
                    </div>

                    <ComparisonRow
                      label="Visual Preview"
                      crewA={crewA}
                      crewB={crewB}
                      renderValue={(crew) => (
                        <img
                          src={crew?.image?.[0]}
                          alt={crew?.title}
                          className="h-52 w-full rounded-[1.1rem] object-cover"
                        />
                      )}
                    />

                    <ComparisonRow
                      label="Featured Reel"
                      crewA={crewA}
                      crewB={crewB}
                      renderValue={(crew) => {
                        const embedUrl = getEmbedUrl(crew?.youtube);

                        if (!embedUrl) {
                          return (
                            <div className="flex h-52 items-center justify-center rounded-[1.1rem] border border-dashed border-white/10 bg-black/20 text-center text-gray-400">
                              <div>
                                <FaVideo className="mx-auto text-xl text-amber-100/70" />
                                <p className="mt-3 text-sm font-semibold text-gray-200">
                                  Reel not added yet
                                </p>
                                <p className="mt-1 text-xs text-gray-400">
                                  Use the image and description to compare creative style.
                                </p>
                              </div>
                            </div>
                          );
                        }

                        return (
                          <div className="overflow-hidden rounded-[1.1rem] border border-white/10">
                            <iframe
                              className="h-52 w-full"
                              src={embedUrl}
                              title={`${crew?.title} featured reel`}
                              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                            />
                          </div>
                        );
                      }}
                    />

                    <ComparisonRow
                      label="Day Rate"
                      crewA={crewA}
                      crewB={crewB}
                      renderValue={(crew) => (
                        <div>
                          <p className="text-xl font-black text-white">
                            {formatRate(crew?.price)}
                          </p>
                          <p className="mt-1 text-xs uppercase tracking-[0.14em] text-amber-100/75">
                            Per day
                          </p>
                        </div>
                      )}
                    />

                    <ComparisonRow
                      label="Rating"
                      crewA={crewA}
                      crewB={crewB}
                      renderValue={(crew) => (
                        <div className="flex flex-wrap items-center gap-3">
                          {Star(crew?.averageRating, true)}
                          <span className="text-sm font-semibold text-white">
                            {Number(crew?.averageRating || 0).toFixed(1)} / 5
                          </span>
                        </div>
                      )}
                    />

                    <ComparisonRow
                      label="Coverage Area"
                      crewA={crewA}
                      crewB={crewB}
                      renderValue={(crew) => (
                        <span>
                          {[crew?.pincode, crew?.state].filter(Boolean).join(", ") ||
                            "Available on request"}
                        </span>
                      )}
                    />

                    <ComparisonRow
                      label="Category"
                      crewA={crewA}
                      crewB={crewB}
                      renderValue={(crew) => (
                        <button
                          type="button"
                          onClick={() => openCategory(crew?.category)}
                          className="inline-flex min-h-[2.5rem] items-center justify-center rounded-full border border-amber-200/14 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition duration-300 hover:border-amber-200/30 hover:bg-white/10 hover:text-amber-100"
                        >
                          {crew?.category || "Portfolio"}
                        </button>
                      )}
                    />

                    <ComparisonRow
                      label="Overview"
                      crewA={crewA}
                      crewB={crewB}
                      renderValue={(crew) => crew?.description || "No description added yet."}
                    />
                  </section>
                </div>
              )}
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 border-t border-white/10 pt-8">
              <Link
                to="/category/media videography"
                className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition duration-300 hover:border-amber-200/25 hover:bg-white/10 hover:text-amber-100"
              >
                Browse more crews
              </Link>
              <Button
                className="min-w-[14rem]"
                onClick={() => navigate("/category/media videography")}
              >
                Return to portfolios
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComparisonPage;
