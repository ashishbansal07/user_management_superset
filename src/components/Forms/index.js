import React, { useEffect } from 'react';
import "./forms.scss";
import { useForm } from "react-hook-form";

function Forms(props) {
    const { formFields, buttons, onSubmit, parentClass, onFieldChange} = props;
    const { register, watch, formState: { errors }, handleSubmit } = useForm({
        mode: "onSubmit",
        reValidateMode: "onChange"
    });

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            typeof onFieldChange == "function" && onFieldChange({name, value, type});
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    const validateField = (field, value) => {
        let isValid = true;
        const {validations} = field;
        let validationMessage = "";
        for(let validation of validations) {
            switch (validation.type){
                case "required":
                    isValid = field.type==="file" ? value['length'] !== 0 : value !==  "";
                    validationMessage = validation.errorMessage;
                    break;
                case "min": 
                    isValid = value.length > validation.length;
                    validationMessage = validation.errorMessage;
                    break;
                case "max": 
                    isValid = value.length < validation.length;
                    validationMessage = validation.errorMessage;
                    break;
                case "pattern":
                    isValid = validation.pattern.test(value);
                    validationMessage = validation.errorMessage;
                    break;
            }
            if(!isValid) {
                return validationMessage;
            }
        }
        return isValid || validationMessage;
    }

    const getFieldsDOM = () => {
        const fieldsDOM = formFields.map((field, index) => {
            const {name, label, type, cssClass, placeholder, width, options} = field;
            
            if(field.type === "select") {
                return (
                    <div key={index} className="formGroup" style={{width: width || "100%"}}>
                        {label ? <label className="label">{label}</label> : null}
                        <select name={name} className={`selectField ${cssClass}`} {...register(name, {validate: validateField.bind(undefined, field)})} >
                            {
                                options.map((option, index) => (
                                    <option value={option.value }  key={index}>{option.label}</option>
                                ))
                            }
                        </select>
                        {errors[name] && <p role="alert" className="errorBox">{errors[name]["message"]}</p>}
                    </div>
                )
            } else {
                return (
                    <div key={index} className="formGroup" style={{width: width || "100%"}}>
                        {label ? <label className="label">{label}</label> : null}
                        <input 
                            type={type}
                            placeholder={placeholder}
                            {...register(name, {validate: validateField.bind(undefined, field)})} 
                            aria-invalid={errors[name] ? "true" : "false"} 
                            className={`inputField ${cssClass}`}
                        />
                        {errors[name] && <p role="alert" className="errorBox">{errors[name]["message"]}</p>}
                    </div>
                );
            };
        });
        return fieldsDOM;    
    }

    const getButtons = () => {
        const buttonsDOM = buttons.map(function (button, index) {
            const {name, label, type, handleClick, cssClass} = button;
            return <button key = {index} type={type} name={name} onClick={() => handleClick()} className={cssClass}>{label}</button>
        })
        return buttonsDOM;
    }

    const onFormSubmit = function (data) {
        onSubmit(data);
    }

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className={`form_container ${parentClass}`} noValidate>
            {getFieldsDOM()}
            {getButtons()}
        </form>
    );
};

export default Forms;