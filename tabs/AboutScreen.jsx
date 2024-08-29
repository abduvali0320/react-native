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
  Alert,
  FlatList,
  SectionList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Pressable
} from "react-native";
import Box from "../components/Box";
import dbJson from "../db.json"
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
function AboutScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({
    title: '',
    body: ''
  });
  const handleGetValue = (name, value) => {
    setInputData({
      ...inputData,
      [name]: value
    })
  }
  const [data, setData] = useState([])
  const handleRefresh = () => {
    setRefreshing(true)
    getData(15)
  }

  const getData = async (limit = 10) => {
    setLoading(true);
    try {
      const res = await axios(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`)
      // console.log(JSON.stringify(res.status, null, 2));
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
      setRefreshing(false)
    }
  }
  const handleSendData = async () => {
    setLoading(true);
    try {
      const res = await axios(`https://jsonplaceholder.typicode.com/posts`, { method: 'POST', data: JSON.stringify(inputData), headers: { 'Content-Type': 'application/json' } })
      if (res.status === 201) {
        setData([...data, res.data]);
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
      setRefreshing(false)
    }
  }
  useEffect(() => {
    getData(10)
  }, [])
  const path = useNavigation()
  return (
    <View className='bg-slate-200 p-5 py-10 h-full' style={styles.container}>
      <Button title='Home' onPress={() => path.navigate('Home')} />
      <View style={styles.form} >
        <TextInput
          onChangeText={(value) => handleGetValue('title', value)} autoCapitalize="characters" style={styles.input} placeholder="title"
        />
        <TextInput
          autoCapitalize="characters" style={styles.input} placeholder="body"
          onChangeText={(value) => handleGetValue('body', value)}
        />
        <Pressable style={styles.buttonBox} onPress={handleSendData} disabled={loading} >
          <Text style={styles.buttonText}> {loading ? <ActivityIndicator color={'white'} /> : 'add'} </Text>
        </Pressable>
      </View>
      <Button title="old refersh" onPress={() => getData(10)} style={styles.button} />
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.textBox} key={item.id} >
              <Text style={styles.textInput} className='bg-blue-300'>
                {item.id}.{item.title}
              </Text>
              <Text style={styles.textInput} >
                {item.body}
              </Text>
            </View>
          )
        }}
        ListHeaderComponent={() => {
          return (
            <Text style={{ fontSize: 20, fontWeight: "bold" }} >
              {loading ? 'loading...' : `total information: ${data.length}`}
            </Text>
          )
        }}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />

    </View>
  );
}
export default AboutScreen
const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 10
    padding: 10
  },
  button: {
    backgroundColor: "red",
    color: "white",
    padding: 50,
    marginTop: 10,
  },
  textInput: {
    backgroundColor: "white",
    padding: 10,
    fontSize: 18
  },
  textBox: {
    marginTop: 10,
  },
  form: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "silver",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    display: "flex",
    gap: 10
  },
  input: {
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "silver",
    padding: 5,
  },
  buttonText: {
    width: 150,
    textAlign: "center",
    paddingVertical: 7,
    backgroundColor: "lightblue",
    fontSize: 18,
    color: 'white',
    borderRadius: 10

  },
  buttonBox: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
})
