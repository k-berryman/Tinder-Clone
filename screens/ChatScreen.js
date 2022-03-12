import React from 'react'
import { View, Text } from 'react-native'
import useAuth from '../hooks/useAuth';

const ChatScreen = () => {
  const { user } = useAuth();
  console.log(user);

  return (
    <View>
      <Text>I'm Chatty</Text>
    </View>
  )
}

export default ChatScreen
