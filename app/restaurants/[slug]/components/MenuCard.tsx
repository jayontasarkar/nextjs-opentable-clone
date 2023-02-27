import { Item } from "@prisma/client";

export default function MenuCard({ menu }: { menu: Item }) {
  return (
    <div className=" border rounded p-3 w-[49%] mb-3">
      <h3 className="font-bold text-lg">{menu.name}</h3>
      <p className="font-light mt-1 text-sm">
        {menu.description}
      </p>
      <p className="mt-7">{menu.price}</p>
    </div>
  )
}
