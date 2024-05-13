// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
import { PropTypes } from 'prop-types';
// import SlideComponents from './SlideComponents';
import { Link } from 'react-router-dom';



const Slider = ({ allBlogs }) => {
    // const Slider = ({ showSliders }) => {

    // Sort blogs by the length of long_description in descending order
    const sortedBlogs = [...allBlogs].sort((a, b) => b.long_description.length - a.long_description.length);

    // Select the first 10 blogs
    const last10Blogs = sortedBlogs.slice(-10);

    return (
        <>

            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                pagination={{
                    dynamicBullets: true,
                    clickable: true,
                }}
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[FreeMode, Autoplay, Pagination, Navigation]}
                loop={true}
                className="mySwiper"
            >

                {
                    last10Blogs.map(blog => {

                        return <SwiperSlide
                            key={blog._id}
                            style={{
                                'position': 'relative',

                            }}
                        >
                            <img className='h-96 w-full' src={blog.photo} alt="" />
                            <div className='absolute bottom-4 right-4 p-6 text-info font-serif text-right'>
                                <div className="text-3xl font-bold">
                                    {blog?.title}
                                </div>
                                <div className="text-xl font-semibold">
                                    {blog?.name}
                                </div>
                                <div className="text-base font-semibold" >
                                    <Link to={`/allBlogs/${blog?._id}`} className='btn border-none bg-error text-base-300 hover:bg-blue-500 hover:text-white animate-pulse btn-xs'>View Blog</Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    })
                }


                {/* <SwiperSlide  >
                    <SlideComponents 
                    image='https://i.ibb.co/vPx6XgP/Chicken-Curry.jpg'
                    text='Get your Web Development projects done skillfully!'/>
                </SwiperSlide>
                <SwiperSlide  >
                    <SlideComponents 
                    image='https://i.ibb.co/vPx6XgP/Chicken-Curry.jpg'
                    text='Get your Graphics Design projects done skillfully!'/>
                </SwiperSlide>
                <SwiperSlide  >
                    <SlideComponents 
                    image='https://i.ibb.co/vPx6XgP/Chicken-Curry.jpg'
                    text='Get your Digital marketing up and running!'/>
                </SwiperSlide>
                <SwiperSlide  >
                    <SlideComponents 
                    image='https://i.ibb.co/vPx6XgP/Chicken-Curry.jpg'
                    text='Get your Digital marketing up and running!'/>
                </SwiperSlide>
                <SwiperSlide  >
                    <SlideComponents 
                    image='https://i.ibb.co/vPx6XgP/Chicken-Curry.jpg'
                    text='Get your Digital marketing up and running!'/>
                </SwiperSlide> */}


            </Swiper>

        </>
    );
};

Slider.propTypes = {
    allBlogs: PropTypes.array,
}

export default Slider;