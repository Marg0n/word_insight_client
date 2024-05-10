// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
// import { PropTypes } from 'prop-types';
import SlideComponents from './SlideComponents';



const Slider = () => {
    // const Slider = ({ showSliders }) => {


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
                slidesPerView={3}
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

                {/* {
                    showSliders.map(showSlider => {
                        
                        return <SwiperSlide
                            key={showSlider._idx}
                            style={{
                                'position': 'relative',

                            }}
                        >
                           <img className='h-96 w-full' src={showSlider.photo} alt="" />
                            <div className='absolute bottom-4 right-4 p-6 text-primary font-serif text-right'>
                                <div className="text-3xl font-bold">
                                    {showSlider.country}
                                </div>
                                <div className="text-xl font-semibold">
                                    {showSlider.spotName}
                                </div>
                                <div className="text-base font-semibold" >
                                    <p>
                                        {showSlider.description}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    })
                } */}
                <SwiperSlide  >
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
                </SwiperSlide>


            </Swiper>

        </>
    );
};

// Slider.propTypes = {
//     showSliders: PropTypes.array,
// }

export default Slider;