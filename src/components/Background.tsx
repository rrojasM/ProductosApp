import { View, Text, Platform, Dimensions } from 'react-native'
import React from 'react'

const Background = () => {
  const dimensiones = () => {
    console.log("El ancho de la pantalla es:", Dimensions.get('window').width);
    console.log("La altura de la pantalla es:", Dimensions.get('window').height);
    console.log('La resolución de la pantalla actual:', Dimensions.get('window').scale);
  }

  return (
    <View
      style={{
        position: 'absolute',
        backgroundColor: '#0070A6',
        top: -330,
        width: 1000,
        height: 1200,
        transform: [
          { rotate: '-70deg' }
        ]

      }}

      {...dimensiones()}
    />
  )
}

export default Background;