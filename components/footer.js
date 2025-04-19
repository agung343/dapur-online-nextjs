import {FaInstagram, FaTiktok, FaWhatsapp} from "react-icons/fa"

export default function Footer() {
    return (
        <footer className="flex flex-col md:flex-row gap-4 bg-foreground p-4 mt-8 justify-around">
            <div className="flex flex-col gap-2 justify-center text-background">
                <h2 className="font-bold text-2xl">Dapur Online</h2>
                <address className="">ABC Street 123</address>
                <p className="">your_email@mail.com</p>
                <p className="">08123456789</p>
            </div>
            <h2 className="text-lg text-background">Powered by: Studio191</h2>
            <div className="text-background text-xl flex flex-col gap-2">
                <h2>Follow Our Social Account</h2>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="inline text-orange-red" /> @your_instagram
                </a>
                <a href="https://www.tiktok.com" target="_blank" rel="noopener noreffere">
                    <FaTiktok className="inline" /> your_tiktok
                </a>
                <a href="https://wa.me/6285257130599" target="_blank" rel="noopener noreffer">
                    <FaWhatsapp className="inline text-medium-green" /> 085257130599
                </a>
            </div>
        </footer>
    )
}