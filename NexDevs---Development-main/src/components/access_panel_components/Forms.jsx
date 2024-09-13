import React, { useEffect, useState } from "react";
import '../../index.css'
import { FormInput, FormSelect, FormTextArea } from "./FormInput";
import AddIcon from '@mui/icons-material/Add';

//Fromulario de LogIn
export function LogIn({ switchToSignIn, switchToRecovery }) {
    //Guarda los datos de inicio de sesion
    const [formData, setFormData] = useState({
        email: "",
        password:"",
    });

    //Maneja los inputs ingresados
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    //Realiza las acciones necesarias para iniciar sesion
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log( formData );
        setFormData({ ...formData, email: '', password: '' });
    };
    return (
        <form className="w-1/2 md:w-[70%]" onSubmit={handleSubmit}>
            <h1 className="text-5xl font-medium sm:text-2xl sm:mt-7">Iniciar Sesión</h1>
            {/* Email y contraseña */}
            <div className="flex flex-col gap-2 mt-10 mb-5 sm:mt-5">
                <FormInput id={"login_email"} type="email" name="email" title="Email" minLength={0} value={formData.email} onChange={handleInputChange} className="border h-12 bg-clr-white border-black rounded p-1" />
                <FormInput id={"login_password"} type="password" name="password" title="Contraseña" minLength={8} value={formData.password} onChange={handleInputChange} className="border h-12 bg-clr-white border-black rounded p-1" />
            </div>
            {/* Olvide mi contraseña */}
            <div className="flex flex-col items-end mb-5">
                <a className="text-clr-blue font-medium cursor-pointer" onClick={switchToRecovery}>Olvidé mi contraseña</a>
            </div>

            {/* Boton de Login */}
            <button id="login_confirm" className="rounded-md bg-black text-white w-full h-12 font-medium" type="submit">Iniciar Sesión</button>

            {/* Registrarse */}
            <div className="flex flex-col items-center">
                <p className="mt-10">¿Aún no tienes una cuenta? <a id="login_register" className="text-clr-blue underline cursor-pointer sm:flex sm:flex-col sm:items-center" onClick={switchToSignIn}>Regístrate</a></p>
            </div>
        </form>
    );
}

export function SignIn_1({ switchToLogIn, switchToCompany, switchToSignIn2, userData, onUserDataChange, resetForm, onResetComplete }) {
    //Guarda los datos ingresados en el SignIn
    const [formData, setFormData] = useState({
        name: userData.name,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    //Resetea los inputs cuando detecta que se ha completado el formulario
    useEffect(() => {
        if (resetForm) {
            setFormData({
                name: '',
                lastName: '',
                email: '',
                password: ''
            });
            setConfirmPassword('');
            onResetComplete();
        }
    }, [resetForm, onResetComplete]);

    //Maneja los inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    //Maneja el confirmpassword
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    //Realiza las acciones necesarias para registrar un usuario
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }
        setError('');
        onUserDataChange(formData);
        switchToSignIn2();
    };

    return (
        <form className="w-1/2 md:w-[70%]" onSubmit={handleSubmit}>
            <h1 className="text-5xl font-medium sm:text-2xl sm:mt-5">Registrarse</h1>

            {/* Formulario */}
            <div className="flex flex-col gap-2 my-10 sm:my-5">
                <FormInput id={"signIn_name"} type="text" name="name" title="Nombre" minLength={0} value={formData.name} onChange={handleInputChange} className="border h-12 bg-clr-white border-black rounded p-1" />
                <FormInput id={"signIn_lastName"} type="text" name="lastName" title="Apellidos" minLength={0} value={formData.lastName} onChange={handleInputChange} className="border h-12 bg-clr-white border-black rounded p-1" />
                <FormInput id={"signIn_email"} type="email" name="email" title="Email" minLength={0} value={formData.email} onChange={handleInputChange} className="border h-12 bg-clr-white border-black rounded p-1" />
                <FormInput id={"signIn_password"} type="password" name="password" title="Contraseña" minLength={8} value={formData.password} onChange={handleInputChange} className="border h-12 bg-clr-white border-black rounded p-1" />
                <FormInput id={"signIn_confirmPassword"} type="password" name="password" title="Confirmar contraseña" minLength={8} value={confirmPassword} onChange={handleConfirmPasswordChange} className="border h-12 bg-clr-white border-black rounded p-1" />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            {/* Boton de Siguiente */}
            <button id="user_next" className="rounded-md bg-black text-white w-full h-12 font-medium" type="submit">Siguiente</button>

            {/* Iniciar Sesión */}
            <div className="flex flex-col items-center">
                <p className="mt-10 md:mt-5">¿Ya tienes una cuenta? <a id="register_login" className="text-clr-blue underline cursor-pointer sm:flex sm:flex-col sm:items-center" onClick={switchToLogIn}>Inicia Sesión</a></p>
            </div>
            {/* Registrar Empresa */}
            <div className="flex flex-col items-center">
                <p className="mt-5">¿Quieres registrar tu empresa? <a id="register_company" className="text-clr-blue underline cursor-pointer sm:flex sm:flex-col sm:items-center " onClick={switchToCompany}>Regístrala aquí</a></p>
            </div>
        </form>
    );
}
export function SignIn_2({ switchToLogIn, switchToSignIn1, userData, onResetForm }) {
    //Guarda los datos ingresados en el SignIn
    const initialFormData = {
        state: userData.state || '',
        city: userData.city || '',
        biography: userData.biography || ''
    };
    const [formData, setFormData] = useState(initialFormData);

    //Lista de opciones de los selects
    const stateOptions = [
        'San José', 'Alajuela', 'Cartago', 'Heredia', 'Guanacaste', 'Puntarenas', 'Limón'
    ];
    const cityOptions = {
        'San José': ['San José', 'Escazú'],
        'Alajuela': ['Alajuela', 'San Carlos'],
        'Cartago': ['Cartago', 'Paraíso'],
        'Heredia': ['Heredia', 'Barva'],
        'Guanacaste': ['Liberia', 'Santa Cruz'],
        'Puntarenas': ['Puntarenas', 'Esparza'],
        'Limón': ['Limón', 'Guápiles']
    };
    const [selectedProvince, setSelectedProvince] = useState(formData.state);
    const [availableCities, setAvailableCities] = useState(cityOptions[selectedProvince] || []);

    //Maneja los selects, y actualiza la lista de ciudades respecto a la provincia
    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (name === 'state') {
            setSelectedProvince(value);
            setAvailableCities(cityOptions[value] || []);
        }
    };

    //Maneja los inputs ingresados
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    //Foto de Perfil
    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const defaultImage = '/images/default_profile_picture.jpg';

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    //Maneja el envio del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedUserData = {
            ...userData,
            ...formData,
            profileImage
        };
        console.log(updatedUserData);

        // Restablecer el formulario
        setProfileImage(null);
        setPreviewImage('/images/default_profile_picture.jpg');
        setFormData(initialFormData);
        setSelectedProvince('');
        setAvailableCities([]);
        onResetForm();
        switchToLogIn();
    };

    return (
        <form className="w-1/2 md:w-[70%]" onSubmit={handleSubmit}>
            <h1 className="text-5xl font-medium sm:text-2xl sm:mt-5">Registrarse</h1>

            {/* Formulario */}
            <div className="flex flex-col gap-2 my-10 sm:my-5">
                <div className="flex w-full">
                    <div className="relative w-36 h-36 mx-auto sm:w-28 sm:h-28 sm:mt-5 sm:ml-2">

                        {/* Imagen de perfil */}
                        <div className="w-full h-full rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden">
                            <img
                                src={previewImage || defaultImage}
                                alt="Previsualización"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Botón para subir imagen */}
                        <label htmlFor="userImage" className="absolute bottom-0 right-0 w-8 h-8 bg-black rounded-full flex items-center justify-center cursor-pointer">
                            <AddIcon style={{ color: 'white' }} />
                        </label>
                        <input
                            id="userImage"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>
                    <div className="flex flex-col  w-1/2 gap-2 sm:gap-1">
                        <FormSelect id="user_state" name="state" title="Provincia" value={formData.state} onChange={handleSelectChange} options={stateOptions} className="border h-12 bg-clr-white border-black rounded p-1" />
                        <FormSelect id="user_city" name="city" title="Ciudad" value={formData.city} onChange={handleSelectChange} options={availableCities} className="border h-12 bg-clr-white border-black rounded p-1" />
                    </div>
                </div>
                <FormTextArea id="user_biography" name="biography" title="Biografía" minLength={0} value={formData.biography} onChange={handleInputChange} className="border h-44 md:h-32 bg-clr-white border-black rounded p-1" />
            </div>

            {/* Boton de volver o confirmar */}
            <div className="flex justify-between">
                <button id="user_back" className="rounded-md border-black border-2 bg-white text-black w-[47%] h-12 font-medium" type="button" onClick={switchToSignIn1}>Volver</button>
                <button id="user_confirm" className="rounded-md bg-black text-white w-[47%] h-12 font-medium" type="submit">Confirmar</button>
            </div>
        </form>
    );
}

export function Recovery_EmailVerification({ switchToLogIn, switchToPassword }) {
    const [email, setEmail] = useState('');
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    //Maneja el envio del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        // Restablecer el formulario
        setEmail('');
        switchToPassword();
    };
    return (
        <form className="w-1/2 md:w-[70%]" onSubmit={handleSubmit}>
            <h1 className="text-5xl font-medium sm:text-2xl sm:mt-7">Recuperar contraseña</h1>
            <p className="mt-2">Ingresa tu correo electrónico y te enviaremos un enlace para recuperar tu contraseña.</p>
            <div className="flex flex-col gap-2 my-10 sm:my-5">
                <FormInput id="recovery_email" type="email" name="email" title="Email" minLength={0} value={email} onChange={handleEmailChange} className="border h-12 bg-clr-white border-black rounded p-1" />
            </div>
            {/* Boton de Login */}
            <button id="recovery_confirm" className="rounded-md bg-black text-white w-full h-12 font-medium" type="submit">Enviar Correo</button>

            {/* Iniciar Sesion */}
            <div className="flex flex-col items-center">
                <p className="mt-10">¿No quieres recuperar tu contraseña? <a id="recovery_login" className="text-clr-blue underline cursor-pointer sm:flex sm:flex-col sm:items-center" onClick={switchToLogIn}>Inicia Sesión</a></p>
            </div>
        </form>
    );
}

export function Recovery_Password({ switchToLogIn }) {
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword:"",
    });
    const [error, setError] = useState('');

    //Maneja los inputs ingresados
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    //Maneja el envio del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }
        console.log(formData);
        setFormData({ ...formData, password: '', confirmPassword: '' });
        setError('');
        switchToLogIn();
    };
    return (
        <form className="w-1/2 md:w-[70%]" onSubmit={handleSubmit}>
            <h1 className="text-5xl font-medium sm:text-2xl sm:mt-7">Nueva Contraseña</h1>
            <div className="flex flex-col gap-2 my-10 sm:my-5">
                <FormInput id="recovery_password" type="password" name="password" title="Contraseña" minLength={8} value={formData.password} onChange={handleInputChange} className="border h-12 bg-clr-white border-black rounded p-1" />
                <FormInput id="recovery_confirmpassword" type="password" name="confirmPassword" title="Confirmar contraseña" minLength={8} value={formData.confirmPassword} onChange={handleInputChange} className="border h-12 bg-clr-white border-black rounded p-1" />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            {/* Boton de Login */}
            <button id="password_confirm" className="rounded-md bg-black text-white w-full h-12 font-medium" type="submit">Cambiar contraseña</button>

            {/* Iniciar Sesion */}
            <div className="flex flex-col items-center">
                <p className="mt-10">¿No quieres cambiar tu contraseña? <a id="password_login" className="text-clr-blue underline cursor-pointer sm:flex sm:flex-col sm:items-center" onClick={switchToLogIn}>Inicia Sesión</a></p>
            </div>
        </form>
    );
}

export function Company_SignIn_1({ switchToLogIn, switchToSignIn, switchToCompany2, companyData, onCompanyDataChange, resetForm, onResetComplete }) {
    //Guarda los datos ingresados en el SignIn
    const [formData, setFormData] = useState({
        companyName: companyData.companyName,
        email: companyData.email,
        password: companyData.password,
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    //Resetea los inputs cuando detecta que se ha completado el formulario
    useEffect(() => {
        if (resetForm) {
            setFormData({
                companyName: '',
                email: '',
                password: ''
            });
            setConfirmPassword('');
            onResetComplete();
        }
    }, [resetForm, onResetComplete]);

    //Maneja los inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    //Maneja el confirmpassword
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    //Maneja el envio del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }
        setError('');
        onCompanyDataChange(formData);
        switchToCompany2();
    };

    return (
        <form className="relative w-1/2 items-center justify-center md:w-[70%]" onSubmit={handleSubmit}>
            <h1 className="text-5xl font-medium sm:text-2xl sm:mt-7">Registrar Empresa</h1>

            {/* Formulario */}
            <div className="flex flex-col gap-2 my-10 sm:my-5">
                <FormInput id="company_name" type="text" name="companyName" title="Nombre de la Empresa" minLength={0} value={formData.companyName} onChange={handleInputChange} className="border h-12 bg-clr-white border-black rounded p-1" />
                <FormInput id="company_email" type="email" name="email" title="Email" minLength={0} value={formData.email} onChange={handleInputChange} className="border h-12 bg-clr-white border-black rounded p-1" />
                <FormInput id="company_password" type="password" name="password" title="Contraseña" minLength={8} value={formData.password} onChange={handleInputChange} className="border h-12 bg-clr-white border-black rounded p-1" />
                <FormInput id="company_confirmpassword" type="password" name="confirmPassword" value={confirmPassword} title="Confirmar contraseña" onChange={handleConfirmPasswordChange} minLength={8} className="border h-12 bg-clr-white border-black rounded p-1" />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            {/* Boton de Siguiente */}
            <button id="company_next" className="rounded-md bg-black text-white w-full h-12 font-medium" type="submit">Siguiente</button>

            {/* Iniciar Sesion */}
            <div className="flex flex-col items-center">
                <p className="mt-10">¿Ya tienes una cuenta? <a id="company_login" className="text-clr-blue underline cursor-pointer sm:flex sm:flex-col sm:items-center" onClick={switchToLogIn}>Inicia Sesión</a></p>
            </div>
            {/* Registrar Usuario */}
            <div className="flex flex-col items-center">
                <p className="mt-5">¿Quieres registrar un usuario normal? <a id="company_register" className="text-clr-blue underline cursor-pointer sm:flex sm:flex-col sm:items-center" onClick={switchToSignIn}>Regístrate aquí</a></p>
            </div>
        </form>
    );
}

export function Company_SignIn_2({ switchToLogIn, switchToCompany1, companyData, onResetForm }) {
    //Guarda los datos ingresados en el SignIn
    const initialFormData = {
        state: companyData.state || '',
        city: companyData.city || '',
        category: companyData.category || '',
        description: companyData.description || ''
    };
    const [formData, setFormData] = useState(initialFormData);

    //Lista de opciones de los selects
    const categoryOptions = [
        'Fontanería', 'Jardinería', 'Electricidad', 'Carpintería', 'Reparación de Electrodomésticos', 'Limpieza de Hogares', 'Servicio de Mudanzas', 'Cuidado de Mascotas'
    ];
    const stateOptions = [
        'San José', 'Alajuela', 'Cartago', 'Heredia', 'Guanacaste', 'Puntarenas', 'Limón'
    ];
    const cityOptions = {
        'San José': ['San José', 'Escazú'],
        'Alajuela': ['Alajuela', 'San Carlos'],
        'Cartago': ['Cartago', 'Paraíso'],
        'Heredia': ['Heredia', 'Barva'],
        'Guanacaste': ['Liberia', 'Santa Cruz'],
        'Puntarenas': ['Puntarenas', 'Esparza'],
        'Limón': ['Limón', 'Guápiles']
    };
    const [selectedProvince, setSelectedProvince] = useState(formData.state);
    const [availableCities, setAvailableCities] = useState(cityOptions[selectedProvince] || []);

    //Maneja los selects, y actualiza la lista de ciudades respecto a la provincia
    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (name === 'state') {
            setSelectedProvince(value);
            setAvailableCities(cityOptions[value] || []);
        }
    };

    //Maneja los inputs ingresados
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    //Foto de Perfil
    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const defaultImage = '/images/default_profile_picture.jpg';

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    //Handle Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedCompanyData = {
            ...companyData,
            ...formData,
            profileImage
        };
        console.log(updatedCompanyData);

        // Restablecer el formulario
        setProfileImage(null);
        setPreviewImage('/images/default_profile_picture.jpg');
        setFormData(initialFormData);
        setSelectedProvince('');
        setAvailableCities([]);
        onResetForm();
        switchToLogIn();
    };

    return (
        <form className="relative w-1/2 items-center justify-center md:w-[70%]" onSubmit={handleSubmit}>
            <h1 className="text-5xl font-medium sm:text-2xl sm:mt-7">Registrar Empresa</h1>

            {/* Formulario */}
            <div className="flex flex-col gap-2 my-10 sm:my-5">
                <div className="flex w-full">
                    <div className="relative w-36 h-36 mx-auto sm:w-28 sm:h-28 sm:mt-5 sm:ml-2">
                        {/* Imagen de perfil */}
                        <div className="w-full h-full rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden">
                            <img
                                src={previewImage || defaultImage}
                                alt="Previsualización"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Botón para subir imagen */}
                        <label htmlFor="profileImage" className="absolute bottom-0 right-0 w-8 h-8 bg-black rounded-full flex items-center justify-center cursor-pointer">
                            <AddIcon style={{ color: 'white' }} />
                        </label>
                        <input
                            id="profileImage"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>

                    <div className="flex flex-col  w-1/2 gap-2 sm:gap-1">
                        <FormSelect id="company_state" name="state" title="Provincia" value={formData.state} onChange={handleSelectChange} options={stateOptions} className="border h-12 bg-clr-white border-black rounded p-1" />
                        <FormSelect id="company_city" name="city" title="Ciudad" value={formData.city} onChange={handleSelectChange} options={availableCities} className="border h-12 bg-clr-white border-black rounded p-1" />
                    </div>

                </div>
                <FormSelect id="company_category" name="category" title="Categoría" value={formData.category} onChange={handleSelectChange} options={categoryOptions} className="border h-12 bg-clr-white border-black rounded p-1" />
                <FormTextArea id="company_description" name="description" title="Descripción" minLength={0} value={formData.description} onChange={handleInputChange} className="border h-44 md:h-32 bg-clr-white border-black rounded p-1" />
            </div>

            {/* Boton de volver o confirmar */}
            <div className="flex justify-between">
                <button id="company_back" className="rounded-md border-black border-2 bg-white text-black w-[47%] h-12 font-medium" type="button" onClick={switchToCompany1}>Volver</button>
                <button id="company_confirm" className="rounded-md bg-black text-white w-[47%] h-12 font-medium" type="submit">Confirmar</button>
            </div>
        </form>
    );
}