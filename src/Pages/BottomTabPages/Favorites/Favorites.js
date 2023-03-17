import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AuthModal from '../../../components/modals/AuthModal/AuthModal';

import styles from './Favorites.style';

const Favorites = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [userSession, setUserSession] = useState();

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      setUserSession(user);
      if (!user) {
        setModalVisible(true);
        showMessage({
          message: 'You must be logged in to see your favourites!',
          type: 'warning',
          floating: true,
          duration: 3500,
        });
      } else {
        setModalVisible(false);
      }
    });
  }, []);

  function handleLogout() {
    auth().signOut();
  }

  return (
    <View>
      <View style={styles.header_container}>
        <Text style={styles.header_text}>Favorites</Text>
        <Icon name="logout" size={30} color="white" onPress={handleLogout} />
      </View>
      {userSession ? (
        <View>
          <Text>FAVORİLER</Text>
        </View>
      ) : (
        <AuthModal
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      )}
    </View>
  );
};

export default Favorites;
