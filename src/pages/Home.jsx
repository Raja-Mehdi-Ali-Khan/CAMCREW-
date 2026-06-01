import Featured from "../components/HomeComp/Featured";
import HeroImage from "../components/HomeComp/HeroImage";

const Home = () => {
  return (
    <main className="bg-[linear-gradient(180deg,#fff4d6_0%,#ffe29f_18%,#ffc968_46%,#efaa3e_100%)] pt-[61px] sm:pt-[68px] xl:pt-[76px]">
      <HeroImage />
      <Featured />
    </main>
  );
};

export default Home;
