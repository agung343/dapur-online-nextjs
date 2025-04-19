import Slideshow from "@/components/slideshow";
import { getMenus } from "@/utils/db";

export default async function AboutUsPage() {
  const menus = await getMenus();
  const mainCourse = menus.filter((item) => item.category === "Main Course");
  return (
    <section id="about" className="min-h-[800px]">
      <div className="flex flex-col gap-3 items-center my-8">
        <h1 className="text-3xl text-orange-red font-bold">About Us</h1>
        <p className="w-4/5 text-lg text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          consequat pulvinar lorem. Praesent iaculis lacus sit amet metus
          maximus, id sodales tellus hendrerit. Donec cursus scelerisque tempor.
          Curabitur vitae magna ut lectus dignissim ultricies. Nullam quis
          accumsan elit, sit amet sodales leo. Donec nec lacus porta, elementum
          tortor a, placerat augue. Integer sed nisl a justo commodo vehicula.
          Nulla cursus dui ut ornare euismod. Vivamus metus metus, pretium
          efficitur consectetur vel, lobortis ut massa. Ut sed suscipit dui.
          Quisque a risus elementum, ultricies massa vitae, auctor velit.
          Phasellus mauris ante, porttitor ac dolor quis, maximus ornare urna.
          Curabitur euismod, nisl non vulputate semper, nisl arcu porta nisi, at
          fringilla nisi urna ut risus. Sed ac sollicitudin ipsum, id faucibus
          sapien. Nunc interdum enim et auctor vestibulum. Integer venenatis mi
          a diam placerat semper.
        </p>
        <p className="w-4/5 text-lg text-justify">
          Mauris nec eros interdum, fermentum mauris eu, rhoncus dui. Integer ut
          tortor diam. Donec bibendum id est vitae iaculis. Proin eu diam at
          eros pretium efficitur. Maecenas pellentesque mauris vel hendrerit
          consequat. Fusce venenatis massa id aliquam scelerisque. Nullam
          volutpat euismod magna, vitae mattis eros tempor a. Curabitur
          porttitor fermentum justo eu vehicula. Nulla condimentum placerat
          quam, et rhoncus nibh semper id. Vivamus aliquet quam vel libero
          auctor interdum. Quisque leo velit, ullamcorper et lobortis vel,
          aliquam id libero.
        </p>
      </div>
      <Slideshow items={mainCourse} />
    </section>
  );
}
