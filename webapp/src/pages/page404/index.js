import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import './styles.css'
import imgError from '../../assets/404-error.png'

function Page404(){

    return(
        <div>
            <Header pageName={'Page not found!'} />

            <section className="card-not-found">
                <img src={imgError} />
                <h3 className="text-center">Something Went Wrong!</h3>
                <p>We're sorry, the page you requested could not be found, please go back to the homepage</p>
                <button>
                    Go back home
                </button>
            </section>

            <Footer />
        </div>
    )
}

export default Page404;