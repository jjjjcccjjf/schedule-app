import TimeCard from "./TimeCard";

export default function Nav() {
    return (
        <>
            <nav className=" mb-6">
                    <ul className="flex flex-row justify-between items-center">
                        <li ><TimeCard></TimeCard></li>
                        <li className="nes-btn text-xs">Night mode</li>
                    </ul>
            </nav>
        </>
    )
}