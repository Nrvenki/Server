// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Linking,
//   useWindowDimensions,
// } from 'react-native';
// import { FontAwesome, Feather } from '@expo/vector-icons';

// const Footer = () => {
//   const { width } = useWindowDimensions();
//   const isLargeScreen = width >= 600;

//   return (
//     <View style={styles.footer}>
//       <View style={[styles.container, isLargeScreen && styles.containerLarge]}>
//         {/* About Section */}
//         <View style={[styles.section, isLargeScreen && styles.sectionLarge]}>
//           <Text style={[styles.logo, isLargeScreen && styles.logoLarge]}>Diabetes Predictor</Text>
//           <Text style={[styles.description, isLargeScreen && styles.textLarge]}>
//             Know your risk. Take control of your health with our smart prediction system.
//           </Text>
//         </View>

//         {/* Contact Section */}
//         <View style={[styles.section, isLargeScreen && styles.sectionLarge]}>
//           <Text style={[styles.heading, isLargeScreen && styles.headingLarge]}>Contact</Text>
//           <Text style={[styles.text, isLargeScreen && styles.textLarge]}>Chennai, Tamil Nadu</Text>
//           <TouchableOpacity onPress={() => Linking.openURL('mailto:dhonisivanath007@gmail.com')}>
//             <Text style={[styles.link, isLargeScreen && styles.linkLarge]}>
//               dhoni@gmail.com
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => Linking.openURL('tel:+919994495686')}>
//             <Text style={[styles.link, isLargeScreen && styles.linkLarge]}>
//               +91 99944 95686
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {/* Social Section */}
//         <View style={[styles.section, isLargeScreen && styles.sectionLarge]}>
//           <Text style={[styles.heading, isLargeScreen && styles.headingLarge]}>Follow Us</Text>
//           <View style={styles.socialIcons}>
//             <TouchableOpacity onPress={() => Linking.openURL('https://linkedin.com')}>
//               <FontAwesome name="linkedin" size={isLargeScreen ? 30 : 24} color="#fff" style={styles.icon} />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => Linking.openURL('https://github.com')}>
//               <FontAwesome name="github" size={isLargeScreen ? 30 : 24} color="#fff" style={styles.icon} />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com')}>
//               <Feather name="twitter" size={isLargeScreen ? 30 : 24} color="#fff" style={styles.icon} />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>

//       {/* Bottom Text */}
//       <Text style={[styles.copyright, isLargeScreen && styles.copyLarge]}>
//         © 2025 Diabetes Predictor | Developed by Siva.vg
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   footer: {
//     backgroundColor: '#6b21a8',
//     paddingVertical: 24,
//     paddingHorizontal: 16,
//     width: '100%',
//   },
//   container: {
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   containerLarge: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//   },
//   section: {
//     marginVertical: 12,
//     alignItems: 'center',
//     maxWidth: 300,
//   },
//   sectionLarge: {
//     alignItems: 'flex-start',
//     marginHorizontal: 16,
//   },
//   logo: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 8,
//   },
//   logoLarge: {
//     fontSize: 26,
//   },
//   description: {
//     color: '#ccc',
//     fontSize: 14,
//     textAlign: 'center',
//     lineHeight: 20,
//   },
//   heading: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   headingLarge: {
//     fontSize: 20,
//   },
//   text: {
//     color: '#ddd',
//     fontSize: 13,
//     marginBottom: 4,
//     textAlign: 'center',
//   },
//   textLarge: {
//     fontSize: 15,
//     textAlign: 'left',
//   },
//   link: {
//     color: '#00b0ff',
//     fontSize: 13,
//     textDecorationLine: 'underline',
//     marginBottom: 4,
//   },
//   linkLarge: {
//     fontSize: 15,
//   },
//   socialIcons: {
//     flexDirection: 'row',
//     marginTop: 10,
//   },
//   icon: {
//     marginHorizontal: 10,
//   },
//   copyright: {
//     textAlign: 'center',
//     color: '#aaa',
//     fontSize: 12,
//     marginTop: 20,
//   },
//   copyLarge: {
//     fontSize: 14,
//   },
// });

// export default Footer;
