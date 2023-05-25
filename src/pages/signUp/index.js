import React from 'react';
import { useNavigate } from "react-router-dom";
import "./signUp.scss";
import Forms from "../../components/Forms";

function SignUp() {
    const navigate = useNavigate();
    const formFields = [
        {
            name: "username",
            value: "",
            label: "User Name",
            type: "text",
            cssClass: "",
            validations: [
                {
                    type: "required",
                    errorMessage: "Please fill in user name"
                }
            ]
        },{
            name: "email",
            value: "",
            label: "Email Address",
            type: "email",
            cssClass: "",
            validations: [
                {
                    type: "required",
                    errorMessage: "Please fill in Email Address"
                },{
                    type: "pattern",
                    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    errorMessage: "Please enter valid Email Address"
                },
            ]
        },
        {
            name: "password",
            value: "",
            label: "Password",
            type: "password",
            cssClass: "",
            validations: [
                {
                    type: "required",
                    errorMessage: "Please fill in Password"
                },
                {
                    type: "min",
                    length: 6, 
                    errorMessage: "Password length should be 6 to 10 characters"
                },
                {
                    type: "max",
                    length: 10, 
                    errorMessage: "Password length should be 6 to 10 characters"
                },
            ]
        }
    ];

    const buttons = [
        {
            name: "",
            type: "submit",
            label: "Sign Up",
            cssClass:"signUpButton",
            handleClick: ()=>{} 
        }
    ];

    const handleFormSubmit = (data) => {
        console.log(data);
        navigate("/users");
    };

    return (
        <div className="card_container">
           
            <div className="formBox">
                <h1 className="title">Sign up to create your Account</h1>
                <Forms 
                    formFields = {formFields}
                    parentClass=""
                    buttons= {buttons}
                    onSubmit={handleFormSubmit}
                />
            </div>
        </div>
    )
}

export default SignUp;