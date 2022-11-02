import "./index.css";

export default function RootLayout({ children }: { children: any }) {
  return (
    <html>
      <head></head>
      <body className="body">
        <header className="header">
          <div className="title">Hello</div>
        </header>
        <div className="inner-layout">{children}</div>
      </body>
    </html>
  );
}
