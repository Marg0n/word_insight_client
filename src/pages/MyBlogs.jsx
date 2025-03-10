import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { toast } from "react-toastify";
import MyBlogsComponent from "../components/MyBlogsComponent";
import { AttentionSeeker } from "react-awesome-reveal";

const MyBlogs = () => {

    const { user } = useAuth();

    const [items, setItems] = useState([]);
    // const [control, setControl] = useState(false);

    // console.log(user?.email, user?.displayName)


    // DB connection GET
    useEffect(() => {
        const getData = async () => {
            try {
                if (user?.email) {
                    await axios(`${import.meta.env.VITE_SERVER}/all_Blogs/${user?.email}`, { withCredentials: true })
                        .then(data => {
                            // console.log('from mail', data);
                            setItems(data.data);
                        })
                }
                else {
                    await axios(`${import.meta.env.VITE_SERVER}/allBlog/${user?.displayName}`, { withCredentials: true })
                        .then(data => {
                            // console.log('from name', data.data);
                            setItems(data.data);
                        })
                }
            }
            catch (err) {
                // console.log(err)
                toast.error(err.message, { autoClose: 2000, theme: "colored" });
            }
        }

        getData();

    }, [user])

    // update handler
    // const updateHandler = id => {



    //     Swal.fire({
    //         title: "Good job!",
    //         text: "You clicked the button!",
    //         icon: "success"
    //       });
    // }

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
                <title>Word Insight | Wishlist</title>
            </Helmet>

            <AttentionSeeker effect='heartBeat' >
                <h3 className="text-3xl font-serif text-center mb-8">
                    My blogs!
                </h3>
            </AttentionSeeker>


            <div className="overflow-x-auto my-12">
                <table className="table table-zebra border-2 border-base-300">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Short Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    {/* body */}
                    <tbody>
                        {/* row  */}
                        {
                            items.map((blog, index) => {
                                return <MyBlogsComponent key={index} blog={blog}
                                />
                            })
                        }

                    </tbody>

                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Short Description</th>
                            <th>Actions</th>
                        </tr>
                    </tfoot>

                </table>
            </div>
        </div>
    );
};

export default MyBlogs;