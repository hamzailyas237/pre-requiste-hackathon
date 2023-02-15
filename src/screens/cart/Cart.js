
import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScrollView } from 'react-native-gesture-handler'
import { ProductCard } from '../../components/card/ProductCard'
import { CardSkeleton } from '../../components/skeleton/CardSkeleton'
import { Text } from 'native-base'


const Cart = () => {

  const [cartProducts, setCartProducts] = useState([])
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    const getCartProducts = async () => {
      const user_id = await AsyncStorage.getItem('id')
      const token = await AsyncStorage.getItem('token')
      axios.get(`https://ruby-long-salamander.cyclic.app/api/cart/${user_id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => {
          setCartProducts(res.data.cart_products)
          setLoader(false)
        })
        .catch(err => {
          setLoader(false)
          console.log(err);
        })
    }
    getCartProducts()
  }, [cartProducts])

  return (
    <ScrollView>
      <View>
        {loader ? <CardSkeleton />
          :
          cartProducts.length != 0 ? cartProducts.map((data, i) => {
            return <ProductCard product={data.product} cart={true} cartProducts={cartProducts} key={i} />
          })
            :
            <Text textAlign='center' mt='5' fontSize='18'>Your cart is empty</Text>

        }

      </View>
    </ScrollView>
  )
}

export default Cart