import Header from "./_components/landingpage/header";
import Hero from "./_components/landingpage/hero";
import Services from "./_components/landingpage/services";
import Technology from "./_components/landingpage/coretech";
import Footer from "./_components/landingpage/footer";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 min-h-screen font-sans main-width mx-auto my-6">
     {/* Header */}
     <Header/>
     {/* Hero */}
     <Hero/>
     {/* Services */}
     <Services/>
     {/* Technology */}
     <Technology/>
     {/* Footer */}
     <Footer/>
    </div>
  );
}
