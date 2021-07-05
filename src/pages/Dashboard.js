import React, { useEffect } from 'react';
import Axios from 'axios';
import PromoBanner from '../PromoBanner';
import ShopByCategories from '../ShopByCategories';
import FashionRecommendation from '../FashionRecommendation';
import DiscoverAmazon from '../DiscoverAmazon';
import ProductsDashboard from '../ProductsDashboard';
import Footer1 from '../Footer1';
import MainFooter from '../MainFooter';
import { useStateValue } from '../StateProvider';

function Dashboard() {
    const [state, dispatch] = useStateValue()

    Axios.defaults.withCredentials = true

    useEffect(() => {
        Axios.get("http://localhost:3001/login").then(response => {
            if (response.data.loggedIn === true) {
                dispatch({
                    type: "USER_LOGIN",
                    payload: {
                        user: response.data.user[0].user_email
                    }
                })
            }
        })
    }, [])

    return (
        <main className="main">
            <PromoBanner />
            <ShopByCategories />
            <DiscoverAmazon
                title1="AMAZON DELIVERS"
                title2="TO YOU"
                desc="Worldwide shipping. We ship to over 100 countries and regions, right to your doorstep"
                image="https://i.ibb.co/dJMJcgF/erda-estremera-sx-Nt9g77-PE0.png"
            />
            <ProductsDashboard
                title="Last Viewed"
            />
            <ProductsDashboard
                title="Amazon Top Sellers"
            />
            <FashionRecommendation />
            <ProductsDashboard
                title="Thomas, this must have for you"
            />
            <DiscoverAmazon
                title1="SUBSCRIBE TO THE"
                title2="NEWS"
                desc="Be aware of all discounts and bargains! Don't miss your benefit!"
                image="https://i.ibb.co/Rg5xdgb/pretty-beautiful-woman-with-blonde-long-hair-having-excited-happy-facial-expression-min-1536x1024.png"
            />
            <Footer1 />
            <MainFooter />
        </main>
    )
}

export default Dashboard
