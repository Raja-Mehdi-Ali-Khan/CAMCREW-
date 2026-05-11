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

  const stats = [
    {
      value: "240+",
      label: "Creators",
      description: "Active creators across photo and video categories",
    },
    {
      value: "48h",
      label: "Replies",
      description: "Average response time for booking inquiries",
    },
    {
      value: "4.8/5",
      label: "Rating",
      description: "Mean rating from completed projects",
    },
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

      <div className="relative mx-auto grid min-h-[calc(100svh-84px)] w-full max-w-[96rem] items-center gap-10 px-5 py-10 sm:px-8 sm:py-12 lg:min-h-[calc(78vh-84px)] lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12 lg:px-10 lg:py-14 xl:gap-16">
        <div className="hero-fade-up flex max-w-[42rem] flex-col items-center text-center lg:items-start lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-bgimage shadow-lg shadow-black/20 backdrop-blur-sm sm:text-xs">
            <FontAwesomeIcon icon={faClapperboard} />
            Professional videography marketplace
          </p>

          <h1 className="hero-fade-up mt-6 max-w-[10.5ch] text-[clamp(2.8rem,8vw,5.8rem)] font-black leading-[0.88] tracking-[-0.04em] text-white [text-wrap:balance]">
            Make your brand look cinematic.
            <span className="mt-3 block text-bgimage">
              Stories shot with intention.
            </span>
          </h1>

          <p
            className="hero-fade-up mt-5 max-w-[34rem] text-sm font-medium leading-6 text-gray-200 sm:text-base sm:leading-7"
            style={{ animationDelay: "120ms" }}
          >
            Discover vetted videographers for weddings, campaigns, events, and
            documentaries. Review portfolios, compare teams, and lock your date
            in a few clicks.
          </p>

          <div
            className="hero-fade-up mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
            style={{ animationDelay: "220ms" }}
          >
            <a
              rel="noopener noreferrer"
              href="#category"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-bgimage px-6 py-3 text-sm font-black text-gray-950 shadow-lg shadow-black/30 transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:bg-[#ffbe3f] hover:shadow-bgimage/20"
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
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-black/15 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-bgimage/60 hover:bg-white/15"
            >
              <FontAwesomeIcon
                icon={faCirclePlay}
                className="transition duration-300 group-hover:scale-110"
              />
              See what you can book
            </a>
          </div>

          <div
            className="hero-fade-up mt-7 grid w-full max-w-[34rem] grid-cols-1 gap-2.5 sm:grid-cols-3"
            style={{ animationDelay: "320ms" }}
          >
            {highlights.map((item) => (
              <div
                key={item.label}
                className="hero-chip group flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-[11px] font-bold text-white backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-bgimage/40 hover:bg-white/15 sm:justify-start"
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

        <div
          className="hero-fade-up flex lg:items-center lg:justify-end"
          style={{ animationDelay: "200ms" }}
        >
          <div className="hero-float-card w-full rounded-[1.75rem] border border-white/15 bg-black/35 p-4 text-white shadow-2xl shadow-black/30 backdrop-blur-md sm:p-5 lg:max-w-[20rem]">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-bgimage">
              Why teams book on CamCrew
            </p>
            <div className="mt-4 space-y-2.5">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="group rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition duration-300 hover:-translate-y-0.5 hover:border-bgimage/25 hover:bg-white/10"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-xl font-black sm:text-2xl">
                      {item.value}
                    </p>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-bgimage">
                      {item.label}
                    </p>
                  </div>
                  <p className="mt-1 text-xs leading-5 text-gray-200">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroImage;
