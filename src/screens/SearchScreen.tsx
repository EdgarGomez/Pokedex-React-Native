import React, { useState } from 'react'
import { FlatList } from 'react-native';
import { View, Text, Platform, ActivityIndicator, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SearchInput } from '../components/SearchInput';
import { PokemonCard } from '../components/PokemonCard';
import { Loading } from '../components/Loading';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { styles } from '../theme/appTheme';
import { Dimensions } from 'react-native';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { useEffect } from 'react';

const screenWidth = Dimensions.get('window').width;

export const SearchScreen = () => {

  const {top} = useSafeAreaInsets();
  const {isFetching, simplePokemonList} = usePokemonSearch();
  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([])
  const [term, setTerm] = useState('');

  useEffect(() => {
    
    if(term.length === 0) {
      setPokemonFiltered([]);
    }

    if(isNaN(Number(term))) {
      setPokemonFiltered(
        simplePokemonList.filter(
          poke => poke.name.toLowerCase().includes(term.toLowerCase()))
      );
    } else {
      const pokemonById = simplePokemonList.find(poke => poke.id === term);
      setPokemonFiltered(
        (pokemonById) ? [pokemonById] : []
      );
    }
  }, [term])

  if(isFetching) {
    return (
      <Loading />
    )
  }

  return (
    <View style={{ 
      flex: 1, 
      //marginTop: (Platform.OS === 'ios') ? top : top + 10,
      marginHorizontal: 20
    }}>
      <SearchInput
        onDebounce={(value) => setTerm(value)}
        style={{
          position: 'absolute',
          zIndex: 999,
          width: screenWidth - 40,
          top: (Platform.OS === 'ios') ? top : top + 30,
        }}
      />

      <FlatList
          data={pokemonFiltered}
          showsVerticalScrollIndicator={false}
          keyExtractor={(pokemon)=>pokemon.id}
          numColumns={2}
          ListHeaderComponent={(
            <Text style={{
              ...styles.title,
              ...styles.globalMargin,
              //top: top + 20,
              //marginBottom: top + 20,
              paddingBottom: 10,
              marginTop: (Platform.OS === 'ios') ? top + 60 : top + 80,

            }}>{term}</Text>
          )}
          renderItem={({item})=> <PokemonCard pokemon={item} />}
      />
    </View>
  )
}