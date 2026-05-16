import Featured from "../components/HomeComp/Featured";
import HeroImage from "../components/HomeComp/HeroImage";

const Home = () => {
  return (
    <main className="bg-[linear-gradient(180deg,#fff1c4_0%,#ffd87b_22%,#ffc961_50%,#f0ad43_100%)] pt-[68px] sm:pt-[76px] xl:pt-[84px]">
      <HeroImage />
      <Featured />
    </main>
  );
};

export default Home;
