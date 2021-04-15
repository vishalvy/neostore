import React from 'react'
import Carousel from './carousel/carousel'
import Layout from './appbar/layout'
import TopProducts from './TopProducts/TopProducts'
import Footer from './footer/footer'
import Appbar from './appbar/appbar'

function dashboard({children}) {
    return (
        <>
            {/* <Layout/> */}
            {/* <Appbar/> */}
            <Carousel/>
            <TopProducts/>
            {/* <Footer/> */}
        </>
    )
}

export default dashboard
