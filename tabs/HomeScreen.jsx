import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

const HomeScreen = () => {
  const path = useNavigation()
  return (
    <View style={styles.container}  >
      <Text style={styles.homeText} >Home Screen</Text>
      <Button title='Setting' onPress={() => path.navigate('Setting')} />
    </View>
  )
}

export default HomeScreen
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10
  },
  homeText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    padding: 20,
  }
})