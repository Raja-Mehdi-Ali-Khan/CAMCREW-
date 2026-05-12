import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

const LanguageSelector = () => {
  return (
    <div className="language-selector rounded-md border border-white/10 bg-white/5 p-2.5 text-sm text-gray-200">
      <div className="mb-1.5 flex items-center gap-2">
        <FontAwesomeIcon icon={faGlobe} className="text-bgimage" />
        <span className="font-semibold">Language</span>
      </div>
      <div id="google_translate_element"></div>
    </div>
  );
};

export default LanguageSelector;
