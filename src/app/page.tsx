import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import Header from "@/components/ui/Header";
import Hero01 from "@/components/ui/Hero01";
import Footer from "@/components/ui/Footer";

const HomePage = async () => {
  const appname = process.env.APP_NAME;
  const session = await getServerSession(options);

  return (
    <>
      <Header />
      <Hero01 />
      <Footer />
    </>
  );
};

export default HomePage;
