import Image from "next/image";

export function LaLuMark() {
  return (
    <span className="logo-mark" aria-hidden="true">
      <Image
        className="logo-mark-image"
        src="/images/lalu-logo.svg"
        alt=""
        width={1091}
        height={1098}
        sizes="32px"
        unoptimized
      />
    </span>
  );
}
