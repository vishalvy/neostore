import React,{useEffect, useState} from 'react';
import Carousel from 'react-material-ui-carousel'
import Slides from './carouselpaper'
import axios from 'axios'
import {BaseUrl} from '../constants/baseUrl'


function CarouselComp(props)
{
    const [carouselData,setCarouselData] = useState()
    // var imageList = [
    //     {
    //         image: "https://images.unsplash.com/photo-1582037928769-181f2644ecb7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
    //     },
    //     {
    //         image: "https://images.unsplash.com/photo-1537726235470-8504e3beef77?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
    //     }, 
    //     {
    //         image: "https://images.unsplash.com/photo-1593136596203-7212b076f4d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
    //     }
    // ]

    useEffect(() => {
        axios.get(`${BaseUrl}/api/category`)
        .then((res) => {
            const temp = res.data.data
            setCarouselData(temp)
        })
    },[])
    return (
        <Carousel>
            {
                carouselData && carouselData.map( (carousel, i) => <Slides key={i} image={carousel.image} /> )
            }
        </Carousel>
    )
}
export default CarouselComp


