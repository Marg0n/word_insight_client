import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";


const BlogDetails = () => {

    const { id } = useParams();
    const { user } = useAuth();
    const [getComments, setGetComments] = useState([]);
    const [blogDetail, setBlogDetail] = useState({});

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER}/allBlogs/${id}`)
            .then((res) => res.json())
            .then(data => {
                setBlogDetail(data);
                // console.log(data);
            })
    }, [id]);

    const { name,
        // email,
        photo, title, category, short_description,
        long_description
    } = blogDetail;

    // useEffect(() => {
    //     const singleBook = book.find(item => item.bookId == id);
    //     // console.log(singleBook);
    //     setBookDetails(singleBook);
    // }, [book, id]);

    // user info
    const userName = user?.displayName;
    const userEmail = user?.email;
    const userPhoto = user?.photoURL;
    const postID = id;


    //get comments
    useEffect(() => {
        axios(`${import.meta.env.VITE_SERVER}/getComments`)

            .then(data => {
                setGetComments(data.data);
                // console.log(data);
            })
    }, [getComments]);

    // Filter comments based on postID
    const filteredComments = getComments.filter(com => com.postID === id);


    // console.log('comments', getComments)

    // comment adder
    const handleSubmit = (e) => {
        e.preventDefault();
        if(userName === user?.displayName) return toast.error('Can not comment on own blog!', { autoClose: 2000, theme: "colored" });
        const form = e.target;
        const comments = form.comments.value;

        const commenter = { userName, userEmail, userPhoto, comments, postID };

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
                <div className="card-body  w-1/2">
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


                </div>
            </div>

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



                    filteredComments.map((cmnt, index) => {
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