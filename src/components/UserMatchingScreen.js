import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

const UserMatchingScreen = () => {
  const [interests, setInterests] = useState('');
  const [matchedUsers, setMatchedUsers] = useState([]);

  const handleMatchUsers = () => {
    // Split the comma-separated interests into an array
    const interestsArray = interests.split(',').map((interest) => interest.trim());

    // Check if the interests array is empty
    if (interestsArray.length === 0) {
      console.warn('Please enter interests to match users.');
      return;
    }

    // Send a GET request to the server to fetch matched users
    fetch(`http://your-api-url/match?interests=${interestsArray.join(',')}`)
      .then((response) => response.json())
      .then((data) => {
        // Handle matched users data
        setMatchedUsers(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <View>
      <Text>Find Matching Users</Text>
      <TextInput
        placeholder="Interests (comma-separated)"
        value={interests}
        onChangeText={(text) => setInterests(text)}
      />
      <Button title="Match Users" onPress={handleMatchUsers} />
      <FlatList
        data={matchedUsers}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.username}</Text>
            {/* Display other user details */}
            {/* For example: <Text>Email: {item.email}</Text> */}
          </View>
        )}
      />
    </View>
  );
};

export default UserMatchingScreen;
