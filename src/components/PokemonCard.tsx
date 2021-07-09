import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { ImageEditor, StyleSheet } from 'react-native'
import { Dimensions } from 'react-native'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { SimplePokemon } from '../interfaces/pokemonInterfaces'
import { FadeInImage } from './FadeInImage'
import ImageColors from 'react-native-image-colors';

const windowWidth = Dimensions.get('window').width;

interface Props {
  pokemon: SimplePokemon;
}

export const PokemonCard = ({pokemon}: Props) => {

  const [bgColor, setBgColor] = useState('grey');
  const isMounted = useRef(true);

  useEffect(() => {
    //IOS background
    //Android dominant
    ImageColors.getColors(pokemon.picture, {fallback: 'grey'})
      .then(colors => {

        if(!isMounted.current) return;

        (colors.platform === 'android')
          ? setBgColor(colors.dominant || 'grey')
          : setBgColor(colors.background || 'grey')
      });

      return () => {
        isMounted.current= false;
      }
  }, [])

  return (
    <TouchableOpacity
      activeOpacity={0.9}
    >
      <View style={{
        ...styles.cardContainer,
        width: windowWidth * 0.4,
        backgroundColor: bgColor
      }}>
        <View>
          <Text style={styles.name}>
            {pokemon.name}
            {'\n#' + pokemon.id}
          </Text>
        </View>

        <View style={styles.pokebolaContainer}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokebola}
          />
        </View>
        
        <FadeInImage
          uri={ pokemon.picture}
          style={styles.pokemonImage}
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10
  },
  pokebolaContainer: {
    width: 100,
    height:100,
    position: 'absolute',
    bottom: 0,
    right:0,
    overflow: 'hidden'
  },
  pokebola: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: -25,
    right:-25,
    opacity: 0.5
  },
  pokemonImage:{
    width: 120,
    height: 120,
    position: 'absolute',
    right: -8,
    bottom: -8
  },
})