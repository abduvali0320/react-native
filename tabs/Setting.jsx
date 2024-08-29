import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Button, Text, View } from 'react-native'

const Setting = () => {
  const path = useNavigation()
  return (
    <View>
      <Text>
        Setting
      </Text>
      <Button title='contact' onPress={() => path.navigate('Contact')} />
    </View>
  )
}

export default Setting