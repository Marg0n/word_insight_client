import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
import Loader from "../components/Loader";
import Slider from "../components/Slider";
// import logo from '/wordInsight_logo.jpeg';
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import { AttentionSeeker } from "react-awesome-reveal";



const Home = () => {

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

            <div className="my-16">
                <div className="text-center my-6 space-y-4">
                    <h3 className="text-3xl font-serif text-center">
                        Browse Job Categories
                    </h3>
                    <p className="text-base">Choose you choice from our available categories!</p>
                </div>

            <div className='h-[calc(dvh-380px)] my-4'>
                <Slider />
            </div>
                
            </div>
        </div>
    );
};

export default Home;