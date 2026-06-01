import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCamera,
  faClapperboard,
  faHelicopter,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";

const categoryMeta = {
  "Event Photography": {
    icon: faCamera,
    description: "Weddings, parties, ceremonies, and personal milestones.",
  },
  "Marketing Videography": {
    icon: faClapperboard,
    description: "Brand films, promos, reels, and campaign-ready content.",
  },
  "Drone Videography": {
    icon: faHelicopter,
    description: "Aerial coverage for venues, events, properties, and travel.",
  },
  "Media Videography": {
    icon: faVideo,
    description: "Interviews, social media shoots, and editorial coverage.",
  },
};

const CategoryCard = ({ category }) => {
  const meta = categoryMeta[category.name] || {
    icon: faCamera,
    description: "Professional creators ready for your next booking.",
  };

  return (
    <article className="h-full overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,245,226,0.92))] text-gray-950 shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition duration-300 group-hover:-translate-y-1.5 group-hover:border-bgimage/70 group-hover:shadow-[0_24px_46px_rgba(242,166,47,0.16)]">
      <div className="relative h-56 overflow-hidden">
        <img
          className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
          src={category.image}
          alt={category.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
        <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-[1rem] bg-[linear-gradient(135deg,#fff1c5_0%,#ffd369_44%,#f2a62f_100%)] text-gray-950 shadow-md">
          <FontAwesomeIcon icon={meta.icon} />
        </div>
      </div>

      <div className="flex min-h-[13rem] flex-col p-5">
        <h3 className="text-2xl font-black leading-tight tracking-[-0.04em] text-[#11131d]">
          {category.name}
        </h3>
        <p className="mt-3 flex-1 text-sm font-medium leading-6 text-gray-600">
          {meta.description}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-4">
          <span className="text-sm font-bold text-gray-800">
            View portfolios
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-gray-950 text-bgimage transition group-hover:bg-bgimage group-hover:text-gray-950">
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
        </div>
      </div>
    </article>
  );
};

export default CategoryCard;
