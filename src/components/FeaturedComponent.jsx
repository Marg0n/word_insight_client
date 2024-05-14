import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import 'animate.css';
import 'react-tooltip/dist/react-tooltip.css';

const FeaturedComponent = ({ blog, index }) => {

    const { _id,
        name,
        // email, photo, category, short_description, 
        title, writersPhoto
        // long_description
    } = blog;

    return (
        <tr>

            <td>
                {index}
            </td>

            <td>{title}</td>

            <td>
                {name}
                {/* <br /> */}
                {/* <span className="badge badge-secondary badge-bg">
                        {name}
                    </span> */}
            </td>

            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={writersPhoto || 'https://i.ibb.co/kgKXrNv/no-images.jpg'} />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{ }</div>
                        <div className="text-sm opacity-50">{ }</div>
                    </div>
                </div>
            </td>

            <td className=''>

                <Link to={`/allBlogs/${_id}`} className='btn bg-error text-base-300 hover:bg-blue-500 hover:text-white animate-pulse btn-xs'>View Blog</Link>


            </td>
        </tr>
    );
};

FeaturedComponent.propTypes = {
    blog: PropTypes.object,
    index: PropTypes.number,
}

export default FeaturedComponent;