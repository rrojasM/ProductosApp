import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const ProtectedScreen = () => {
  const { user, token, logOut } = useContext(AuthContext)
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Protected Screen</Text>


        {
          (user?.img) && (

            <Image
              source={{ uri: user.img }}
              style={{ marginTop: 20, width: '99%', height: 300, borderRadius: 10 }}
            />
          )
        }

        <Button
          title='Logout'
          color='#5856d6'
          onPress={logOut}
        />

        <Text style={styles.label}>
          {JSON.stringify(user, null, 5)}
        </Text>
        <Text style={styles.label}>
          {token}
        </Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    marginBottom: 20
  },
  label: {
    fontSize: 18,
    marginBottom: 10
  }
})

export default ProtectedScreen;