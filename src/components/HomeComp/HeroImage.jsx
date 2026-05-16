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
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-gray-950 via-gray-950/75 to-transparent sm:h-40" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-b from-transparent via-[rgb(22,21,21)]/45 to-[rgb(22,21,21)] sm:h-56" />

      <div className="relative z-10 mx-auto flex min-h-[28rem] w-full max-w-[96rem] items-start px-4 pb-8 pt-12 min-[430px]:min-h-[32rem] sm:min-h-[36rem] sm:items-center sm:px-8 sm:py-10 lg:min-h-[40rem] lg:px-10 xl:min-h-[42rem]">
        <div className="hero-fade-up flex w-full max-w-[48rem] flex-col items-center text-center lg:items-start lg:text-left">
          <p className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.12em] text-bgimage shadow-lg shadow-black/20 backdrop-blur-sm min-[390px]:text-[9px] sm:text-xs">
            <FontAwesomeIcon icon={faClapperboard} />
            <span className="truncate">
              Professional videography marketplace
            </span>
          </p>

          <h1 className="hero-fade-up mt-5 w-full max-w-full text-[2.55rem] font-black leading-[0.92] text-white min-[390px]:text-[3.1rem] sm:mt-5 sm:max-w-[34rem] sm:text-5xl lg:max-w-[60vw] lg:text-6xl xl:text-[5rem]">
            Make your brand look cinematic.
            <span className="mt-2 block text-bgimage">
              Stories shot with intention.
            </span>
          </h1>

          <p
            className="hero-fade-up mt-4 max-w-[32rem] text-sm font-medium leading-7 text-gray-200 min-[390px]:text-[1rem] sm:max-w-[34rem] sm:text-sm sm:leading-6"
            style={{ animationDelay: "120ms" }}
          >
            Discover vetted videographers for weddings, campaigns, and events.
            Compare portfolios and lock your date with confidence.
          </p>

          <div
            className="hero-fade-up mt-7 flex w-full flex-wrap justify-center gap-3 sm:mt-7 min-[430px]:w-auto lg:justify-start"
            style={{ animationDelay: "220ms" }}
          >
            <a
              rel="noopener noreferrer"
              href="#category"
              className="group inline-flex min-h-[3.25rem] flex-1 basis-[11rem] items-center justify-center gap-2.5 rounded-full bg-bgimage px-4 py-3 text-sm font-black text-gray-950 shadow-lg shadow-black/30 transition duration-300 hover:-translate-y-1 hover:bg-[#ffbe3f] hover:shadow-bgimage/20 min-[430px]:min-h-[3.5rem] min-[430px]:px-5 min-[430px]:text-base sm:min-h-12 sm:flex-none sm:basis-auto sm:px-5 sm:text-sm"
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
              className="group inline-flex min-h-[3.25rem] flex-1 basis-[11rem] items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-black/15 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-bgimage/60 hover:bg-white/15 min-[430px]:min-h-[3.5rem] min-[430px]:px-5 min-[430px]:text-base sm:min-h-12 sm:flex-none sm:basis-auto sm:px-5 sm:text-sm"
            >
              <FontAwesomeIcon
                icon={faCirclePlay}
                className="transition duration-300 group-hover:scale-110"
              />
              See what you can book
            </a>
          </div>

          <div
            className="hero-fade-up mt-6 hidden w-full max-w-[38rem] flex-wrap justify-center gap-2 min-[430px]:flex sm:mt-7 lg:justify-start"
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
