
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

const BlogCard = ({Blog}) => {

    const { _id, name, email, photo, title, category, short_description, long_description } = Blog;

    return (
        <div

            className="relative border-2 rounded-xl cursor-pointer hover:border-opacity-50 border-opacity-20 hover:scale-105 overflow-hidden hover:border-blue-700"
        >

            <div className="card shadow-2xl min-h-[80vh] ">
                <figure className="mx-8 mt-8 p-6 rounded-xl bg-gray-200">
                    <img
                        src={photo}
                        alt="Estate image"
                        className="rounded-xl h-56 w-full"
                    />
                </figure>
                <div className="card-body items-center text-start ">
                    
                    <div className="h-28 w-full space-y-2 my-2">
                        <h2 className="text-xl font-semibold text-start font-serif">{title}</h2>
                        <p className="text-base">Category : <span className='font-semibold'> {category}</span></p>
                        {/* <p className="text-base">Location : <span className='font-semibold'> {location}</span></p> */}
                        {/* <p className="text-base">Best time to tour : <span className='font-semibold'> {season} Season</span></p> */}
                    </div>

                    <div className="divider"></div>

                    {/* <div className="w-full flex justify-between">
                        <small className="flex gap-2 items-center">
                            <TfiRulerPencil className='fill-pink-700' />
                            Yearly Visitors {visitor}
                        </small>
                        <small className="flex gap-2 items-center">
                            <GiTakeMyMoney size='18' className='fill-green-700' /> 
                            Avg. budget {cost} TK
                        </small>
                    </div> */}
                </div>
                <Link to={`/allBlogs/${_id}`} className='btn m-4 bg-secondary hover:bg-blue-500 hover:text-white animate-pulse'>View Details</Link>
            </div>
            
        </div>
    );
};

BlogCard.propTypes = {
    Blog: PropTypes.object,
}


export default BlogCard;