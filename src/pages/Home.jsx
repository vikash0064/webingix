import Hero from '../components/Hero';
import Technologies from '../components/Technologies';
import WeBuildBetter from '../components/WeBuildBetter';
import Services from '../components/Services';
import Process from '../components/Process';
import Contact from '../components/Contact';

const Home = () => {
    return (
        <div className="space-y-0">
            <Hero />
            <Technologies />
            <WeBuildBetter />
            <div className="hidden md:block">
                <Services />
            </div>
            <div className="hidden md:block">
                <Process />
            </div>
            <Contact />
        </div>
    );
};

export default Home;
