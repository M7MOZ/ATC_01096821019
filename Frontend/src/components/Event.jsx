import { event1 } from "../assets/modules"
function Event() {
    return (
        <div className="h-[70vh] overflow-hidden relative">
            <img src={event1} className="object-cover object-center relative" />
            <div className="absolute top-40 left-15 text-white font-bold text-5xl space-y-4">
                <h1>
                    Event Title
                </h1>
                <p className="text-2xl font-normal">
                    Event Description
                </p>
                <button className="bg-[#E32359] text-white p-2 rounded text-xl font-semibold cursor-pointer">Get Started</button>
            </div>
        </div>       
    )
}

export default Event