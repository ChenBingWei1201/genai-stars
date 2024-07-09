import { ICONS } from "@/constants";
import { IconType } from "@/types";

function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center h-32 w-full border-t bg-white gap-3">
      <div className="flex flex-row items-center justify-center">
        {ICONS.map((icon: IconType, index: number) => {
          return (
            <a href={icon.href} target="_blank" key={index}>
              <img src={icon.src} alt={icon.alt} className="w-9 m-2" />
            </a>
          );
        })}
      </div>
      <p className="text-lg font-semibold">© 2024 大家不要再卷AI</p>
    </footer>
  );
}

export default Footer;
