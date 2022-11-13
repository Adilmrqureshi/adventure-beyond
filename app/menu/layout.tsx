import { primaryBold, secondary } from "../../utils/fonts";

export default function MenuLayout({ children }: { children: any }) {
  return (
    <>
      <div className="center w-full">
        <div
          className={`sub-heading-card text-3xl center ${primaryBold.className}`}
        >
          Menu
        </div>
      </div>
      <div className="content center w-full mt-4">
        <div className="content-card center">{children}</div>
      </div>
    </>
  );
}
