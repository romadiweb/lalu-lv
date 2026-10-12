import Image from "next/image";

export function LaLuMark() {
  return (
    <span className="logo-mark" aria-hidden="true">
      <Image
        className="logo-mark-image"
        src="/images/lalu-logo-black.svg"
        alt=""
        width={1755}
        height={1766}
        sizes="32px"
        unoptimized
      />
    </span>
  );
}
