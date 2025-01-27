import CardFood from "@/components/foodPopular/CardFood";

const PopularFoodComponent = () => {
    return (
        <main className="w-full h-[457px] bg-white rounded-tl-[15px] rounded-tr-[15px]">
            <h1 className={"pt-5 px-5 text-[26px] font-bold"}>Popularity of food</h1>
            <section className={"px-5 pt-5 flex gap-3"}>
                <CardFood/>
                <CardFood/>
                <CardFood/>
                <CardFood/>
            </section>
        </main>
    );
};
export default PopularFoodComponent;