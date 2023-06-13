import TimeCard from "./TimeCard";

export default function Nav() {
    return (
        <>
            <nav className=" mb-6 text-white">
                    <ul className="flex flex-row justify-between items-center">
                        <li ><TimeCard></TimeCard></li>
                        <li className="text-sm">Made with  <i className="nes-icon is-small heart"></i> by endan</li>
                    </ul>
            </nav>
        </>
    )
}