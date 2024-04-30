import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";

function Account(){

    return(
        <div>
            <Header pageName={'Account'} />

            <section>
                <h1 className="text-center">Contact</h1>
            </section>

            <Footer />
        </div>
    )
}

export default Account;