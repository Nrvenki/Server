// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Login from './screens/Login';
// import HomeScreen from './screens/Home';
// import DataInfoScreen from './screens/DataInfo';
// import PredictionScreen from './screens/PredictionScreen';
// import VisualizationScreen from './screens/VisualizationScreen';
// import ContactScreen from './screens/ContactUsScreen';
// import FAQScreen from './screens/FAQScreen';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';

// const Stack = createNativeStackNavigator();

// const AppLayout = ({ Component }) => {
//   return (
//     <>
//       <Navbar />
//       <Component />
//       <Footer />
//     </>
//   );
// };

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Home">
//           {() => <AppLayout Component={HomeScreen} />}
//         </Stack.Screen>
//         <Stack.Screen name="DataInfo">
//           {() => <AppLayout Component={DataInfoScreen} />}
//         </Stack.Screen>
//         <Stack.Screen name="Prediction">
//           {() => <AppLayout Component={PredictionScreen} />}
//         </Stack.Screen>
//         <Stack.Screen name="Visualization">
//           {() => <AppLayout Component={VisualizationScreen} />}
//         </Stack.Screen>
//         <Stack.Screen name="Contact">
//           {() => <AppLayout Component={ContactScreen} />}
//         </Stack.Screen>
//         <Stack.Screen name="FAQ">
//           {() => <AppLayout Component={FAQScreen} />}
//         </Stack.Screen>
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import HomeScreen from './screens/Home';
import DataInfoScreen from './screens/DataInfo';
import PredictionScreen from './screens/PredictionScreen';
import VisualizationScreen from './screens/VisualizationScreen';
import ContactScreen from './screens/ContactUsScreen';
import FAQScreen from './screens/FAQScreen';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Stack = createNativeStackNavigator();

// Layout with Navbar and Footer
const AppLayout = ({ Component }) => {
  return (
    <>
      <Navbar />
      <Component />
      {/* <Footer /> */}
    </>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        {/* Login screen only shows login */}
        <Stack.Screen name="Login" component={Login} />

        {/* Other screens include layout */}
        <Stack.Screen name="Home">
          {() => <AppLayout Component={HomeScreen} />}
        </Stack.Screen>
        <Stack.Screen name="DataInfo">
          {() => <AppLayout Component={DataInfoScreen} />}
        </Stack.Screen>
        <Stack.Screen name="Prediction">
          {() => <AppLayout Component={PredictionScreen} />}
        </Stack.Screen>
        <Stack.Screen name="Visualization">
          {() => <AppLayout Component={VisualizationScreen} />}
        </Stack.Screen>
        <Stack.Screen name="Contact">
          {() => <AppLayout Component={ContactScreen} />}
        </Stack.Screen>
        <Stack.Screen name="FAQ">
          {() => <AppLayout Component={FAQScreen} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
