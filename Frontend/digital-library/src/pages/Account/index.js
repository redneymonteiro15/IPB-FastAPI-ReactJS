import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import './styles.css'
import * as Icon from 'react-bootstrap-icons'
import { getInfoUser, updateUser } from "../../action/API/user";
import { deleteUserData } from "../../action/API/setup";

function Account(){

    const [user, setUser] = useState(null)
    const [cellPhone, setCellPhone] = useState('')
    const [isValidCellPhone, setIsValidCellPhone] = useState(true)

    const [res, setRes] = useState(null)

    useEffect(() => {
        getInfoUser('66251e4eede07cfa79f98bf9')
            .then((res) => {
                setUser(res)
                //setCellPhone(res?.cell_phone)
            })
    }, [])

    const logout = () => {
        deleteUserData();
        window.location.reload();
    }

    const update = () => {
        let cell_phone = cellPhone.replace(' ','');
        if (cell_phone.length == 13){
            setIsValidCellPhone(true)
            updateUser('66251e4eede07cfa79f98bf9', cell_phone)
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
                    <label>Number student</label>
                    <input type="text" value={user?.num_student} readOnly/>
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
                    <p className="changePassword">Change password</p>
                </div>
                
            </section>

            <Footer />
        </div>
    )
}

export default Account;