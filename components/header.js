import Image from "next/image"
import Navigation from "./navigation"
import logo from "@/public/logo.jpg"

export default function Header() {
    return (<>
        <header className="flex justify-between items-center px-2 py-4 bg-foreground sticky top-0 left-0">
            <div className="ml-2 p-[4px] bg-background rounded-2xl">
                <Image src={logo.src} alt="dapur online" width={72} height={72} className="rounded-xl" />
            </div>
            <h1 className="text-lg md:text-4xl font-bold text-background tracking-wider">DAPUR <span className="text-orange-red">ONLINE</span></h1>
            <Navigation />
        </header>
    </>)
}