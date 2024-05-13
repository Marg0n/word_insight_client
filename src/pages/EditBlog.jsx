import { useEffect, useState } from "react";
import { AttentionSeeker } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";

const EditBlog = () => {

    const { user } = useAuth();
    const writersPhoto = user?.photoURL;

    const { id } = useParams();

    // Navigation
    const navigate = useNavigate();


    const [editBlog, setEditBlog] = useState({});

    //get data to server
    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER}/allblogs/${id}`)
            .then((res) => res.json())
            .then(data => {
                setEditBlog(data);
                // console.log(data);
            })
    }, [id]);

    const {
        // _id, 
        photo, name, email, title, category, short_description, long_description
    } = editBlog;

    // console.log(tourSpot);

    // update tour spot
    const handleUpdate = async e => {
        e.preventDefault();

        const form = e.target;
        //getting value
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const title = form.title.value;
        const category = form.category.value;
        const short_description = form.short_description.value;
        const long_description = form.long_description.value;

        const updateBlog = { name, email, writersPhoto, photo, title, category, short_description, long_description };

        // console.log(updateBlog)

        try {
            const {data} = await axios.put(`${import.meta.env.VITE_SERVER}/update/${id}`, updateBlog)
                // .then(res => res.json())
                // .then(data => {
                    // console.log(data); 
                    if (data?.modifiedCount > 0) {
                        Swal.fire({
                            title: 'Successfully Updated!',
                            text: 'Updated the Blog! 🎉',
                            icon: 'success',
                            confirmButtonText: 'Cool'
                        }).then(() => {
                            navigate('/myBlogs'); // navigate
                        });
                    }else {
                        toast.warning('Something went Wrong!',{ autoClose: 2000, theme: "colored" })
                    }
                // })
        }
        catch (err) {
            toast.error(err.message,{ autoClose: 2000, theme: "colored" })
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
        <div className="my-12 mx-44 min-h-[calc(100dvh-200px)] p-12 rounded-3xl border-primary border-2 shadow-2xl">
            <Helmet>
                <title>Word Insight | Edit Blog</title>
            </Helmet>

            <AttentionSeeker effect='flash' >
                <div className="mb-10 text-center">
                    <h3 className="text-3xl text-info font-sans font-bold underline-offset-2 underline">Add A Blog</h3>
                </div>
            </AttentionSeeker>

            <form onSubmit={handleUpdate}>
                <div className="grid lg:grid-cols-2 grid-cols-1 justify-center items-center gap-12 font-serif">
                    <label className="input input-bordered flex items-center gap-2">
                        Image URL
                        <input type="text" className="grow  text-primary" name="photo" placeholder="https://pthoto.com/600" defaultValue={photo} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        Blog Title
                        <input type="text" className="grow  text-primary" name="title" placeholder="Cox's Bazar" defaultValue={title} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        User Name
                        <input type="text" className="grow  text-primary" placeholder="Tony Stark" name="name" defaultValue={user?.displayName || name} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        User Email
                        <input type="email" className="grow text-primary" placeholder="email@site.com" name="email" defaultValue={user?.email || email} required />
                    </label>

                    <label className="form-control w-full ">
                        <select className="select select-bordered" name="category" defaultValue={category}>
                        <option value="Beauty">Beauty</option>
                            <option value="Food">Food</option>
                            <option value="Game">Game</option>
                            <option value="Politics">Politics</option>
                            <option value="Research">Research</option>
                            <option value="Tour">Tour</option>
                            <option value="Technology">Technology</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>


                    <label className="form-control lg:col-span-2 col-span-1">
                        <div className="label">
                            <span className="label-text">Short Description</span>
                        </div>
                        <textarea className="textarea textarea-bordered h-24  text-primary" name="short_description"
                            placeholder="Longest sea beach of the world!"
                            defaultValue={short_description}></textarea>
                    </label>

                    <label className="form-control lg:col-span-2 col-span-1">
                        <div className="label">
                            <span className="label-text">Long Description</span>
                        </div>
                        <textarea className="textarea textarea-bordered h-24  text-primary" name="long_description"
                            placeholder="Longest sea beach of the world! It was really cool! I love how the people..."
                            defaultValue={long_description}></textarea>
                    </label>
                </div>

                <input className="btn btn-secondary mt-6 w-full" type="submit" value="Update" />
            </form>
        </div>
    );
};

export default EditBlog;