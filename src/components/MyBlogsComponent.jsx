import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import 'animate.css';
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';

const MyBlogsComponent = ({ blog }) => {


    const { _id, 
        // name, email,
        photo, title, category, short_description,
        // long_description
    } = blog;

    return (
        
            <tr>

                <td>
                    <div className="flex items-center gap-3">
                        <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                                <img src={photo} />
                            </div>
                        </div>
                        <div>
                            <div className="font-bold">{}</div>
                            <div className="text-sm opacity-50">{}</div>
                        </div>
                    </div>
                </td>
                <td>{title}</td>
                <td>
                     {} 
                    {/* <br /> */}
                    <span className="badge badge-secondary badge-bg">
                        {category}
                    </span>
                </td>
                <td>{short_description}</td>
                <td className='flex items-center gap-4 justify-center'>

                    <Link to={`/allBlogs/${_id}`} className='btn bg-error text-base-300 hover:bg-blue-500 hover:text-white animate-pulse btn-xs'>View Details</Link>
                    
                    <Link
                        to={`/myBlogs/edit/${_id}`}
                        data-tooltip-id="update-tooltip"
                        data-tooltip-content="Edit"
                        className='btn btn-neutral hover:btn-info btn-xs animate__animated  animate__jello animate__infinite'>📝</Link>
                    <Tooltip id="update-tooltip" />
                </td>
            </tr>
        
    );
};

MyBlogsComponent.propTypes = {
    blog: PropTypes.object,
    handleDelete: PropTypes.func,
}

export default MyBlogsComponent;