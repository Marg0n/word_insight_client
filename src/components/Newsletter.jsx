import { toast } from "react-toastify";


const Newsletter = () => {

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        {
            email == '' || email == undefined ? toast.warning('Enter a valid Email!!', { autoClose: 5000, theme: "colored" }) : toast.success('Thank you for subscribing!', { autoClose: 5000, theme: "colored" })
        }

    }

    return (
        <div>
            <div className="w-full bg-gray-500" style={{ backgroundImage: 'url(https://source.unsplash.com/random/640x480)', backgroundPosition: 'center center', backgroundBlendMode: 'multiply', backgroundSize: 'cover' }}>

                <div className="container flex flex-col flex-wrap content-center justify-center p-4 py-20 mx-auto md:p-10">

                    <h1 className="text-5xl antialiased font-semibold leading-none text-center text-gray-300">Get Our Updates</h1>

                    <p className="pt-2 pb-8 text-xl antialiased text-center text-gray-300">Find out about events and other news</p>

                    <form className="flex flex-row" onSubmit={handleSubmit}>
                        <input type="email" name="email" placeholder="tony@email.com" className="w-3/5 p-3 rounded-l-xl sm:w-2/3 " />

                        <button
                            type="submit"
                            className="btn w-2/5 p-3 font-semibold rounded-l-none sm:w-1/3 bg-blue-500 hover:bg-success hover:text-base-300 text-gray-50 border-none">
                            Subscribe!
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;