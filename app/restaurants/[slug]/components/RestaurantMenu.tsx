import { Item } from '@prisma/client'
import MenuCard from './MenuCard'

export default function RestaurantMenu({ menus }: { menus: Item[] }) {
  return (
    <main className="bg-white mt-5">
      <div>
        <div className="mt-4 pb-1 mb-1">
          <h1 className="font-bold text-4xl">Menu</h1>
        </div>
        <div className="flex flex-wrap justify-between">
          {menus.length ? 
            menus.map(menu => <MenuCard menu={menu} key={menu.id} />) 
            :  (
              <div className="flex flex-wrap justify-between">
                <p>This restaurant does not have a menu.</p>
              </div>
            )
          }
        </div>
      </div>
    </main>
  )
}
