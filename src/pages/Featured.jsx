import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import FeaturedComponent from "../components/FeaturedComponent";

const Featured = () => {

    
    const allBlogs = useLoaderData();


    // Sort blogs by the length of long_description in descending order
    const sortedBlogs = [...allBlogs].sort((a, b) => b.long_description.length - a.long_description.length);

    // Sort blogs by the length of long_description in ascending order
    // const sortedBlogs = [...allBlogs].sort((a, b) => a.long_description.length - b.long_description.length);

    // Select the first 10 blogs
    const last10Blogs = sortedBlogs.slice( -10);
    // const last10Blogs = sortedBlogs.slice(0, 10);


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
        <div>
            <Helmet>
                <title>Word Insight | Featured</title>
            </Helmet>

            <h3 className="text-center font-bold text-3xl font-serif">
                Our top 10 Featured Blogs
            </h3>

            <div className="overflow-x-auto my-12">
                <table className="table table-zebra border-2 border-base-300">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Serial Number</th>
                            <th>Blog Title</th>
                            <th>Writer</th>
                            <th>Writer Picture</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    {/* body */}
                    <tbody>
                        {/* row  */}
                        {
                            last10Blogs.map((blog, index) => {
                                return <FeaturedComponent key={index} blog={blog}
                                index={index+1}/>
                            })
                        }

                    </tbody>

                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th>Serial Number</th>
                            <th>Blog Title</th>
                            <th>Writer</th>
                            <th>Writer Picture</th>
                            <th>Actions</th>
                        </tr>
                    </tfoot>

                </table>
            </div>
        </div>
    );
};

export default Featured;