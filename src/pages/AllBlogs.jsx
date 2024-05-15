import { Helmet } from "react-helmet-async";
// import { useLoaderData } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import { AttentionSeeker } from "react-awesome-reveal";
import { FcSearch } from "react-icons/fc";
import { useEffect, useState } from "react";
import axios from "axios";

const AllBlogs = () => {

    // const allBlogs = useLoaderData();
    const [allBlogs, setAllBlogs] = useState([]);
    const [filter, setFilter] = useState('');
    const [search, setSearch] = useState('');
    const [searchField, setSearchField] = useState();


    //fetch data
    useEffect(() => {
        const getData = async () => {
            const { data } = await axios(`${import.meta.env.VITE_SERVER}/all_Blogs?filter=${filter}&search=${search}`)
            // console.log(data, 'axios')
            setAllBlogs(data)
        }
        getData();
    }, [filter, search]);

    const handleSearch = (e) => {
        e.preventDefault();

        // const text = e.target.search.value;
        setSearch(searchField)
    };

    const handleReset = () => {
        setSearch('');
        setFilter('');
        setSearchField('');
    }

    return (
        <div>
            <Helmet>
                <title>Word Insight | All Blogs</title>
            </Helmet>

            <AttentionSeeker effect='heartBeat' >

                <h3 className="text-3xl  font-serif font-bold text-center underline">View All The Blogs!</h3>
            </AttentionSeeker>

            <form
                onSubmit={handleSearch}
                className="text-3xl  font-serif font-bold items-center justify-center my-4 flex gap-4">
                <div>
                    <select
                        className="select select-success w-full max-w-xs"
                        name="select"
                        onChange={e => setFilter(e.target.value)}
                        value={filter}
                    >
                        <option value="" selected>All Category</option>
                        <option value="Beauty">Beauty</option>
                        <option value="Food">Food</option>
                        <option value="Game">Game</option>
                        <option value="Politics">Politics</option>
                        <option value="Research">Research</option>
                        <option value="Tour">Tour / Travel</option>
                        <option value="Technology">Technology</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label className="input input-bordered border-success focus:border-success flex items-center gap-2">
                        <input
                            name="search"
                            type="text"
                            onChange={e => setSearchField(e.target.value)}
                            value={searchField}
                            className="grow" placeholder="Search by Title" />
                        <button
                            type="submit"
                            className="hover:scale-150" ><FcSearch size={25} /></button>
                    </label>
                </div>

                <div>
                    <button 
                    onClick={handleReset}
                    className="btn btn-success">Reset</button>
                </div>
            </form>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 my-12 px-4">
                {
                    allBlogs?.map((Blog, index) => {
                        return <BlogCard key={index} Blog={Blog} />
                    })
                }
            </div>

        </div>
    );
};

export default AllBlogs;