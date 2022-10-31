import "./index.css";

export default function RootLayout({ children }: { children: any }) {
  return (
    <html>
      <head></head>
      <body className="body">
        <header className="header">
          <div className="title">Hello</div>
        </header>
        <div className="inner-layout">
          <div className="sub-heading">
            <div className="sub-heading-inner font-main">Heading</div>
          </div>
          <div className="content">{children}</div>
        </div>
      </body>
    </html>
  );
}
