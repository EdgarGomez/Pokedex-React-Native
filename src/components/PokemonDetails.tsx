import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { View, Text, ScrollView, StyleSheet, ScrollViewPropsIOS, TouchableOpacity } from 'react-native'
import { PokemonFull } from '../interfaces/pokemonInterfaces'
import { FadeInImage } from './FadeInImage'

interface Props {
  pokemon: PokemonFull;
}

export const PokemonDetails = ({pokemon}: Props) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        ...StyleSheet.absoluteFillObject,
      }}
    >
      <View style={{
        ...styles.container,
        marginTop: 370,
      }}>
        <Text style={styles.title}>Types</Text>
        <View style={{flexDirection: 'row'}}>
          {
            pokemon.types.map(({type}) => (
              <Text style={{...styles.regularText, marginRight: 10}} key={type.name}>{type.name}</Text>
            ))
          }
        </View>

        <Text style={styles.title}>Weight</Text>
        <Text style={styles.regularText}>{pokemon.weight}kg</Text>

      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Sprites</Text>
      </View>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <FadeInImage uri={pokemon.sprites.front_default} style={styles.basicSprite} />
        <FadeInImage uri={pokemon.sprites.back_default} style={styles.basicSprite} />
        <FadeInImage uri={pokemon.sprites.front_shiny} style={styles.basicSprite} />
        <FadeInImage uri={pokemon.sprites.back_shiny} style={styles.basicSprite} />
      </ScrollView>

      <View style={styles.container}>
        <Text style={styles.title}>Abilities</Text>
        <View style={{flexDirection: 'row'}}>
          {
            pokemon.abilities.map(({ability}) => (
              <Text style={{...styles.regularText, marginRight: 10}} key={ability.name}>{ability.name}</Text>
            ))
          }
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Moves</Text>
        <View style={{flexWrap: 'wrap',flexDirection: 'row'}}>
          {
            pokemon.moves.map(({move}) => (
              <Text style={{...styles.regularText, marginRight: 10}} key={move.name}>{move.name}</Text>
            ))
          }
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Stats</Text>
        <View>
          {
            pokemon.stats.map((stat, i) => (
              <View key={stat.stat.name + i} style={{flexDirection: 'row'}}>
                <Text style={{...styles.regularText, marginRight: 10, width: 150}}>{stat.stat.name}</Text>

                <Text style={{...styles.regularText, fontWeight: 'bold'}}>{stat.base_stat}</Text>
              </View>
            ))
          }
        </View>
        
        <View style={{
          marginBottom: 80,
          marginTop: 20,
          alignItems: 'center'
        }}>
            <FadeInImage uri={pokemon.sprites.front_default} style={styles.basicSprite} />
        </View>

      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: 20,
  },
  regularText: {
    fontSize: 19,
  },
  basicSprite: {
    width: 100,
    height: 100
  }
})