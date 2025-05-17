import { useState } from "react";
import Categories from "../components/Categories"
import EventGrid from "../components/EventGrid"

function HomePage() {
    const [selectedCategory, setSelectedCategory] = useState('trending');
    return (
        <div className="overflow-auto">
            <Categories selectedCategory = {selectedCategory} setSelectedCategory = {setSelectedCategory} />
            <EventGrid selectedCategory = {selectedCategory} />
        </div>
    )
}

export default HomePage