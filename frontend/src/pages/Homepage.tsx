import HomeCard from "@/components/HomeCard";

export default function Homepage() {
  return (
    <section className="flex flex-col w-full h-full items-center justify-center gap-24">
      <h1 className="text-6xl text-primary font-bold">Sports Gadget</h1>
      <div className="flex flex-wrap w-full h-full gap-12">
        <HomeCard
          image={"/images/soccer-ball.svg"}
          title={"Fußball"}
          link={"/football"}
        />
        <HomeCard
          image={"/images/formula1-car.svg"}
          title={"Formel 1"}
          link={"/formula1"}
        />
        {/*         <HomeCard
          image={"/images/biathlon.svg"}
          title={"Biathlon"}
          link={"/biathlon"}
        /> */}
      </div>
    </section>
  );
}
