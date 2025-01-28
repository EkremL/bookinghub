import "@/assets/styles/globals.css";

export const metadata = {
  title: "Booking Hub",
  keywords: "booking, real estate, property, rental",
  description: "The best booking app on the internet",
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
