

import { View, Text, Alert, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ScrollView } from 'react-native-gesture-handler'
import AppSwiper from '../../components/swiper/AppSwiper'
import banner1 from '../../assets/banner1.jpg'
import banner2 from '../../assets/banner2.png'
import banner3 from '../../assets/banner3.jpg'
import banner4 from '../../assets/banner4.jpg'
import banner5 from '../../assets/banner5.jpg'
import banner6 from '../../assets/banner6.jpg'
import { CardSkeleton } from '../../components/skeleton/CardSkeleton'
import { ProductCard } from '../../components/card/ProductCard'

const Home = () => {

  const [products, setProducts] = useState([])
  const [loader, setLoader] = useState(true)

  const swiperImages = [banner1, banner2, banner3, banner4, banner5, banner6]

  useEffect(() => {
    const getAllProducts = async () => {
      await axios.get('https://ruby-long-salamander.cyclic.app/api/products')
        .then(res => {
          setProducts(res.data.products)
          setLoader(false)
        })
        .catch(err => {
          setLoader(false)
        })
    }
    getAllProducts()
  }, [products])


  return (

    <ScrollView>

      <AppSwiper swiperImages={swiperImages} />
      <View>
        {loader ? <CardSkeleton/>
          :
          products && products.map((product, i) => {
            return <ProductCard product={product} key={i} />
          })
        }
      </View>
    </ScrollView>

  )
}

export default Home
