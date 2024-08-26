// import { StatusBar } from "expo-status-bar";
import React from "react";
import { useEffect, useReducer, useState } from "react";
import {
  View,
  Button,
  Text,
  ScrollView,
  Modal,
  StatusBar,
  ActivityIndicator,
  Alert
} from "react-native";
import Box from "./components/Box";
function App() {
  const initialState = {
    count: 0,
    modalVisible: false,
    loading: false,
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return { ...state, count: state.count + 1 };
      case 'DECREMENT':
        return { ...state, count: state.count - 1 };
      case 'SET_LOADING':
        return { ...state, loading: action.payload };
      case "IS_MODAL": return { ...state, modalVisible: action.payload };
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      dispatch({ type: 'SET_LOADING', payload: false });
    }, 2000);
    return () => clearTimeout(timeOut)
  }, [state.loading])

  const increment = () => {
    dispatch({ type: 'INCREMENT' })
  }
  const decriement = () => {
    dispatch({ type: 'DECREMENT' })
  }

  return (
    <View className='bg-slate-200 p-5 py-10 h-full'>

      <View style={{ display: "flex", flexDirection: "row", gap: 10, flexWrap: "wrap", alignContent: "stretch", justifyContent: "space-between", height: 400, backgroundColor: 'white', padding: 5 }} >
        <Box style={{ backgroundColor: "red", alignSelf: 'flex-end' }} > box 1 </Box>
        <Box style={{ backgroundColor: "blue", }} > box 2 </Box>
        <Box style={{ backgroundColor: "plum", }} > box 3 </Box>
        <Box style={{ backgroundColor: "green", }} > box 4 </Box>
      </View>

      <View className='flex flex-row'>
        <Button title="increment" onPress={increment} />
        <Button title="decriement" onPress={decriement} />
      </View>
      <View>
        <Text >Count: {state.count}</Text>
      </View>

      <View className='mt-5' >
        <ActivityIndicator size={'small'} style={{ display: `${state.loading ? 'flex' : 'none'}` }} color={'red'} />
        <Button title="isLaoding" onPress={() => dispatch({ type: "SET_LOADING", payload: true })} />
      </View>
      <View className='my-5'  >
        <Button title="open" color={'blue'} onPress={() => dispatch({ type: "IS_MODAL", payload: true })} />
      </View>
      <View>
        <StatusBar backgroundColor="red" barStyle='dark-content' />
      </View>
      <Modal visible={state.modalVisible} animationType="slide" presentationStyle="overFullScreen" >
        <Text>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas delectus repellendus ipsam ullam cumque accusantium doloribus quasi quia, laudantium dolores! Facilis, suscipit? Quos vel, id architecto culpa soluta quas eius!
        </Text>
        <Button title="close" onPress={() => dispatch({ type: "IS_MODAL", payload: false })} />
      </Modal>

      <View style={{ flex: 1 }} >
        <Button title="alert" onPress={() => Alert.alert('malumot olishda xatolik bor', "Iltimos qaytadan urinib ko'ring", [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        ])} />
      </View>

    </View>
  );
}
export default App
