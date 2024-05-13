import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const Hero = () => {

    const {user} = useAuth();

    return (
        <div className="hero min-h-screen text-base-content" style={{ backgroundImage: 'url(https://i.ibb.co/G2xCfZf/interior-design-mountain-view.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md lg:max-w-[calc(100vw-580px)]">
                    <h1 className="mb-5 text-5xl font-bold">Write a Blog Now!</h1>
                    <p className="mb-5">Write whatever you desire to write! Write about your Food review, journey, preferred game, recommendation to your thoughts! It is complete freedom of sharing your thoughts!</p>
                    {
                        !user ? <Link to='/login' className="btn btn-primary">Get Started by Login!</Link>
                        : <Link to='/addBlog' className="btn btn-primary">Write a Blog Now!</Link>
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default Hero;