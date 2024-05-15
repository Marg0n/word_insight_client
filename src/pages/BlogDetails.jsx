import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";


const BlogDetails = () => {

    const { id } = useParams();
    const { user } = useAuth();
    const [getComments, setGetComments] = useState([]);
    const [blogDetail, setBlogDetail] = useState({});

    // get all blogs data by id
    useEffect(() => {
        axios(`${import.meta.env.VITE_SERVER}/allBlogs/${id}`,{ withCredentials: true })
            .then(data => {
                setBlogDetail(data.data);
                // console.log(data);
            })
    }, [id]);

    const { name,
        email,
        photo, title, category, short_description,
        long_description
    } = blogDetail;

    const [loadUserData, setLoadUserData] = useState([]);

    //get data from server to get user email if it's missing
    useEffect(() => {
        const getData = async () => {
            try {
                if (user?.email) {
                    const response = await axios(`${import.meta.env.VITE_SERVER}/all_Blogs/${user?.email}`,{ withCredentials: true });
                    setLoadUserData(response.data);
                    // console.log('from mail', response.data);
                }
                else {
                    const response = await axios(`${import.meta.env.VITE_SERVER}/allBlog/${user?.displayName}`,{ withCredentials: true });
                    setLoadUserData(response.data);
                    // console.log('from name', data.data);
                }
            }
            catch (err) {
                // console.log(err)
                // toast.error(err.message, { autoClose: 2000, theme: "colored" });
            }
        }

        getData();

    }, [user?.displayName, user?.email]);

    // user info
    const userName = user?.displayName;
    const userEmail = user?.email;
    const userPhoto = user?.photoURL;
    const postID = id;
    const postName = name;
    const postEmail = email;


    //get comments
    useEffect(() => {
        const getData = async () => {
            const response = await axios(`${import.meta.env.VITE_SERVER}/getComments`,{ withCredentials: true })
            setGetComments(response.data);
            // console.log(response.data);
        }

        getData();

    }, [getComments]);



    // comment adder
    const handleSubmit = (e) => {
        e.preventDefault();

        //prevent owner from submitting
        try {
            if (user?.email) {
                if (userEmail === email) return toast.error('Can not comment on own blog!', { autoClose: 2000, theme: "colored" });

                const form = e.target;
                const comments = form.comments.value;

                if (comments == '') return toast.info('At least write a word! 😒', { autoClose: 2000, theme: "colored" });

                const commenter = { userName, userEmail, userPhoto, comments, postID, postName, postEmail };

                //send data to server
                axios.post(`${import.meta.env.VITE_SERVER}/addComment`, commenter)

                    .then(data => {
                        // console.log(data); 
                        if (data.data?.insertedId) {
                            Swal.fire({
                                title: 'Success!',
                                text: 'Comment added! 🎉',
                                icon: 'success',
                                confirmButtonText: 'Cool 😎'
                            }).then(() => {
                                form.reset(); // Reset the form fields
                            });
                        }
                    })
            }
            else {
                if (userName === name) return toast.error('Can not comment on own blog!', { autoClose: 2000, theme: "colored" });

                const form = e.target;
                const comments = form.comments.value;

                if (comments == '') return toast.info('At least write a word! 😒', { autoClose: 2000, theme: "colored" });

                const commenter = { userName, userEmail, userPhoto, comments, postID, postName, postEmail };

                //send data to server
                axios.post(`${import.meta.env.VITE_SERVER}/addComment`, commenter)

                    .then(data => {
                        // console.log(data); 
                        if (data.data?.insertedId) {
                            Swal.fire({
                                title: 'Success!',
                                text: 'Comment added! 🎉',
                                icon: 'success',
                                confirmButtonText: 'Cool 😎'
                            }).then(() => {
                                form.reset(); // Reset the form fields
                            });
                        }
                    })
            }
        }
        catch (err) {
            console.log(err)
            toast.error(err.message, { autoClose: 2000, theme: "colored" });
        }

    }



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
        <>
            <div className="card card-side bg-base-100 shadow-2xl lg:card-side  border-2">

                <Helmet>
                    <title>Word Insight | Blog Details</title>
                </Helmet>

                <figure className="object-contain w-1/2 ">
                    <img
                        className="h-full "
                        src={photo} alt="" />
                </figure>
                <div className="card-body  w-1/2 relative">
                    <h2 className="card-title text-xl font-semibold text-start font-serif">
                        {title}
                    </h2>
                    <p className="text-base">Category :{' '}
                        <span className='font-semibold badge badge-primary'>
                            #{category}
                        </span>
                    </p>

                    <div className="divider my-0 "></div>

                    <p>{short_description}</p>

                    <div className="divider my-0 "></div>

                    <p>{long_description}</p>

                    <div className="divider my-0 "></div>

                    <p className="text-base text-right">Added By : <span className='font-semibold'>
                        {name}
                        {/* long_description display {long_description.length} */}
                    </span></p>
                    {
                        postEmail === loadUserData[0]?.email ? <span className="text-right absolute right-8 top-14">
                            <Link
                                to={`/myBlogs/edit/${id}`}
                                data-tooltip-id="update-tooltip"
                                data-tooltip-content="Edit"
                                className='btn btn-neutral hover:btn-info btn-xl animate__animated  animate__jello animate__infinite'>📝</Link>
                            <Tooltip id="update-tooltip" />
                        </span>
                            : ''
                    }



                </div>
            </div>

            {/* comment */}
            <div className="my-8 w-full">
                <form onSubmit={handleSubmit}>
                    <textarea
                        className="textarea textarea-primary w-full py-4 px-6"
                        name='comments'
                        placeholder="comment here......."></textarea>
                    <div className="w-full pr-2 flex justify-end">
                        <button
                            type="submit"
                            className="btn btn-primary "
                        >
                            Comment
                        </button>
                    </div>
                </form>
            </div>

            {/* get data */}
            <div className="my-8 w-full p-4 border-2">
                <h3 className="text-2xl text-center underline">Comment Section</h3>

                {



                    getComments.filter(com => com.postID === id).map((cmnt, index) => {
                        return <div key={index} className="flex gap-4 space-y-9">
                            <textarea
                                disabled
                                className="textarea textarea-primary py-4 my-4 px-6 w-full font-bold text-lg"
                                name='comments'
                                defaultValue={cmnt?.comments}></textarea>
                            <div className="pr-2 flex flex-col gap-2 justify-center items-center">
                                <p className="text-base font-bold font-serif">{cmnt?.userName}</p>
                                <div className="avatar">
                                    <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={cmnt?.userPhoto} />
                                    </div>
                                </div>
                            </div>
                        </div>

                    })
                }

            </div>
        </>
    );
};

export default BlogDetails;