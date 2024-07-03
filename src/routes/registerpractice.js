import {useForm} from "react-hook-form";
import axios from "axios";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


interface  data {
    username: string;
    email: string;
    password: string;
}

const SignupForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<data>();

    const navigate = useNavigate();
    const onSubmit = async (data: data) => {
        try {
            const response = await axios.post('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users', data);
            swal.fire({
                title: 'success',
                text: "success",
                icon: 'success',
                confirmButtonText: 'ok'
            }).then(() => {
                navigate("/login");
            })
        } catch (error) {
            console.log(error);
            swal.fire({
                title: 'error',
                text: `there is an error when you tring to get in the 
                error is ${error}`,
                icon: 'error',
                confirmButtonText: 'ok'
            })
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-2 pl-4">
                <label htmlFor='username'>Username</label>
                <input
                    id="username"
                    {...register("username", {
                        required: "username is required",
                        minLength: {
                            value: 2,
                            message: "username must be at least 2 characters long "
                        }
                    })}
                />
                
                {errors.username && <p>{errors.username.message}</p>}
                <input
                    id="email"
                    {...register("email", {
                        required: "email is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address",
                        }
                    })}
                />
                {errors.email && <p>{errors.email.message</p>}
            </div>
        </form>
    )
}