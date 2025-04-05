// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   Modal,
//   StyleSheet,
//   Alert,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons, FontAwesome, Feather } from '@expo/vector-icons';

// const Navbar = () => {
//   const navigation = useNavigation();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [confirmVisible, setConfirmVisible] = useState(false);
//   const [message, setMessage] = useState(null);

//   const handleLogout = () => {
//     setConfirmVisible(true);
//   };

//   const confirmLogout = () => {
//     setConfirmVisible(false);
//     setMessage('logout');
//     setTimeout(() => {
//       setMessage(null);
//       navigation.navigate('Login');
//     }, 2000);
//   };

//   const cancelLogout = () => {
//     setConfirmVisible(false);
//     setMessage('cancel');
//     setTimeout(() => setMessage(null), 2000);
//   };

//   const handleNavigate = (screen) => {
//     navigation.navigate(screen);
//     setMenuOpen(false);
//   };

//   return (
//     <View style={styles.navbar}>
//       {/* Logo and App Name */}
//       <View style={styles.leftContainer}>
//         <Image
//           source={require('../assets/logo_final.png')}
//           style={styles.logo}
//         />
//         <Text style={styles.title}>DiaBet Prediction ❤️</Text>
//       </View>

//       {/* Menu Toggle */}
//       <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)}>
//         <Feather name={menuOpen ? 'x' : 'menu'} size={28} color="white" />
//       </TouchableOpacity>

//       {/* Dropdown Menu */}
//       {menuOpen && (
//         <View style={styles.menu}>
//           {['Home', 'DataInfo', 'Prediction', 'Visualization', 'Contact', 'FAQ'].map((item) => (
//             <TouchableOpacity
//               key={item}
//               style={styles.menuItem}
//               onPress={() => handleNavigate(item)}
//             >
//               <Text style={styles.menuText}>{item}</Text>
//             </TouchableOpacity>
//           ))}
//           <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
//             <Text style={[styles.menuText, { color: 'red' }]}>Logout</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* Confirm Modal */}
//       <Modal transparent visible={confirmVisible} animationType="fade">
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalBox}>
//             <Text style={styles.modalWarning}>⚠️ Are you sure you want to logout?</Text>
//             <View style={styles.modalButtons}>
//               <TouchableOpacity onPress={confirmLogout} style={styles.confirmButton}>
//                 <Text style={styles.buttonText}>OK</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={cancelLogout} style={styles.cancelButton}>
//                 <Text style={styles.buttonText}>Cancel</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* Logout/Cancel Message */}
//       <Modal transparent visible={!!message} animationType="fade">
//         <View style={styles.modalOverlay}>
//           <View style={styles.messageBox}>
//             <FontAwesome
//               name={message === 'logout' ? 'check-circle' : 'times-circle'}
//               size={48}
//               color={message === 'logout' ? 'green' : 'red'}
//             />
//             <Text style={styles.messageText}>
//               {message === 'logout' ? 'Logout Successful!' : 'Logout Cancelled!'}
//             </Text>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default Navbar;

// const styles = StyleSheet.create({
//   navbar: {
//     backgroundColor: '#6b21a8',
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     zIndex: 10,
//   },
//   leftContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   logo: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 10,
//   },
//   title: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
//   menu: {
//     position: 'absolute',
//     top: 64,
//     right: 16,
//     backgroundColor: '#1f2937',
//     borderRadius: 10,
//     padding: 12,
//     elevation: 5,
//     zIndex: 20,
//   },
//   menuItem: {
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//   },
//   menuText: {
//     color: '#f3f4f6',
//     fontSize: 16,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: '#00000088',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalBox: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 20,
//     alignItems: 'center',
//   },
//   modalWarning: {
//     fontSize: 18,
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     gap: 10,
//   },
//   confirmButton: {
//     backgroundColor: '#10b981',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     marginRight: 10,
//   },
//   cancelButton: {
//     backgroundColor: '#ef4444',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   messageBox: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 30,
//     alignItems: 'center',
//   },
//   messageText: {
//     marginTop: 10,
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });


import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome, Feather } from '@expo/vector-icons';

const Navbar = () => {
  const navigation = useNavigation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [message, setMessage] = useState(null);

  const handleLogout = () => {
    setConfirmVisible(true);
  };

  const confirmLogout = () => {
    setConfirmVisible(false);
    setMessage('logout');
    setTimeout(() => {
      setMessage(null);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }, 1500); // shorter delay to show success before redirecting
  };

  const cancelLogout = () => {
    setConfirmVisible(false);
    setMessage('cancel');
    setTimeout(() => setMessage(null), 2000);
  };

  const handleNavigate = (screen) => {
    navigation.navigate(screen);
    setMenuOpen(false);
  };

  return (
    <View style={styles.navbar}>
      {/* Logo and App Name */}
      <View style={styles.leftContainer}>
        <Image
          source={require('../assets/logo_final.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>DiaBet Prediction ❤️</Text>
      </View>

      {/* Menu Toggle */}
      <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)}>
        <Feather name={menuOpen ? 'x' : 'menu'} size={28} color="white" />
      </TouchableOpacity>

      {/* Dropdown Menu */}
      {menuOpen && (
        <View style={styles.menu}>
          {['Home', 'DataInfo', 'Prediction', 'Visualization', 'Contact', 'FAQ'].map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.menuItem}
              onPress={() => handleNavigate(item)}
            >
              <Text style={styles.menuText}>{item}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
            <Text style={[styles.menuText, { color: 'red' }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Confirm Modal */}
      <Modal transparent visible={confirmVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalWarning}>⚠️ Are you sure you want to logout?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={confirmLogout} style={styles.confirmButton}>
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={cancelLogout} style={styles.cancelButton}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Logout/Cancel Message */}
      <Modal transparent visible={!!message} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.messageBox}>
            <FontAwesome
              name={message === 'logout' ? 'check-circle' : 'times-circle'}
              size={48}
              color={message === 'logout' ? 'green' : 'red'}
            />
            <Text style={styles.messageText}>
              {message === 'logout' ? 'Logout Successful!' : 'Logout Cancelled!'}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#6b21a8',
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  menu: {
    position: 'absolute',
    top: 64,
    right: 16,
    backgroundColor: '#1f2937',
    borderRadius: 10,
    padding: 12,
    elevation: 5,
    zIndex: 20,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  menuText: {
    color: '#f3f4f6',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalWarning: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  confirmButton: {
    backgroundColor: '#10b981',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  messageBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
  },
  messageText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
  },
});
