import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const USER_REGEX = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÜüÑñ]+)*\s[A-Za-zÁÉÍÓÚáéíóúÜüÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÜüÑñ]+)*$/;

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const MAIL_REGEX = /^[\w\.-]+@[\w\.-]+\.\w+$/;

const Register = () => {

    const navigate = useNavigate();
    const inicialUser = {email: '', password: '',username: ''};
    const [user, setUser] = useState(inicialUser);


    //----------------------------------------------------------------
    const userRef = useRef();
    const errRef = useRef();

    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    
    //Set the focus when the component loads
        useEffect(() =>{
            userRef.current.focus();
        },[]);
    //To validate the username everytime    
        useEffect(() =>{
            const result = USER_REGEX.test(user.username);
            setValidName(result);
            console.log(result);
        },[user]);
        //To validate the password everytime    
        useEffect(() =>{
            const result = PWD_REGEX.test(password);
            setValidPwd(result);
            console.log(result);
        },[password]);
        //To validate the email everytime    
        useEffect(() =>{
            const result = MAIL_REGEX.test(email);
            setValidEmail(result);
            console.log(result);
        },[email]);
        useEffect(() =>{
            setErrMsg('');
        },[user, password, email]);
    //----------------------------------------------------------------

    const signUp = async () => {
        try {
            const url = 'https://sistemacic-backend.herokuapp.com/api/auth/local/register';
            if (user.username && user.password && user.email) {
                const res = await axios.post(url,user);
                //TODO: remove console log
                console.log(res); 
                if (res) {
                    setUser(inicialUser);
                    navigate('/login');
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleUserChange =({target}) => {
        const {name, value} = target;
        setUser((currentUser) => ({
            ...currentUser,
            [name]: value,
        }));
    };

  return <section className='h-full max-h-[640px] my-10' >
    <section>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive">{errMsg}
        </p>
    </section>
    <div className='flex mx-auto justify-center flex-col lg:flex-col' >
        <form>
        <div>
            <h2>Regístrate</h2>
            <div>
                <input 
                type="text"
                name='username' 
                value={user.username} 
                onChange={handleUserChange} 
                autoComplete='off'
                
                required
                aria-invalid = {validName ? "false" : "true"}
                aria-describedby = "uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                ref={userRef}
                placeholder='Nombre'/>
                <p id='uidnote' 
                className={userFocus && user.username && !validName ? "instructions" : "offscreen"}
                >
                    El Nombre no es válido
                </p>
            </div>

            {/* <div>
                <input type="email" name='email' value={user.email} onChange={handleUserChange} placeholder='Correo electrónico'/>
            </div> */}
           {/*  <div>
                <input type="password" name='password' value={user.password} onChange={handleUserChange} placeholder='Contraseña'/>
            </div> 
            {! && <p className="error-message">El campo no puede estar vacío.</p>}
            */}
            <div>
                <input type="email"
                name='email' 
                value={user.email} 
                onChange={handleUserChange} 
                
                autoComplete='off'
                required
                aria-invalid = {validEmail ? "false" : "true"}
                aria-describedby = "emailnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                placeholder='Correo electrónico'/>
                <p id='emailnote' 
                className={pwdFocus && !validEmail ? "instructions" : "offscreen"}
                >
                    El correo no es valido
                </p>
            </div>
            <div>
                <input type="password"
                name='password' 
                value={user.password} 
                onChange={handleUserChange} 
                
                autoComplete='off'
                required
                aria-invalid = {validPwd ? "false" : "true"}
                aria-describedby = "pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                placeholder='Contraseña'/>
                <p id='pwdnote' 
                className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
                >
                    La Contraseña no es válida
                </p>
            </div>
            <div>
                <label>¿Está seguro que desea compartir el 50% de sus comisiones con el gremio?</label>
                <select name="share" id="share" onChange={handleUserChange} >
                    <option value='si' >Sí</option>
                    <option value='no' >No</option>
                </select>
            </div>
            <div>
                <select name="type" id="type" onChange={handleUserChange} >                    
                <option value='Asesor Inmobiliario Independiente' >Asesor Inmobiliario Independiente</option>
                <option value='Asesor Agremiado a una cámara' >Asesor Agremiado a una cámara</option>
                <option value='Dueño de Franquicia Inmobiliaria' >Dueño de Franquicia Inmobiliaria</option>
                <option value='Asesor colaborador en una empresa' >Asesor colaborador en una empresa</option>
                <option value='Dueño de una oficina de Bienes Raíces' >Dueño de una oficina de Bienes Raíces</option>
                <option value='Colaborador en una Institución Financiera' >Colaborador en una Institución Financiera</option>
                <option value='Asistente de Asesor Inmobiliario' >Asistente de Asesor Inmobiliario</option>
                </select>
            </div>
            <button onClick={signUp}>REGÍSTRATE</button>
        </div>
        </form>
    </div>
    </section>
  
};

export default Register;
