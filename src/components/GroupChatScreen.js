import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import io from 'socket.io-client';

// Use the actual URL of your Socket.io server
const socket = io('https://GlobConnectApp.herokuapp.com');

const GroupChatScreen = ({ groupId, username }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Join the Socket.io room for the group
    socket.emit('joinGroup', { groupId, username });

    // Listen for group messages
    socket.on('groupMessage', ({ groupId: messageGroupId, message: newMessage }) => {
      if (messageGroupId === groupId) {
        setMessages([...messages, newMessage]);
      }
    });

    return () => {
      // Leave the Socket.io room when the component unmounts
      socket.emit('leaveGroup', { groupId, username });
      socket.off('groupMessage');
    };
  }, [groupId, messages, username]);

  const handleSendMessage = () => {
    if (message.trim() === '') {
      return;
    }

    // Send the message to the server
    socket.emit('groupMessage', { groupId, message, sender: username });
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.sender}>{item.sender}:</Text>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    marginBottom: 8,
  },
  sender: {
    fontWeight: 'bold',
  },
  messageText: {
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 8,
  },
});

export default GroupChatScreen;
