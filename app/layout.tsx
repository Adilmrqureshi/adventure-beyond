import { primaryExtraBold } from "../utils/fonts";
import "./index.css";

export default function RootLayout({ children }: { children: any }) {
  return (
    <html>
      <head></head>
      <body className="body">
        <header className="header">
          <div
            className={`w-full h-full center text-3xl ${primaryExtraBold.className}`}
          >
            Adventure beyond
          </div>
        </header>
        <div className="inner-layout">{children}</div>
      </body>
    </html>
  );
}
