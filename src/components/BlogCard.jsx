
import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { GoBookmark, GoBookmarkFill } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';
import Loader from './Loader';

const BlogCard = ({ Blog }) => {

    const { user } = useAuth();
    const [toggleBookmark, setToggleBookmark] = useState(false);
    // const [wishDetail, setWishDetail] = useState({});

    // console.log(wishDetail)

    const { _id, name,
        // email,
        photo, title, category, short_description,
        long_description
    } = Blog;

    
    const firebaseMail = user?.email;
    const firebaseName =  user?.displayName;

    const userMail = firebaseMail;
    const userName =  firebaseName;
    const blogId =  _id;
    const wish = {
        name, photo, title, category, short_description,
        long_description, toggleBookmark, 
        userMail, userName,blogId
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (firebaseMail) {
                    const response = await fetch(`${import.meta.env.VITE_SERVER}/allWishlists/${firebaseMail}`);
                    const data = await response.json();
                    // setWishDetail(data);
                    // Check if the blog is present in the user's wishlist
                    setToggleBookmark(data.some(item => item.blogId === blogId)); 
                } else {
                    const response = await fetch(`${import.meta.env.VITE_SERVER}/allWishlist/${firebaseName}`);
                    const data = await response.json();
                    // setWishDetail(data);
                    // Check if the blog is present in the user's wishlist
                    setToggleBookmark(data.some(item => item.blogId === blogId)); 
                }
            } catch (error) {
                console.error('Error fetching wishlist data:', error);
            }
        };
    
        fetchData();
    }, [firebaseMail, firebaseName, _id, blogId]);
    
    // Function to toggle bookmark
    const bookmark = () => {

        // const userID =  user?.uid;


        if (!toggleBookmark) {

            //send data to server
            fetch(`${import.meta.env.VITE_SERVER}/addWishlist`, {
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(wish),
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data); 
                    if (data?.insertedId) {
                        toast.success(`Added to Wish List! ✌️`, { autoClose: 2000, theme: "colored" })

                        setToggleBookmark(true);
                        // console.log('add id', wish)
                    }
                })

            // console.log('add id', wish)
        }
        else{
            toast.error(`Already in Wish List! 😨`, { autoClose: 2000, theme: "colored" });
        }

        // if (toggleBookmark) {

            
            // const wish = {
            //     _id, name, email, photo, title, category, short_description,
            //     long_description, toggleBookmark
            // }

            // //delete
            // fetch(`${import.meta.env.VITE_SERVER}/deleteWishlist/${_id}`, {
            //     method: 'DELETE',
            // })
            //     .then(res => res.json())
            //     .then(data => {
            //         // console.log(data);
            //         if (data.deletedCount > 0) {
                        
            //             toast.error(`Removed from Wish List! 😨`, { autoClose: 2000, theme: "colored" })

            //             setToggleBookmark(false);
            //             console.log('rmv id', wish)
            //         }

            //     })

            // console.log('rmv id', wish)
        // }

    };

    // loader
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loader />
    }



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

                    <div className=" w-full space-y-2 relative">
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
                        <div className='absolute right-0 top-0' onClick={bookmark}>
                            {
                                !toggleBookmark ? <button><GoBookmark size={25} /></button>
                                    : <button><GoBookmarkFill size={25} /></button>
                            }
                            {
                                // !toggleBookmark ? <button><GoBookmark size={25} /></button>
                                // !toggleBookmark && (wishDetail.userMail !== firebaseMail ||  wishDetail.userName !== firebaseName) ? <button><GoBookmarkFill size={25} /></button> : <button><GoBookmark size={25} /></button>
                            }
                        </div>
                    </div>

                    <div className="divider my-0 divider-info"></div>

                    <div className="w-full flex justify-between h-36">
                        <p className='text-base'>{short_description}</p>
                    </div>
                </div>

                <Link to={`/allBlogs/${_id}`} className='btn m-4 bg-secondary text-base-300 hover:bg-info hover:text-white animate-pulse hover:animate-none'>View Details</Link>
            </div>

        </div>
    );
};

BlogCard.propTypes = {
    Blog: PropTypes.object,
}


export default BlogCard;