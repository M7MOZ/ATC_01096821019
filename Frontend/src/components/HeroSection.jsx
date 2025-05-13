import { useContext } from "react"
import { heroImg } from "../assets/modules.js"
import { AppContext } from "../context/AppContext.jsx"
import { useTranslation } from "react-i18next"

function HeroSection() {
  const { setIsSignUpModal } = useContext(AppContext)
  const { t, i18n } = useTranslation()
  const lang = i18n.language

  return (
    <div
      className="h-[60vh] w-[85%] mx-auto mt-18 mb-5 flex items-center bg-cover rounded-lg relative"
      style={{ backgroundImage: `url(${heroImg})` }}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>

      {/* Content container */}
      <div className="container mx-auto px-4 relative ">
        <div className={`text-white max-w-2xl m-15`}>
          <h1 className="font-bold text-5xl mb-4">{t("hero.hero_one")}</h1>
          <p className="text-2xl font-normal mb-6">{t("hero.hero_two")}</p>
          <button
            onClick={() => setIsSignUpModal(true)}
            className="bg-[#E32359] text-white p-2 rounded text-xl font-semibold cursor-pointer"
          >
            {t("hero.get_started")}
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
