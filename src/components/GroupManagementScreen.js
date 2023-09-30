import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, ActivityIndicator } from 'react-native';

const GroupManagementScreen = ({ userId }) => {
  const [groupName, setGroupName] = useState('');
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the list of available groups
    fetch('https://maureen-qui.github.io/GlobConnectApp/groups')
      .then((response) => response.json())
      .then((data) => {
        setGroups(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching groups:', error);
        setLoading(false);
      });
  }, []);

  const handleCreateGroup = () => {
    setLoading(true);

    // Send a POST request to create a new group
    fetch('https://maureen-qui.github.io/GlobConnectApp/groups') {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: groupName,
        interests: [], // Add interests, skills, and objectives as needed
        skills: [],
        objectives: [],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle group creation success
        console.log('Group created:', data);
        setGroupName('');
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error creating group:', error);
        setLoading(false);
      });
  };

  const handleJoinGroup = (groupId) => {
    setLoading(true);

    // Send a POST request to join a group
    fetch(`https://maureen-qui.github.io/GlobConnectApp/groups/${groupId}/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle group joining success
        console.log('Joined group:', data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error joining group:', error);
        setLoading(false);
      });
  };

  return (
    <View>
      <Text>Create or Join a Group</Text>
      <TextInput
        placeholder="Group Name"
        value={groupName}
        onChangeText={(text) => setGroupName(text)}
      />
      <Button title="Create Group" onPress={handleCreateGroup} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
              <Button title="Join" onPress={() => handleJoinGroup(item._id)} />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default GroupManagementScreen;
