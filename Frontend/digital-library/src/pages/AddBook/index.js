import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import './styles.css'
import * as Icon from 'react-bootstrap-icons'
import { navigationTo } from "../../action/constant/function";

function AddBook(){



    return(
        <div>
            <Header pageName={'Add book'} />

            <section className="add-book">
                <div onClick={() => navigationTo('add-book-details')}>
                    <Icon.PlusLg className="iconAdd" />
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default AddBook;