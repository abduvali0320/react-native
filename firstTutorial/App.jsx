import { useState } from "react";
import {
  View,
  Button,
  Text,
  ScrollView,
} from "react-native";
function App() {
  const [count, setCount] = useState(0)
  const increment = (e) => {
    setCount(prev => prev + 1)
  }

  const decriement = (e) => {
    setCount(prev => prev - 1)
  }
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(!modalVisible);
  }
  return (
    <View className='bg-slate-200 p-5 h-full'>
      <Text>Count: {count}</Text>
      <View  >
        <Button title="increment" onPress={increment} />
        <Button title="decriement" onPress={decriement} />
        <Button title="modal open" onPress={openModal} />
      </View>

      <View>
      </View>

      <ScrollView>
        {[...Array(50)].map((_, i) => (
          <Text key={i}>Line {i + 1}</Text>
        ))}
      </ScrollView>

    </View>
  );
}
export default App
