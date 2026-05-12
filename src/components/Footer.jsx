import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import LanguageSelector from "./LanguageSelector";

const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-gray-200 transition hover:border-bgimage/60 hover:text-bgimage"
  >
    {icon}
  </a>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-footer_bg text-white">
      <div className="w-full px-5 py-5 sm:px-8 lg:px-10 lg:py-6">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-[1.05fr_1fr_0.5fr_1fr] lg:items-start lg:gap-6">
          <div>
            <h3 className="text-xl font-black tracking-tight">CamCrew</h3>
            <p className="mt-2 max-w-sm text-xs leading-5 text-gray-300">
              Find photographers and videographers for events, brand stories,
              aerial coverage, and media work with a booking flow built around
              real availability.
            </p>
            <div className="mt-3 max-w-[14rem]">
              <LanguageSelector />
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wide text-bgimage">
              Stay updated
            </h3>
            <p className="mt-1.5 text-xs leading-5 text-gray-300">
              Get service updates and booking tips when subscriptions are
              enabled.
            </p>
            <form className="mt-2.5 flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
              <input
                type="email"
                placeholder="Email address"
                className="min-w-0 flex-1 rounded-md border border-white/10 bg-white px-3 py-2 text-xs text-gray-950 outline-none transition focus:border-bgimage"
                required
              />
              <button
                type="submit"
                className="cursor-not-allowed rounded-md bg-bgimage px-3.5 py-2 text-[11px] font-black uppercase tracking-wide text-gray-950 opacity-80"
                disabled
              >
                Subscribe
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wide text-bgimage">
              Follow
            </h3>
            <div className="mt-2.5 flex gap-2">
              <SocialLink
                href="#"
                label="Twitter"
                icon={<FaTwitter className="text-lg" />}
              />
              <SocialLink
                href="#"
                label="LinkedIn"
                icon={<FaLinkedin className="text-lg" />}
              />
              <SocialLink
                href="#"
                label="GitHub"
                icon={<FaGithub className="text-lg" />}
              />
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wide text-bgimage">
              Contact
            </h3>
            <div className="mt-2.5 grid gap-2 text-xs text-gray-300 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div>
                <p className="font-bold text-white">Call us</p>
                <a href="tel:+919777135832" className="hover:text-bgimage">
                  +91 9777135832
                </a>
              </div>
              <div>
                <p className="font-bold text-white">Mail us</p>
                <a
                  href="mailto:epicscamcrew@gmail.com"
                  className="break-all hover:text-bgimage"
                >
                  epicscamcrew@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 border-t border-white/10 pt-3">
          <div className="flex flex-col justify-between gap-2 text-[11px] text-gray-400 md:flex-row md:items-center">
            <p>© {currentYear} CamCrew. All rights reserved.</p>
            <div className="flex flex-wrap gap-2.5">
              <a href="#" className="transition hover:text-bgimage">
                Privacy policy
              </a>
              <a href="#" className="transition hover:text-bgimage">
                Terms and conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
