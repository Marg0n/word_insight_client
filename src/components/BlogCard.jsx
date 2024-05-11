
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

const BlogCard = ({ Blog }) => {

    const { _id, name, 
        // email, 
        photo, title, category, short_description, 
        // long_description 
    } = Blog;

    return (
        <div

            className="relative border-2 border-error rounded-2xl cursor-pointer hover:border-opacity-50 border-opacity-20 hover:scale-105 overflow-hidden hover:border-info"
        >

            <div className="card shadow-2xl min-h-[80vh] ">
                <figure className="">
                    <img
                        src={photo}
                        alt="Estate image"
                        className="group-hover:scale-105 h-56 w-full"
                    />
                </figure>
                <div className="card-body items-center text-start ">

                    <div className=" w-full space-y-2">
                        <h2 className="text-xl font-semibold text-start font-serif">
                            {title}
                        </h2>
                        <p className="text-base">Category :{' '}
                            <span className='font-semibold badge badge-primary'>
                                #{category}
                            </span>
                        </p>
                        <p className="text-base">Writer :{' '}
                            <span className='font-semibold '>
                                {name}
                            </span>
                        </p>
                    </div>

                    <div className="divider my-0 divider-info"></div>

                    <div className="w-full flex justify-between h-36">
                        <p className='text-base'>{short_description}</p>
                    </div>
                </div>
                <Link to={`/allBlogs/${_id}`} className='btn m-4 bg-secondary hover:bg-info hover:text-white animate-pulse hover:animate-none'>View Details</Link>
            </div>

        </div>
    );
};

BlogCard.propTypes = {
    Blog: PropTypes.object,
}


export default BlogCard;