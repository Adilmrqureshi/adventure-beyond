import "./menu.css";

export default function MenuLayout({ children }: { children: any }) {
  return (
    <>
      <div className="sub-heading">
        <div className="sub-heading-card font-main">Heading</div>
      </div>
      <div className="content">
        <div className="content-card">{children}</div>
      </div>
    </>
  );
}
