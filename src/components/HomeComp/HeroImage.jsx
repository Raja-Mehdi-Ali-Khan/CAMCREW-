import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCirclePlay,
  faCalendarCheck,
  faClapperboard,
  faShieldHeart,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

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

      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#1d130d]/96 via-[#2a1d13]/82 to-black/84" />
      <div className="absolute inset-0 -z-10 bg-black/30" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_18%,rgba(255,210,120,0.34),transparent_34%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_25%,rgba(255,245,216,0.12),transparent_26%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-[#fff0c6] via-[#fff0c6]/55 to-transparent sm:h-40" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-b from-transparent via-[rgb(22,21,21)]/45 to-[rgb(22,21,21)] sm:h-56" />

      <div className="relative z-10 mx-auto flex min-h-[28rem] w-full max-w-[96rem] items-start px-4 pb-8 pt-4 min-[430px]:min-h-[32rem] sm:min-h-[36rem] sm:items-center sm:px-8 sm:pt-5 sm:pb-10 lg:min-h-[40rem] lg:px-10 xl:min-h-[42rem]">
        <div className="hero-fade-up flex w-full max-w-[56rem] flex-col items-center px-1 py-3 text-center sm:px-0 sm:py-4 lg:items-start lg:text-left">
          <p className="editorial-badge inline-flex max-w-full items-center gap-2 rounded-full px-4 py-2.5 text-[10px] font-black uppercase leading-none tracking-[0.14em] shadow-[0_16px_36px_rgba(0,0,0,0.18)] backdrop-blur-sm min-[390px]:text-[10.5px] sm:px-5 sm:py-2.5 sm:text-[11px] sm:tracking-[0.16em]">
            <FontAwesomeIcon
              icon={faClapperboard}
              className="shrink-0 text-[10px] sm:text-[11px]"
            />
            <span className="truncate whitespace-nowrap leading-none">
              Professional videography marketplace
            </span>
          </p>

          <h1 className="hero-fade-up mt-5 w-full max-w-full text-[2.7rem] font-black leading-[0.9] text-[#060b25] drop-shadow-[0_10px_30px_rgba(255,255,255,0.08)] min-[390px]:text-[3.2rem] sm:mt-5 sm:max-w-[40rem] sm:text-5xl lg:max-w-[60vw] lg:text-6xl xl:text-[5rem]">
            Make your brand look cinematic.
            <span className="mt-2 block text-bgimage">
              Stories shot with intention.
            </span>
          </h1>

          <p
            className="hero-fade-up editorial-glass mt-4 max-w-[36rem] rounded-[1.8rem] px-4 py-3 text-sm font-medium leading-7 text-white shadow-[0_12px_30px_rgba(0,0,0,0.22)] min-[390px]:text-[1rem] sm:max-w-[38rem] sm:text-sm sm:leading-6"
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
              className="join-crew-button group inline-flex min-h-[3.25rem] flex-1 basis-[11rem] items-center justify-center gap-2.5 rounded-full px-4 py-3 text-sm font-black text-slate-950 shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-1 min-[430px]:min-h-[3.5rem] min-[430px]:px-5 min-[430px]:text-base sm:min-h-12 sm:flex-none sm:basis-auto sm:px-5 sm:text-sm"
            >
              <span className="relative z-10">Explore categories</span>
              <FontAwesomeIcon
                icon={faArrowRight}
                className="relative z-10 transition duration-300 group-hover:translate-x-1"
              />
            </a>
            <Link
              to="/category/media videography"
              className="group inline-flex min-h-[3.25rem] flex-1 basis-[11rem] items-center justify-center gap-2 rounded-full border border-slate-900/10 bg-slate-950 px-4 py-3 text-sm font-bold text-amber-100 shadow-lg shadow-black/15 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-slate-900 min-[430px]:min-h-[3.5rem] min-[430px]:px-5 min-[430px]:text-base sm:min-h-12 sm:flex-none sm:basis-auto sm:px-5 sm:text-sm"
            >
              <FontAwesomeIcon
                icon={faCirclePlay}
                className="transition duration-300 group-hover:scale-110"
              />
              See who you can book
            </Link>
          </div>

          <div
            className="hero-fade-up mt-6 hidden w-full max-w-[38rem] flex-wrap justify-center gap-2 min-[430px]:flex sm:mt-7 lg:justify-start"
            style={{ animationDelay: "320ms" }}
          >
            {highlights.map((item) => (
              <div
                key={item.label}
                className="hero-chip editorial-chip group inline-flex items-center justify-center gap-2 rounded-full px-3 py-2 text-[10px] font-bold text-slate-800 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-bgimage/40 hover:bg-white/55 sm:text-[11px]"
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
