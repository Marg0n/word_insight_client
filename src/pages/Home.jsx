import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
import Loader from "../components/Loader";
import Slider from "../components/Slider";
// import logo from '/wordInsight_logo.jpeg';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { AttentionSeeker } from "react-awesome-reveal";
import Hero from "../components/Hero";
import Newsletter from "../components/Newsletter";
import RecentBlogs from "../components/RecentBlogs";
import { useLoaderData } from "react-router-dom";
import Compliments from "../components/Compliments";



const Home = () => {

    const allBlogs = useLoaderData();

    // loader
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const [typeEffect] = useTypewriter({
        words: ['Some Awesome Story!', 'About Your New Work!', 'About New Discoveries!', 'Whatever you think!'],
        loop: {},
        typeSpeed: 100,
        deleteSpeed: 40,
    })

    if (loading) {
        return <Loader />
    }

    return (
        <div className="my-4">
            <Helmet>
                <title>Word Insight | Home</title>
            </Helmet>

            <AttentionSeeker effect='flash' >
                <h1 className='text-3xl font-bold text-center my-10 uppercase'>
                    You can find, read or write{' '}
                    <span className='text-rose-500'>{typeEffect}</span>

                    <span className=''>
                        <Cursor cursorStyle='🖋️' cursorBlinking={false} />
                    </span>

                </h1>
            </AttentionSeeker>

            {/* banner */}
            <div className="my-16">
                <Hero />
            </div>

            {/* recent 6 blogs */}
            <div className="my-16">
                <div className="text-center my-6 space-y-4">
                    <h3 className="text-3xl font-serif text-center">
                        Check out some of the Recent Blogs!
                    </h3>
                </div>

                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 my-12 px-4">
                    {
                        allBlogs.slice(-6).reverse().map((Blog, index) => {
                            return <RecentBlogs key={index} Blog={Blog} />
                        })
                    }
                </div>

            </div>

            {/* newsletter */}
            <div className="my-16">
                <div className="text-center my-6 space-y-4">
                    <h3 className="text-3xl font-serif text-center">
                        Subscribe for updates!
                    </h3>
                </div>

                <Newsletter />
            </div>

            {/* slider */}
            <div className="my-16">
                <div className="text-center my-6 space-y-4">
                    <h3 className="text-3xl font-serif text-center">
                        Have a look at our Featured Categories!
                    </h3>
                    <p className="text-base">Take a look at some of our recommended featured Blogs!</p>
                </div>

                <div className='h-[calc(dvh-380px)] my-4'>
                    <Slider allBlogs={allBlogs} />
                </div>

            </div>


            {/* what to expect */}
            <div className="my-16">
                <div className="text-center my-6 space-y-4">
                    <h3 className="text-3xl font-serif text-center mb-8">
                        People ❤️ Word Insight!
                    </h3>

                    <Compliments />
                </div>
            </div>
        </div>
    );
};

export default Home;