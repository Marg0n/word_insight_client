import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import WishlistCard from "../components/WishlistCard";
import axios from "axios";

const Wishlist = () => {

    const { user } = useAuth();

    const [items, setItems] = useState([]);
    const [control, setControl] = useState(false);

    // console.log(user?.email, user?.displayName)


    // DB connection GET
    useEffect(() => {
        const getData = async () => {
            try {
                if (user?.displayName ) {
                    await axios(`${import.meta.env.VITE_SERVER}/allWishlist/${user?.displayName}`)
                        .then(data => {
                            // console.log('from name', data.data);
                            setItems(data.data);
                        })
                }
                else {
                    await axios(`${import.meta.env.VITE_SERVER}/allWishlists/${user?.email}`)
                        .then(data => {
                            // console.log('from mail', data);
                            setItems(data.data);
                        })
                }
            }
            catch (err) {
                console.log(err)
            }
        }

        getData();

    }, [user, control])

    //delete items
    const handleDelete = (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this! 😱",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!😉",
            cancelButtonText: "No, cancel! 😨",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                //delete
                fetch(`${import.meta.env.VITE_SERVER}/deleteWishlist/${id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        if (data.deletedCount > 0) {
                            swalWithBootstrapButtons.fire({
                                title: "Deleted!",
                                text: "Tourist Spot has been deleted! 🥲",
                                icon: "success"
                            });
                            //reset the page using useEffect
                            setControl(!control);
                        }

                    })
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Delete Cancelled!",
                    text: "Tourist Spot is still there! ✌️",
                    icon: "error"
                });
            }
        });


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
        <div>
            <Helmet>
                <title>Word Insight | Wishlist</title>
            </Helmet>


            <div className="overflow-x-auto my-12">
                <table className="table">
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
                                return <WishlistCard key={index} blog={blog}
                                    handleDelete={handleDelete} />
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

export default Wishlist;