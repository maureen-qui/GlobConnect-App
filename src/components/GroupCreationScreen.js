import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator } from 'react-native';

const GroupCreationScreen = () => {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateGroup = () => {
    setLoading(true);

    // Send a POST request to create the group
    fetch('https://maureen-qui.github.io/GlobConnectApp/groups', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: groupName,
        description: groupDescription,
        members: [], // Add members as needed
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        // Handle group creation success
        console.log('Group created:', data);
        // Provide user feedback (e.g., show success message)
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error creating group:', error);
        // Handle errors and show user-friendly messages
      });
  };

  return (
    <View>
      <Text>Create a Group</Text>
      <TextInput
        placeholder="Group Name"
        value={groupName}
        onChangeText={(text) => setGroupName(text)}
      />
      <TextInput
        placeholder="Description"
        value={groupDescription}
        onChangeText={(text) => setGroupDescription(text)}
      />
      <Button title="Create Group" onPress={handleCreateGroup} disabled={loading} />
      {loading && <ActivityIndicator size="small" color="#0000ff" />}
    </View>
  );
};

export default GroupCreationScreen;
