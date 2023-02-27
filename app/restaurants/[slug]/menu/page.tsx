import { fetchRestaurantItems } from "@/services/restaurant";
import Header from "../components/Header";
import RestaurantMenu from "../components/RestaurantMenu";
import RestaurantNavbar from "../components/RestaurantNavbar";

export default async function RestaurantMenuPage({ params }: { params: { slug: string } }) {
  const menus = await fetchRestaurantItems(params.slug);

  return (
    <>
      <div className="bg-white w-[100%] rounded p-3 shadow">
        <RestaurantNavbar slug={params.slug} />
        <RestaurantMenu menus={menus} />
      </div>
    </>
  );
}