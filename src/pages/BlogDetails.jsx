import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";


const BlogDetails = () => {

    const { id } = useParams();

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
    );
};

export default BlogDetails;