import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import auth from "../services/auth";


const UpdateCard = () => {
  const { theme } = useTheme();
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    if (id) {
      console.log("Fetching card details with id:", id);
      auth.getCardDetails(id, token).then((card) => {
        console.log("Fetched card details:", card);
        setValue("title", card.title);
        setValue("subtitle", card.subtitle);
        setValue("description", card.description);
        setValue("phone", card.phone);
        setValue("email", card.email);
        setValue("address", card.address);
        setValue("image.url", card.image.url);
        setValue("image.alt", card.image.alt);
      }).catch((error) => {
        console.error("Error fetching card details:", error);
      });
    }
  }, [id, setValue, token]);

  const onSubmit = (data: any) => {
    console.log("Updating card with data:", data);

    const { _id, ...address } = data.address;

    const updatedData = {
      ...data,
      address,
      image: {
        url: data.image.url,
        alt: data.image.alt || data.title || "Image"
      }
    };

    console.log("Updated data to send:", updatedData);

    auth.updateCard(id as string, updatedData, token).then(() => {
      navigate("/");
    }).catch((error) => {
      console.error("Error updating card:", error);
      console.error("Server responded with an error:", error.response?.data);
      console.error("Status code:", error.response?.status);
    });
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme === "light" ? "bg-gray-100" : "bg-gray-800"}`}>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-700 p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">Update Card</h2>

        <div className="mb-4">
          <label className="block text-black dark:text-white mb-2">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.title && <p className="text-red-500">{errors.title.message?.toString()}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-black dark:text-white mb-2">Subtitle</label>
          <input
            type="text"
            {...register("subtitle", { required: "Subtitle is required" })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.subtitle && <p className="text-red-500">{errors.subtitle.message?.toString()}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-black dark:text-white mb-2">Description</label>
          <input
            type="text"
            {...register("description", { required: "Description is required" })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.description && <p className="text-red-500">{errors.description.message?.toString()}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-black dark:text-white mb-2">Phone</label>
          <input
            type="text"
            {...register("phone", { required: "Phone is required" })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.phone && <p className="text-red-500">{errors.phone.message?.toString()}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-black dark:text-white mb-2">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.email && <p className="text-red-500">{errors.email.message?.toString()}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-black dark:text-white mb-2">Address</label>
          <input
            type="text"
            {...register("address", { required: "Address is required" })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.address && <p className="text-red-500">{errors.address.message?.toString()}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-black dark:text-white mb-2">Image URL</label>
          <input
            type="text"
            {...register("image.url", { required: "Image URL is required" })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {(errors.image as any)?.url && <p className="text-red-500">{(errors.image as any).url.message?.toString()}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-black dark:text-white mb-2">Image Alt</label>
          <input
            type="text"
            {...register("image.alt")}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
          Update Card
        </button>
      </form>
    </div>
  );
};

export default UpdateCard;
