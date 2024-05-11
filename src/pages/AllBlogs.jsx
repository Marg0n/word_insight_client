import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import BlogCard from "../components/BlogCard";

const AllBlogs = () => {

    const allBlogs = useLoaderData();

    return (
        <div>
            <Helmet>
                <title>Word Insight | All Blogs</title>
            </Helmet>

            <h3 className="text-3xl  font-serif font-bold text-center underline">View All The Blogs!</h3>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 my-12">
                {
                    allBlogs.map((Blog, index) => {
                        return <BlogCard key={index} Blog={Blog}/>
                    })
                }
            </div>
            
        </div>
    );
};

export default AllBlogs;