import { AttentionSeeker } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";
import Swal from 'sweetalert2';
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const AddBlog = () => {

    const { user } = useAuth();
    const writersPhoto = user?.photoURL;
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
                toast.error(err.message, { autoClose: 2000, theme: "colored" });
            }
        }

        getData();
        
    }, [user?.displayName, user?.email]);

    // console.log(loadUserData, loadUserData[0]?.email)

    const handleAdd = e => {
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

        const newBlog = { name, email, writersPhoto, photo, title, category, short_description, long_description };

        // console.log(newBlog)

        //send data to server
        fetch(`${import.meta.env.VITE_SERVER}/addBlog`, {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(newBlog),
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data); 
                if (data?.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Added a new Blog! 🎉',
                        icon: 'success',
                        confirmButtonText: 'Cool 😎'
                    }).then(() => {
                        form.reset(); // Reset the form fields
                    });
                }
            })
    }

    return (
        <div className="my-12 mx-44 min-h-[calc(100dvh-200px)] p-12 rounded-3xl border-primary border-2 shadow-2xl">
            <Helmet>
                <title>Word Insight | Add Blog</title>
            </Helmet>

            <AttentionSeeker effect='flash' >
                <div className="mb-10 text-center">
                    <h3 className="text-3xl text-info font-sans font-bold underline-offset-2 underline">Add A Blog</h3>
                </div>
            </AttentionSeeker>

            <form onSubmit={handleAdd}>
                <div className="grid lg:grid-cols-2 grid-cols-1 justify-center items-center gap-10 font-serif">

                    <label className="input input-bordered flex items-center gap-2">
                        Image URL
                        <input type="text" className="grow  text-primary" name="photo" placeholder="https://pthoto.com/600" />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        Blog Title
                        <input type="text" className="grow  text-primary" name="title" placeholder="Cox's Bazar Tour" />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        User Name
                        <input type="text" className="grow  text-primary" placeholder="Tony Stark" name="name" defaultValue={user?.displayName || ""} required />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        User Email
                        <input type="email" className="grow text-primary" placeholder="email@site.com" name="email" defaultValue={user?.email || loadUserData[0]?.email} required />
                    </label>

                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Pick the best matching Category</span>
                        </div>
                        <select className="select select-bordered" name="category">
                            <option disabled selected value="Other">Category Select (Default category as Other)</option>
                            <option value="Beauty">Beauty</option>
                            <option value="Food">Food</option>
                            <option value="Game">Game</option>
                            <option value="Politics">Politics</option>
                            <option value="Research">Research</option>
                            <option value="Tour">Tour / Travel</option>
                            <option value="Technology">Technology</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>


                    <label className="form-control lg:col-span-2 col-span-1">
                        <div className="label">
                            <span className="label-text">Short Description</span>
                        </div>
                        <textarea className="textarea textarea-bordered h-24  text-primary" name="short_description"
                            placeholder="Longest sea beach of the world!"></textarea>
                    </label>

                    <label className="form-control lg:col-span-2 col-span-1">
                        <div className="label">
                            <span className="label-text">Long Description</span>
                        </div>
                        <textarea className="textarea textarea-bordered h-24  text-primary" name="long_description"
                            placeholder="Longest sea beach of the world! It was really cool! I love how the people..."></textarea>
                    </label>
                </div>

                <input className="btn btn-secondary mt-6 w-full" type="submit" value="Add" />
            </form>
        </div>
    );
};

export default AddBlog;