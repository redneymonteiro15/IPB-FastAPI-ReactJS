import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import './styles.css'
import * as Icon from 'react-bootstrap-icons'
import { changePassword, getInfoUser, updateUser } from "../../action/API/user";
import { deleteUserData, getUserData } from "../../action/API/setup";

function ChangePassword(){

    const [user, setUser] = useState(null)


    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    const [res, setRes] = useState(null)
    const [validPassword, setValidPassword] = useState(null)
    const [validNewPassword, setValidNewPassword] = useState(null)
    const [validConfirmNewPassword, setValidConfirmNewPassword] = useState(null)
    const [resValid, setResValid] = useState('')

    useEffect(() => {
        const u = getUserData()
        getInfoUser(u.id)
            .then((res) => {
                setUser(res)
                //setCellPhone(res?.cell_phone)
            })
    }, [])

    useEffect(() => {
        let timer;
        if (res !== null) {
            timer = setTimeout(() => {
                setRes(null);
            }, 5000);  //wait 5s
        }

        return () => clearTimeout(timer);
    }, [res]);

    const goPage = () => {
        window.location.href = '/change-password';
    }

    const update = () => {
        if(isValidForm()){
            console.log('Valid')
            changePassword(user.id, password, newPassword)
                .then((res) => {
                    setRes(res)
                    if(res === true){
                        setPassword('')
                        setNewPassword('')
                        setConfirmNewPassword('')
                    }
                })
        }   
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }
    const handleNewPassword = (event) => {
        setNewPassword(event.target.value)
        
    }
    const handleConfirmPassword = (event) => {
        setConfirmNewPassword(event.target.value)
    }

    const [errors, setErrors] = useState({});

    const isValidForm = () => {
        setValidPassword(true)
        setValidNewPassword(true)
        setValidConfirmNewPassword(true)

        const newErrors = {};

        let foundErrors = false

        if(!password){
            newErrors.password = "Password é obrigatória";
            setValidPassword(false)
            foundErrors = true 
            
        }
    
        // Validações aqui
        if (!newPassword) {
            newErrors.newPassword = 'Nova Password é obrigatória';
            setValidNewPassword(false)
            foundErrors = true 

        } else if (newPassword.length < 8) {
            newErrors.newPassword = 'Deve ter pelo menos 8 caracteres';
            setValidNewPassword(false)
            foundErrors = true 
            
        } else if (!hasNumber(newPassword)) {
            newErrors.newPassword = 'Deve conter números.';
            setValidNewPassword(false)
            foundErrors = true 

        } else if (!hasUpperCase(newPassword) || !hasLowerCase(newPassword)) {
            newErrors.newPassword = 'Deve conter letras maiusculas e minusculas.';
            setValidNewPassword(false)
            foundErrors = true 

        } else if (!hasSpecialCharacter(newPassword)) {
            newErrors.newPassword = 'Deve conter caracteres especiais.';
            setValidNewPassword(false)
            foundErrors = true 

        }
        console.log("New password: -" + newPassword + '-')
        console.log('Confirm password: -'+ confirmNewPassword + '-')
        if (newPassword !== confirmNewPassword) {
            newErrors.confirmNewPassword = 'As Passwords não coincidem';
            setValidConfirmNewPassword(false)
            setValidNewPassword(false)
            foundErrors = true 
        }   

        if (!foundErrors) {
            newErrors.res = 'Válido'
        }
        
        setErrors(newErrors);
        
    
        return !foundErrors;
    };
    
    const hasNumber = (value) => /\d/.test(value);
    const hasUpperCase = (value) => /[A-Z]/.test(value);
    const hasLowerCase = (value) => /[a-z]/.test(value);
    const hasSpecialCharacter = (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value);
    

    
    

    const navigationTo = () => {
        window.location.href = '/account'
    }

    return(
        <div>
            <Header pageName={'Change password'} />

            <section className="account">
                <div className="card-result">
                    {res !== null && (
                        res === true 
                        ?   <div className="card-successfull">
                                <p><Icon.CheckCircle /> successfully</p>
                            </div>
                        :   <div className="card-danger">
                                <p><Icon.XCircle /> Danger</p>
                            </div>
                    ) }
                </div>
                <div>
                    <h3><Icon.ArrowLeft className="iconBack" onClick={() => navigationTo()}/> Change password</h3>
                    <label>Password</label>
                    <input type="password" placeholder='********' value={password} onChange={handlePassword} className={validPassword === false ? 'inputError' : 'input'}/>
                    <p>{errors.password}</p>
                    <label>New password</label>
                    <input type="password" placeholder='********' value={newPassword} onChange={handleNewPassword} className={validNewPassword === false ? 'inputError' : 'input'} />
                    <p>{errors.newPassword}</p>
                    <label>Confirm new password</label>
                    <input type="password" placeholder='********' value={confirmNewPassword} onChange={handleConfirmPassword} className={validConfirmNewPassword === false ? 'inputError' : 'input'}/>
                    <p>{errors.confirmNewPassword}</p>
                    <p>{errors.res}-</p>
                    <button className="btUpdate" onClick={() => update()}>
                        Update
                    </button>
                </div>
                
            </section>

            <Footer />
        </div>
    )
}

export default ChangePassword;