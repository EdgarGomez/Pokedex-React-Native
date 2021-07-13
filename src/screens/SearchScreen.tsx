import React from 'react'
import { FlatList } from 'react-native';
import { View, Text, Platform, ActivityIndicator, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SearchInput } from '../components/SearchInput';
import { PokemonCard } from '../components/PokemonCard';
import { Loading } from '../components/Loading';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { styles } from '../theme/appTheme';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const SearchScreen = () => {

  const {top} = useSafeAreaInsets();
  const {isFetching, simplePokemonList} = usePokemonSearch();

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
        style={{
          position: 'absolute',
          zIndex: 999,
          width: screenWidth - 40,
          top: (Platform.OS === 'ios') ? top : top + 30,
        }}
      />

      <FlatList
          data={simplePokemonList}
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

            }}>Pokedex</Text>
          )}
          renderItem={({item})=> <PokemonCard pokemon={item} />}
      />
    </View>
  )
}