import { useNavigate } from "react-router-dom";
import dialogs, { showSuccessDialog } from "../ui/dialogs";
import { useForm } from "react-hook-form";
import patterns from "../validation/patterns";
import { CardData } from "../@types/cardsData";
import axios from "axios";
import { useAuth } from "../context/AuthContext";


const CreateCard = () => {
    const { token } = useAuth(); // Get the token from the context
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<CardData>();

    const onSubmit = async (data: CardData) => {
        if (!token) {
            dialogs.error("Error", "No authentication token found.");
            return;
        }

        try {
            await axios.post('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards', data, {
                headers: { 'x-auth-token': token }
            });
            dialogs.success("Success", "Card Created Successfully").then(() => {
                navigate("/my-cards");
            });
        } catch (error) {
            dialogs.error("Error", error.response.data);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 dark:text-white">
            <div className="max-w-md w-full bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-black dark:text-white">Create a new card</h2>
                <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* title */}
                    <section>
                        <input
                            type="text"
                            placeholder="Title"
                            {...register("title", {
                                required: "This field is mandatory",
                                minLength: { value: 2, message: "Too short" },
                                maxLength: { value: 255, message: "Too long" },
                            })}
                            className="w-full p-3 border border-gray-300 rounded-md text-black dark:text-white bg-gray-200 dark:bg-gray-800"
                        />
                        {errors.title && (
                            <p className="text-red-500"> {errors.title.message} </p>
                        )}
                    </section>

                    {/* subtitle */}
                    <section>
                        <input
                            type="text"
                            placeholder="Subtitle"
                            {...register("subtitle", {
                                required: "This field is mandatory",
                                minLength: { value: 2, message: "Too short" },
                                maxLength: { value: 255, message: "Too long" },
                            })}
                            className="w-full p-3 border border-gray-300 rounded-md text-black dark:text-white bg-gray-200 dark:bg-gray-800"
                        />
                        {errors.subtitle && (
                            <p className="text-red-500"> {errors.subtitle.message} </p>
                        )}
                    </section>

                    {/* description */}
                    <section>
                        <input
                            type="text"
                            placeholder="Description"
                            {...register("description", {
                                required: "This field is mandatory",
                                minLength: { value: 2, message: "Too short" },
                                maxLength: { value: 1024, message: "Too long" },
                            })}
                            className="w-full p-3 border border-gray-300 rounded-md text-black dark:text-white bg-gray-200 dark:bg-gray-800"
                        />
                        {errors.description && (
                            <p className="text-red-500"> {errors.description.message} </p>
                        )}
                    </section>

                    {/* phone */}
                    <section>
                        <input
                            type="tel"
                            placeholder="Phone"
                            {...register("phone", {
                                required: "This field is mandatory",
                                minLength: { value: 9, message: "Too short" },
                                maxLength: { value: 11, message: "Too long" },
                            })}
                            className="w-full p-3 border border-gray-300 rounded-md text-black dark:text-white bg-gray-200 dark:bg-gray-800"
                        />
                        {errors.phone && (
                            <p className="text-red-500"> {errors.phone.message} </p>
                        )}
                    </section>

                    {/* email */}
                    <section>
                        <input
                            type="email"
                            placeholder="Email"
                            {...register("email", {
                                required: "This field is mandatory",
                                pattern: patterns.email,
                            })}
                            className="w-full p-3 border border-gray-300 rounded-md text-black dark:text-white bg-gray-200 dark:bg-gray-800"
                        />
                        {errors.email && (
                            <p className="text-red-500"> {errors.email.message} </p>
                        )}
                    </section>

                    {/* image.url */}
                    <section>
                        <input
                            placeholder="Image URL"
                            type="url"
                            {...register("image.url", {
                                required: "This field is mandatory",
                                pattern: {
                                    value: patterns.url,
                                    message: "Invalid image URL",
                                },
                            })}
                            className="w-full p-3 border border-gray-300 rounded-md text-black dark:text-white bg-gray-200 dark:bg-gray-800"
                        />
                        {errors.image?.url && (
                            <p className="text-red-500">{errors.image?.url?.message}</p>
                        )}
                    </section>

                    {/* image.alt */}
                    <section>
                        <input
                            placeholder="Image Description"
                            type="text"
                            {...register("image.alt", {
                                minLength: { value: 2, message: "Too short" },
                                maxLength: { value: 255, message: "Too long" },
                            })}
                            className="w-full p-3 border border-gray-300 rounded-md text-black dark:text-white bg-gray-200 dark:bg-gray-800"
                        />
                        {errors.image?.alt && (
                            <p className="text-red-500">{errors.image?.alt?.message}</p>
                        )}
                    </section>

                    {/* address.state*/}
                    <section>
                        <input
                            placeholder="State"
                            type="text"
                            {...register("address.state")}
                            className="w-full p-3 border border-gray-300 rounded-md text-black dark:text-white bg-gray-200 dark:bg-gray-800"
                        />
                        {errors.address?.state && (
                            <p className="text-red-500">{errors.address?.state?.message}</p>
                        )}
                    </section>

                    {/* address.country */}
                    <section>
                        <input
                            placeholder="Country"
                            type="text"
                            {...register("address.country", {
                                required: "This field is mandatory",
                            })}
                            className="w-full p-3 border border-gray-300 rounded-md text-black dark:text-white bg-gray-200 dark:bg-gray-800"
                        />
                        {errors.address?.country && (
                            <p className="text-red-500">{errors.address?.country?.message}</p>
                        )}
                    </section>

                    {/* address.city */}
                    <section>
                        <input
                            placeholder="City"
                            type="text"
                            {...register("address.city", {
                                required: "This field is mandatory",
                            })}
                            className="w-full p-3 border border-gray-300 rounded-md text-black dark:text-white bg-gray-200 dark:bg-gray-800"
                        />
                        {errors.address?.city && (
                            <p className="text-red-500">{errors.address?.city?.message}</p>
                        )}
                    </section>

                    {/* address.street */}
                    <section>
                        <input
                            placeholder="Street"
                            type="text"
                            {...register("address.street", {
                                required: "This field is mandatory",
                            })}
                            className="w-full p-3 border border-gray-300 rounded-md text-black dark:text-white bg-gray-200 dark:bg-gray-800"
                        />
                        {errors.address?.street && (
                            <p className="text-red-500">{errors.address?.street?.message}</p>
                        )}
                    </section>

                    {/* address.houseNumber */}
                    <section>
                        <input
                            placeholder="House Number"
                            type="number"
                            {...register("address.houseNumber", {
                                required: "This field is mandatory",
                                minLength: { value: 1, message: "Too short" },
                            })}
                            className="w-full p-3 border border-gray-300 rounded-md text-black dark:text-white bg-gray-200 dark:bg-gray-800"
                        />
                        {errors.address?.houseNumber && (
                            <p className="text-red-500">{errors.address?.houseNumber?.message}</p>
                        )}
                    </section>

                    {/* address.zip */}
                    <section>
                        <input
                            placeholder="Zip"
                            type="number"
                            {...register("address.zip")}
                            className="w-full p-3 border border-gray-300 rounded-md text-black dark:text-white bg-gray-200 dark:bg-gray-800"
                        />
                        {errors.address?.zip && (
                            <p className="text-red-500">{errors.address?.zip?.message}</p>
                        )}
                    </section>

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
                        Create Card
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateCard;
