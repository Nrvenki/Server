import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SuccessScreen = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <View style={styles.modal}>
      <FontAwesome name="check-circle" size={80} color="green" />
      <Text style={styles.modalTitle}>Login Successful!</Text>
      <Text style={styles.modalText}>Redirecting...</Text>
    </View>
  );
};

const FailureScreen = ({ onClose }) => (
  <View style={styles.modal}>
    <FontAwesome name="times-circle" size={80} color="red" />
    <Text style={styles.modalTitle}>Login Failed</Text>
    <Text style={styles.modalText}>Invalid username or password.</Text>
    <TouchableOpacity onPress={onClose} style={styles.tryAgainBtn}>
      <Text style={styles.tryAgainText}>Try Again</Text>
    </TouchableOpacity>
  </View>
);

const Login = () => {
  const navigation = useNavigation();
  const [uname, setUname] = useState('');
  const [pwd, setPwd] = useState('');
  const [isSuccess, setIsSuccess] = useState(null);

  const handleLogin = () => {
    if (uname === 'admin' && pwd === 'siva') {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
  };

  const handleCloseSuccess = () => {
    setIsSuccess(null);
    navigation.navigate('Home');
  };

  const handleCloseFailure = () => {
    setIsSuccess(null);
  };

  return (
    <View style={styles.page}>
      <View style={styles.loginBox}>
        <Text style={styles.title}>🔐 Welcome Back</Text>
        <Text style={styles.subtitle}>Please login to continue</Text>

        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={uname}
          onChangeText={setUname}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={pwd}
          onChangeText={setPwd}
          secureTextEntry
        />

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>© 2025 DiaBet App. All rights reserved.</Text>

      {/* Modals */}
      <Modal visible={isSuccess === true} transparent>
        <SuccessScreen onClose={handleCloseSuccess} />
      </Modal>
      <Modal visible={isSuccess === false} transparent>
        <FailureScreen onClose={handleCloseFailure} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f3e8ff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginBox: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4c1d95',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontWeight: '600',
    color: '#444',
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
  },
  loginBtn: {
    backgroundColor: '#7c3aed',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 24,
    alignItems: 'center',
  },
  loginText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 30,
    fontSize: 12,
    color: '#888',
  },
  modal: {
    flex: 1,
    backgroundColor: '#ffffffee',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  tryAgainBtn: {
    backgroundColor: '#7c3aed',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 16,
  },
  tryAgainText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default Login;
