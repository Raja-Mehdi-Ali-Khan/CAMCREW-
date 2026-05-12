import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCirclePlay,
  faCalendarCheck,
  faClapperboard,
  faShieldHeart,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";

const HeroImage = () => {
  const highlights = [
    { icon: faVideo, label: "Cinema-grade storytellers" },
    { icon: faCalendarCheck, label: "Date-first booking" },
    { icon: faShieldHeart, label: "Secure advance pay" },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-gray-950 text-white">
      <video
        className="hero-video-motion absolute inset-0 -z-20 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1920&q=80"
      >
        <source
          src="https://cdn.coverr.co/videos/coverr-filming-a-woman-with-a-camera-1579/1080p.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black/90 via-black/60 to-black/75" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_18%,rgba(255,210,120,0.26),transparent_34%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-t from-gray-950 via-gray-950/70 to-transparent sm:h-36" />

      <div className="relative mx-auto flex h-[60vh] w-full max-w-[96rem] items-center px-4 py-4 sm:px-8 sm:py-5 lg:px-10">
        <div className="hero-fade-up flex max-w-[48rem] flex-col items-center text-center lg:items-start lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-bgimage shadow-lg shadow-black/20 backdrop-blur-sm min-[390px]:text-[10px] sm:text-xs">
            <FontAwesomeIcon icon={faClapperboard} />
            Professional videography marketplace
          </p>

          <h1 className="hero-fade-up mt-3 w-full max-w-full text-3xl font-black leading-[0.95] text-white min-[390px]:text-4xl sm:mt-4 sm:max-w-[34rem] sm:text-5xl lg:max-w-[60vw] lg:text-6xl">
            Make your brand look cinematic.
            <span className="mt-2 block text-bgimage">
              Stories shot with intention.
            </span>
          </h1>

          <p
            className="hero-fade-up mt-3 max-w-[31rem] text-xs font-medium leading-5 text-gray-200 min-[390px]:text-sm sm:max-w-[34rem] sm:leading-6"
            style={{ animationDelay: "120ms" }}
          >
            Discover vetted videographers for weddings, campaigns, and events.
            Compare portfolios and lock your date with confidence.
          </p>

          <div
            className="hero-fade-up mt-4 flex w-full flex-col gap-2.5 min-[430px]:w-auto min-[430px]:flex-row sm:mt-5"
            style={{ animationDelay: "220ms" }}
          >
            <a
              rel="noopener noreferrer"
              href="#category"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-bgimage px-4 py-2.5 text-xs font-black text-gray-950 shadow-lg shadow-black/30 transition duration-300 hover:-translate-y-1 hover:bg-[#ffbe3f] hover:shadow-bgimage/20 sm:px-5 sm:text-sm"
            >
              <span>Explore categories</span>
              <FontAwesomeIcon
                icon={faArrowRight}
                className="transition duration-300 group-hover:translate-x-1"
              />
            </a>
            <a
              rel="noopener noreferrer"
              href="#featured-services"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-black/15 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-bgimage/60 hover:bg-white/15 sm:px-5 sm:text-sm"
            >
              <FontAwesomeIcon
                icon={faCirclePlay}
                className="transition duration-300 group-hover:scale-110"
              />
              See what you can book
            </a>
          </div>

          <div
            className="hero-fade-up mt-4 hidden w-full max-w-[38rem] flex-wrap justify-center gap-2 min-[430px]:flex sm:mt-5 lg:justify-start"
            style={{ animationDelay: "320ms" }}
          >
            {highlights.map((item) => (
              <div
                key={item.label}
                className="hero-chip group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[10px] font-bold text-white backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-bgimage/40 hover:bg-white/15 sm:text-[11px]"
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className="text-bgimage transition duration-300 group-hover:scale-110"
                />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroImage;
