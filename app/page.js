import Image from "next/image";
import banner from "@/public/resto7.jpg"
import Menus from "@/components/menus";

export default function Home() {
  return (
    <div className="mt-12 flex flex-col justify-center items-center gap-8">
      <h1 className="font-bold font-oswald text-2xl md:text-5xl w-4/6 text-center">#Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non. </h1>
      <div>
        <Image src={banner.src} alt="banner" width={640} height={640} className="rounded-xl" />
      </div>
      <section>
        <Menus />
      </section>
    </div>
  );
}
