

import "./Register.scss";
import patterns from "../validation/patterns";
import { BsEye, BsEyeSlashFill } from "react-icons/bs";
import { useState } from "react";

import { RegisterUser } from "../@types/types";
import dialogs from "../ui/dialogs";
import { useNavigate } from "react-router-dom";
import auth from "../services/auth";
import { registerMock } from "../mocks/register";
import { useForm } from "react-hook-form";
const Register = () => {
const { register, handleSubmit, formState: { errors } } 
= useForm<RegisterUser>({ defaultValues: registerMock });

const navigate = useNavigate();

    const onRegister = (data: RegisterUser) => {
        auth
            .register(data) //request
            .then((res) => { //201 response
                localStorage.setItem("user_id", res.data._id)
                localStorage.setItem("isBusiness", res.data.isBusiness)
                dialogs.success("Success", "User registered successfully")
                    .then(() => {
                        navigate("/login");
                    });
            })
            .catch((e) => {
                dialogs.error("Error", e.response.data);
            });
    };

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form noValidate onSubmit={handleSubmit(onRegister)}>

                {/* first-name */}
                <section>
                    <input
                        type="text"
                        placeholder="First name"
                        {...register("name.first", {
                            required: "This field is mandatory",
                            minLength: { value: 2, message: "Too short" },
                            maxLength: { value: 255, message: "Too long" },
                        })}
                    />
                    {errors.name?.first && (
                        <p className="text-red-500"> {errors.name?.first?.message} </p>
                    )}
                </section>

                {/* middle-name */}
                <section>
                    <input
                        type="text"
                        placeholder="Middle name"
                        {...register("name.middle", {
                            minLength: { value: 2, message: "Too short" },
                            maxLength: { value: 255, message: "Too long" },
                        })}
                    />
                    {errors.name?.middle && (
                        <p className="text-red-500"> {errors.name.middle.message} </p>
                    )}
                </section>

                {/* last-name */}
                <section>
                    <input
                        type="text"
                        placeholder="Last name"
                        {...register("name.last", {
                            required: "This field is mandatory",
                            minLength: { value: 2, message: "Too short" },
                            maxLength: { value: 255, message: "Too long" },
                        })}
                    />
                    {errors.name?.last && (
                        <p className="text-red-500"> {errors.name.last.message} </p>
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
                            pattern: {
                                value: /\S+@gmail\.\S+/,
                                message: "Invalid email"
                            },
                        })}
                    />
                    {errors.email && (
                        <p className="text-red-500"> {errors.email.message} </p>
                    )}
                </section>

                {/* password */}
                <section>
                    <div className="password-container">

                        <input
                            placeholder="Password"
                            type={showPassword ? `text` : `password`}
                            {...register("password", {
                                required: "This field is mandatory",
                                pattern: {
                                    value: patterns.password,
                                    message:
                                        "Password must be at least 9 characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-",
                                },
                            })}
                        />

                        <button type="button"
                            onClick={() => {
                                setShowPassword((s) => !s);
                            }}
                        >
                            {showPassword ? <BsEyeSlashFill /> : <BsEye />}
                        </button>
                    </div>

                    {errors.password && (
                        <p className="text-red-500">{errors.password?.message}</p>
                    )}
                </section>

                {/* image.url */}
                <section>
                    <input
                        placeholder="Image URL"
                        type="url"
                        {...register("image.url", {
                            pattern: {
                                value: patterns.url,
                                message: "Invalid image URL",
                            },
                        })}
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
                        {...register("address.state", {
                            minLength: { value: 2, message: "Too short" },
                            maxLength: { value: 255, message: "Too long" },
                        })}
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
                            minLength: { value: 2, message: "Too short" },
                            maxLength: { value: 255, message: "Too long" },
                        })}
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
                            minLength: { value: 2, message: "Too short" },
                            maxLength: { value: 255, message: "Too long" },
                        })}
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
                            minLength: { value: 2, message: "Too short" },
                            maxLength: { value: 255, message: "Too long" },
                        })}
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
                            minLength: { value: 2, message: "Too short" },
                            maxLength: { value: 255, message: "Too long" },
                        })}
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
                        {...register("address.zip", {
                            required: "This field is mandatory",
                            minLength: { value: 2, message: "Too short" },
                            maxLength: { value: 255, message: "Too long" },
                        })}
                    />
                    {errors.address?.houseNumber && (
                        <p className="text-red-500">{errors.address?.zip?.message}</p>
                    )}
                </section>
                 {/* {is admin} */}
                 <section className="checkbox-container">
                    <label htmlFor="isAdmin">Admin</label>
                    <input
                        id="isAdmin"
                        type="checkbox"{...register("isAdmin")}
                    />
                    {errors.isAdmin && (
                        <p className="text-red-500">{errors.isAdmin?.message}</p>
                    )}

                 </section>

                {/* address.isBusiness */}
                <section className="checkbox-container">
                    <label htmlFor="isBusiness">Business</label>
                    <input
                        id="isBusiness"
                        type="checkbox" {...register("isBusiness")}
                    />
                    {errors.isBusiness && (
                        <p className="text-red-500">{errors.isBusiness?.message}</p>
                    )}
                </section>

                <button type="submit">Register</button>

            </form>
        </div>
    );
};


export default Register;