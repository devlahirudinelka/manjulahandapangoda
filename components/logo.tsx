import Image from "next/image";
import { logo, photoSrc } from "@/lib/images";

export function Logo({ large = false }: { large?: boolean }) {
  return (
    <span className="flex flex-col items-center gap-1.5">
      <Image
        src={photoSrc(logo)}
        alt=""
        width={logo.width}
        height={logo.height}
        className={large ? "h-10 w-auto" : "h-6 w-auto"}
        preload={!large}
      />
      <span
        className={`whitespace-nowrap uppercase ${
          large
            ? "text-[0.72rem] tracking-[0.42em]"
            : "text-[0.56rem] tracking-[0.38em]"
        }`}
      >
        Manjula Handapangoda
      </span>
    </span>
  );
}
