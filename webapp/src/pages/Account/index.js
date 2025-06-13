import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import './styles.css'
import * as Icon from 'react-bootstrap-icons'
import { getInfoUser, updateUser } from "../../action/API/user";
import { deleteUserData, getUserData } from "../../action/API/setup";
import { navigationTo } from "../../action/constant/function";

function Account(){

    const [user, setUser] = useState(null)
    const [cellPhone, setCellPhone] = useState('')
    const [isValidCellPhone, setIsValidCellPhone] = useState(true)

    const [res, setRes] = useState(null)

    useEffect(() => {
        const u = getUserData()
        setUser(u)
        setCellPhone('+351 ' + u.cell_phone);
        getInfoUser(u.id)
            .then((res) => {
                console.log("USerInfo: " + JSON.stringify(res))
                //setUser(u)
                /* const onlyNums = res?.cell_phone.replace(/[^0-9]/g, '');
                if (onlyNums.length < 13) {
                    setCellPhone('+351 ' + onlyNums.slice(3));
                } */
            })
    }, [])

    const logout = () => {
        deleteUserData();
        window.location.reload();
        navigationTo('signin', true)
    }

    const update = () => {
        let cell_phone = cellPhone.replace(' ','');
        if (cell_phone.length == 13){
            setIsValidCellPhone(true)
            updateUser(user.id, cell_phone)
                .then((res) => {
                    setRes(res)
                })
                
            
        } else {
            setIsValidCellPhone(false)
        }
        console.log(cell_phone);
    }

    const handleCellPhone = (event) => {
        const value = event.target.value;
        const onlyNums = value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 13) {
            setCellPhone('+351 ' + onlyNums.slice(3));
        }
    }

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

    return(
        <div>
            <Header pageName={'Account'} />

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
                    <h3>Update</h3>
                    <label>Name</label>
                    <input type="text"value={user?.name} readOnly />
                    <label>Email</label>
                    <input type="email" value={user?.email} readOnly />
                    <label>Cell phone</label>
                    <input type="tel" value={cellPhone} onChange={handleCellPhone} className={!isValidCellPhone ? 'errorBorder' : 'normalBorder'} />
                    {!isValidCellPhone && <p style={{ color: 'red' }}>Invalid cell phone</p>}
                    <div className="divButton">
                        <button className="btUpdate" onClick={() => update()}>
                            Update
                        </button>
                        <button className="btLogout"  onClick={() => logout()}>
                            Logout
                        </button>
                    </div>
                    <p className="changePassword" onClick={() => goPage()}>You how change the password?</p>
                </div>
                
            </section>

            <Footer />
        </div>
    )
}

export default Account;