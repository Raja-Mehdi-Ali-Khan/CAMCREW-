import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import LanguageSelector from "./LanguageSelector";

const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-gray-200 transition hover:border-bgimage/60 hover:text-bgimage"
  >
    {icon}
  </a>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-footer_bg text-white">
      <div className="w-full px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.9fr_0.7fr_0.85fr]">
          <div>
            <h3 className="text-3xl font-black tracking-tight">CamCrew</h3>
            <p className="mt-4 max-w-sm text-sm leading-7 text-gray-300">
              Find photographers and videographers for events, brand stories,
              aerial coverage, and media work with a booking flow built around
              real availability.
            </p>
            <div className="mt-6 max-w-xs">
              <LanguageSelector />
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold uppercase text-bgimage">
              Stay updated
            </h3>
            <p className="mt-3 text-sm leading-6 text-gray-300">
              Get service updates and booking tips when subscriptions are
              enabled.
            </p>
            <form className="mt-5 flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email address"
                className="rounded-md border border-white/10 bg-white px-4 py-3 text-sm text-gray-950 outline-none transition focus:border-bgimage"
                required
              />
              <button
                type="submit"
                className="cursor-not-allowed rounded-md bg-bgimage px-5 py-3 text-sm font-black uppercase text-gray-950 opacity-80"
                disabled
              >
                Subscribe
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-base font-bold uppercase text-bgimage">
              Follow
            </h3>
            <div className="mt-5 flex gap-3">
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
            <h3 className="text-base font-bold uppercase text-bgimage">
              Contact
            </h3>
            <div className="mt-5 space-y-4 text-sm text-gray-300">
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

        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col justify-between gap-4 text-sm text-gray-400 md:flex-row md:items-center">
            <p>© {currentYear} CamCrew. All rights reserved.</p>
            <div className="flex flex-wrap gap-4">
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
