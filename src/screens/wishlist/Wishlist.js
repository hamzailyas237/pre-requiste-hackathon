

import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { ProductCard } from '../../components/card/ProductCard'
import { ScrollView } from 'react-native-gesture-handler'
import { useFocusEffect } from '@react-navigation/native';
import { CardSkeleton } from '../../components/skeleton/CardSkeleton'
import { Text } from 'native-base'

const Wishlist = () => {

  const [wishlistProducts, setWishlistProducts] = useState([])
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    const getWishlishtProdcuts = async () => {
      const user_id = await AsyncStorage.getItem('id')
      const token = await AsyncStorage.getItem('token')
      axios.get(`https://ruby-long-salamander.cyclic.app/api/wishlist/${user_id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => {
          setWishlistProducts(res.data.wishlist_products)
          setLoader(false)
        })
        .catch(err => {
          setLoader(false)
          console.log(err);
        })
    }
    getWishlishtProdcuts()
  }, [wishlistProducts])

  return (
    <ScrollView>
      <View>

        {loader ? <CardSkeleton />
          :
          wishlistProducts.length != 0 ? wishlistProducts.map((data, i) => {
            return <ProductCard product={data.product} key={i} wishlist={true} wishlistProducts={wishlistProducts} />
          })
            :
            <Text textAlign='center' mt='5' fontSize='18'>Your wishlist is empty</Text>
        }

      </View>

    </ScrollView>

  )
}
export default Wishlist