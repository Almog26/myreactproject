import { useEffect, useState } from "react";
import auth from "../services/auth";
import { RegisterUser } from "../@types/types";

const Profile = () => {
    const userId = localStorage.getItem("user_id") ?? "no user id";
    const [user, setUser] = useState<RegisterUser>();

    useEffect(() => {
        auth
            .userDetails(userId)
            .then((res) => {
                setUser(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md transition-colors duration-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-center">Profile Details</h2>
            <div className="grid grid-cols-2 gap-4">
                <p className="text-gray-700 dark:text-gray-300 font-medium">First Name:</p>
                <p>{user?.name.first}</p>
                <p className="text-gray-700 dark:text-gray-300 font-medium">Middle Name:</p>
                <p>{user?.name.middle}</p>
                <p className="text-gray-700 dark:text-gray-300 font-medium">Last Name:</p>
                <p>{user?.name.last}</p>
                <p className="text-gray-700 dark:text-gray-300 font-medium">Email:</p>
                <p>{user?.email}</p>
                <p className="text-gray-700 dark:text-gray-300 font-medium">Phone:</p>
                <p>{user?.phone}</p>
                <p className="text-gray-700 dark:text-gray-300 font-medium">Street:</p>
                <p>{user?.address.street}</p>
                <p className="text-gray-700 dark:text-gray-300 font-medium">City:</p>
                <p>{user?.address.city}</p>
                <p className="text-gray-700 dark:text-gray-300 font-medium">State:</p>
                <p>{user?.address.state}</p>
                <p className="text-gray-700 dark:text-gray-300 font-medium">Zip Code:</p>
                <p>{user?.address.zipcode}</p>
                <p className="text-gray-700 dark:text-gray-300 font-medium">Country:</p>
                <p>{user?.address.country}</p>
            </div>
        </div>
    );
};

export default Profile;

