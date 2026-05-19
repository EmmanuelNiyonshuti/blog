import SearchBar from "./SearchBar"
import CategoriesSection from "../blog/CategoriesSection"
import Welcome from "./Welcome"

const Sidebar = ({categories}) => {
  return (
  <aside className="hidden lg:block lg:col-span-1 self-stretch">
    <div className="lg:sticky lg:top-8 flex flex-col gap-16">
        <SearchBar />
        <CategoriesSection categories={categories} />
        <Welcome />
    </div>
  </aside>
  )
}

export default Sidebar