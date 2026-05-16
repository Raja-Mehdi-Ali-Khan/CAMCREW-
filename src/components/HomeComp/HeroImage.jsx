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
    <section className="relative isolate overflow-hidden bg-[#201712] text-white">
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

      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#1d130d]/92 via-[#2a1d13]/65 to-black/70" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_18%,rgba(255,210,120,0.34),transparent_34%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_25%,rgba(255,245,216,0.12),transparent_26%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-[#fff0c6] via-[#fff0c6]/55 to-transparent sm:h-40" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-b from-transparent via-[rgb(22,21,21)]/45 to-[rgb(22,21,21)] sm:h-56" />

      <div className="relative z-10 mx-auto flex min-h-[28rem] w-full max-w-[96rem] items-start px-4 pb-8 pt-12 min-[430px]:min-h-[32rem] sm:min-h-[36rem] sm:items-center sm:px-8 sm:py-10 lg:min-h-[40rem] lg:px-10 xl:min-h-[42rem]">
        <div className="hero-fade-up flex w-full max-w-[56rem] flex-col items-center px-1 py-3 text-center sm:px-0 sm:py-4 lg:items-start lg:text-left">
          <p className="inline-flex max-w-full items-center gap-2 rounded-full border border-amber-200/70 bg-white/40 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.12em] text-amber-800 shadow-lg shadow-black/10 backdrop-blur-sm min-[390px]:text-[9px] sm:text-xs">
            <FontAwesomeIcon icon={faClapperboard} />
            <span className="truncate">
              Professional videography marketplace
            </span>
          </p>

          <h1 className="hero-fade-up mt-5 w-full max-w-full text-[2.55rem] font-black leading-[0.92] text-slate-950 min-[390px]:text-[3.1rem] sm:mt-5 sm:max-w-[40rem] sm:text-5xl lg:max-w-[60vw] lg:text-6xl xl:text-[5rem]">
            Make your brand look cinematic.
            <span className="mt-2 block text-bgimage">
              Stories shot with intention.
            </span>
          </h1>

          <p
            className="hero-fade-up mt-4 max-w-[36rem] text-sm font-medium leading-7 text-slate-700 min-[390px]:text-[1rem] sm:max-w-[38rem] sm:text-sm sm:leading-6"
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
              className="join-crew-button group inline-flex min-h-[3.25rem] flex-1 basis-[11rem] items-center justify-center gap-2.5 px-4 py-3 text-sm font-black text-slate-950 shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-1 min-[430px]:min-h-[3.5rem] min-[430px]:px-5 min-[430px]:text-base sm:min-h-12 sm:flex-none sm:basis-auto sm:px-5 sm:text-sm"
            >
              <span className="relative z-10">Explore categories</span>
              <FontAwesomeIcon
                icon={faArrowRight}
                className="relative z-10 transition duration-300 group-hover:translate-x-1"
              />
            </a>
            <a
              rel="noopener noreferrer"
              href="#featured-services"
              className="group inline-flex min-h-[3.25rem] flex-1 basis-[11rem] items-center justify-center gap-2 rounded-full border border-slate-900/10 bg-slate-950 px-4 py-3 text-sm font-bold text-amber-100 shadow-lg shadow-black/15 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-slate-900 min-[430px]:min-h-[3.5rem] min-[430px]:px-5 min-[430px]:text-base sm:min-h-12 sm:flex-none sm:basis-auto sm:px-5 sm:text-sm"
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
                className="hero-chip group inline-flex items-center justify-center gap-2 rounded-full border border-amber-200/70 bg-white/40 px-3 py-2 text-[10px] font-bold text-slate-800 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-bgimage/40 hover:bg-white/55 sm:text-[11px]"
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
