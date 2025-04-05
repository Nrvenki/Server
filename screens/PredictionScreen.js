// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   ScrollView,
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
//   Linking,
// } from 'react-native';
// import axios from 'axios';
// import { BarChart } from 'react-native-chart-kit';
// import { Dimensions } from 'react-native';

// const screenWidth = Dimensions.get('window').width;

// const PredictionScreen = () => {
//   const [userInput, setUserInput] = useState({
//     Age: '',
//     Glucose: '',
//     BloodPressure: '',
//     Insulin: '',
//     BMI: '',
//     SkinThickness: '',
//     DPF: '',
//     PhoneNumber: '',
//   });

//   const [prediction, setPrediction] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showChart, setShowChart] = useState(false);
//   const [showDosDonts, setShowDosDonts] = useState(false);

//   const handleChange = (name, value) => {
//     setUserInput((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post('http://127.0.0.1:8000/predict', {
//         Age: userInput.Age,
//         Glucose: userInput.Glucose,
//         BloodPressure: userInput.BloodPressure,
//         Insulin: userInput.Insulin,
//         BMI: userInput.BMI,
//         SkinThickness: userInput.SkinThickness,
//         DPF: userInput.DPF,
//       });
//       setPrediction(response.data);
//     } catch (error) {
//       Alert.alert('Error', 'Prediction failed. Try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const sendToWhatsApp = () => {
//     const phoneNumber = userInput.PhoneNumber.replace(/\D/g, '');
//     if (!phoneNumber) {
//       Alert.alert('Invalid', 'Please enter a valid phone number.');
//       return;
//     }

//     const message = `
// Diabetes Prediction Result:
// - Age: ${userInput.Age}
// - Glucose: ${userInput.Glucose}
// - Blood Pressure: ${userInput.BloodPressure}
// - Insulin: ${userInput.Insulin}
// - BMI: ${userInput.BMI}
// - Skin Thickness: ${userInput.SkinThickness}
// - DPF: ${userInput.DPF}
// - Prediction: ${prediction?.prediction || 'Not available yet'}
//     `.trim();

//     const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
//     Linking.openURL(url);
//   };

//   const chartData = {
//     labels: ['Age', 'Glucose', 'BP', 'Insulin', 'BMI', 'Skin', 'DPF'],
//     datasets: [
//       {
//         data: [
//           parseFloat(userInput.Age) || 0,
//           parseFloat(userInput.Glucose) || 0,
//           parseFloat(userInput.BloodPressure) || 0,
//           parseFloat(userInput.Insulin) || 0,
//           parseFloat(userInput.BMI) || 0,
//           parseFloat(userInput.SkinThickness) || 0,
//           parseFloat(userInput.DPF) || 0,
//         ],
//       },
//     ],
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Enter all details</Text>
//       {Object.keys(userInput).map((key) => (
//         <TextInput
//           key={key}
//           style={styles.input}
//           placeholder={key}
//           keyboardType="numeric"
//           onChangeText={(value) => handleChange(key, value)}
//           value={userInput[key]}
//         />
//       ))}

//       <Button title="Predict" onPress={handleSubmit} disabled={loading} />

//       {loading && <ActivityIndicator size="large" color="#6b21a8" style={{ marginTop: 20 }} />}

//       {prediction && (
//         <View style={styles.resultBox}>
//           <Text style={styles.resultText}>{prediction.prediction}</Text>

//           <View style={styles.buttonRow}>
//             <Button title="Show Bar Chart" onPress={() => {
//               setShowChart(true);
//               setShowDosDonts(false);
//             }} />
//             <Button title="Diabetes Tips" onPress={() => {
//               setShowChart(false);
//               setShowDosDonts(true);
//             }} />
//             <Button title="Send WhatsApp" onPress={sendToWhatsApp} />
//           </View>
//         </View>
//       )}

//       {showChart && (
//         <BarChart
//           data={chartData}
//           width={screenWidth - 40}
//           height={220}
//           yAxisSuffix=""
//           chartConfig={{
//             backgroundGradientFrom: '#f0f0f0',
//             backgroundGradientTo: '#e0e0e0',
//             decimalPlaces: 1,
//             color: (opacity = 1) => `rgba(106, 90, 205, ${opacity})`,
//             labelColor: () => '#333',
//           }}
//           style={styles.chart}
//         />
//       )}

//       {showDosDonts && (
//         <View style={styles.tipsBox}>
//           <Text style={styles.tipsHeader}>Diabetes Do's and Don'ts</Text>
//           <Text style={styles.tip}>✅ Maintain a healthy diet rich in fruits, vegetables, and whole grains.</Text>
//           <Text style={styles.tip}>✅ Exercise regularly to manage weight and insulin sensitivity.</Text>
//           <Text style={styles.tip}>✅ Monitor blood sugar levels regularly.</Text>
//           <Text style={styles.tip}>❌ Don’t consume excessive sugar or processed food.</Text>
//           <Text style={styles.tip}>❌ Don’t skip meals or overeat.</Text>
//           <Text style={styles.tip}>❌ Don’t ignore symptoms of high/low blood sugar.</Text>
//         </View>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#fdf6fd',
//     flexGrow: 1,
//   },
//   title: {
//     fontSize: 26,
//     textAlign: 'center',
//     fontWeight: 'bold',
//     color: '#6b21a8',
//     marginBottom: 20,
//   },
//   input: {
//     borderColor: '#ccc',
//     borderWidth: 1,
//     padding: 12,
//     marginVertical: 6,
//     borderRadius: 8,
//     backgroundColor: 'white',
//   },
//   resultBox: {
//     marginTop: 20,
//     padding: 15,
//     backgroundColor: '#d1fae5',
//     borderRadius: 8,
//   },
//   resultText: {
//     fontSize: 22,
//     textAlign: 'center',
//     color: '#065f46',
//     fontWeight: 'bold',
//   },
//   buttonRow: {
//     marginTop: 10,
//     flexDirection: 'column',
//     gap: 10,
//   },
//   chart: {
//     marginVertical: 20,
//     borderRadius: 8,
//   },
//   tipsBox: {
//     marginTop: 20,
//     backgroundColor: '#fefce8',
//     padding: 16,
//     borderRadius: 8,
//   },
//   tipsHeader: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#92400e',
//   },
//   tip: {
//     fontSize: 14,
//     marginBottom: 6,
//     color: '#4b5563',
//   },
// });

// export default PredictionScreen;


import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import axios from 'axios';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const PredictionScreen = () => {
  const [userInput, setUserInput] = useState({
    Age: '',
    Glucose: '',
    BloodPressure: '',
    Insulin: '',
    BMI: '',
    SkinThickness: '',
    DPF: '',
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [showDosDonts, setShowDosDonts] = useState(false);

  const handleChange = (name, value) => {
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/predict', {
     // const response = await axios.post("https://last-xyr0.onrender.com/predict", {
        Age: userInput.Age,
        Glucose: userInput.Glucose,
        BloodPressure: userInput.BloodPressure,
        Insulin: userInput.Insulin,
        BMI: userInput.BMI,
        SkinThickness: userInput.SkinThickness,
        DPF: userInput.DPF,
      });
      setPrediction(response.data);
    } catch (error) {
      Alert.alert('Error', 'Prediction failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: ['Age', 'Glucose', 'BP', 'Insulin', 'BMI', 'Skin', 'DPF'],
    datasets: [
      {
        data: [
          parseFloat(userInput.Age) || 0,
          parseFloat(userInput.Glucose) || 0,
          parseFloat(userInput.BloodPressure) || 0,
          parseFloat(userInput.Insulin) || 0,
          parseFloat(userInput.BMI) || 0,
          parseFloat(userInput.SkinThickness) || 0,
          parseFloat(userInput.DPF) || 0,
        ],
      },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Enter all details</Text>
      {Object.keys(userInput).map((key) => (
        <TextInput
          key={key}
          style={styles.input}
          placeholder={key}
          keyboardType="numeric"
          onChangeText={(value) => handleChange(key, value)}
          value={userInput[key]}
        />
      ))}

      <Button title="Predict" onPress={handleSubmit} disabled={loading} />

      {loading && <ActivityIndicator size="large" color="#6b21a8" style={{ marginTop: 20 }} />}

      {prediction && (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>{prediction.prediction}</Text>

          <View style={styles.buttonRow}>
            <Button
              title="Show Bar Chart"
              onPress={() => {
                setShowChart(true);
                setShowDosDonts(false);
              }}
            />
            <Button
              title="Diabetes Tips"
              onPress={() => {
                setShowChart(false);
                setShowDosDonts(true);
              }}
            />
          </View>
        </View>
      )}

      {showChart && (
        <BarChart
          data={chartData}
          width={screenWidth - 40}
          height={220}
          yAxisSuffix=""
          chartConfig={{
            backgroundGradientFrom: '#f0f0f0',
            backgroundGradientTo: '#e0e0e0',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(106, 90, 205, ${opacity})`,
            labelColor: () => '#333',
          }}
          style={styles.chart}
        />
      )}

      {showDosDonts && (
        <View style={styles.tipsBox}>
          <Text style={styles.tipsHeader}>Diabetes Do's and Don'ts</Text>
          <Text style={styles.tip}>✅ Maintain a healthy diet rich in fruits, vegetables, and whole grains.</Text>
          <Text style={styles.tip}>✅ Exercise regularly to manage weight and insulin sensitivity.</Text>
          <Text style={styles.tip}>✅ Monitor blood sugar levels regularly.</Text>
          <Text style={styles.tip}>❌ Don’t consume excessive sugar or processed food.</Text>
          <Text style={styles.tip}>❌ Don’t skip meals or overeat.</Text>
          <Text style={styles.tip}>❌ Don’t ignore symptoms of high/low blood sugar.</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fdf6fd',
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#6b21a8',
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  resultBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#d1fae5',
    borderRadius: 8,
  },
  resultText: {
    fontSize: 22,
    textAlign: 'center',
    color: '#065f46',
    fontWeight: 'bold',
  },
  buttonRow: {
    marginTop: 10,
    flexDirection: 'column',
    gap: 10,
  },
  chart: {
    marginVertical: 20,
    borderRadius: 8,
  },
  tipsBox: {
    marginTop: 20,
    backgroundColor: '#fefce8',
    padding: 16,
    borderRadius: 8,
  },
  tipsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#92400e',
  },
  tip: {
    fontSize: 14,
    marginBottom: 6,
    color: '#4b5563',
  },
});

export default PredictionScreen;


// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   ScrollView,
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import axios from 'axios';
// import { BarChart } from 'react-native-chart-kit';
// import { Dimensions } from 'react-native';

// const screenWidth = Dimensions.get('window').width;

// const PredictionScreen = () => {
//   const [userInput, setUserInput] = useState({
//     Age: '',
//     Glucose: '',
//     BloodPressure: '',
//     Insulin: '',
//     BMI: '',
//     SkinThickness: '',
//     DPF: '',
//   });

//   const [prediction, setPrediction] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showChart, setShowChart] = useState(false);
//   const [showDosDonts, setShowDosDonts] = useState(false);

//   const handleChange = (name, value) => {
//     setUserInput((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     // Validation: ensure no empty fields
//     for (const key in userInput) {
//       if (!userInput[key]) {
//         Alert.alert('Missing Field', `Please fill out the ${key} field.`);
//         return;
//       }
//     }

//     setLoading(true);
//     try {
//       const payload = {
//         Age: parseFloat(userInput.Age),
//         Glucose: parseFloat(userInput.Glucose),
//         BloodPressure: parseFloat(userInput.BloodPressure),
//         Insulin: parseFloat(userInput.Insulin),
//         BMI: parseFloat(userInput.BMI),
//         SkinThickness: parseFloat(userInput.SkinThickness),
//         DPF: parseFloat(userInput.DPF),
//       };

//       const response = await axios.post("https://last-xyr0.onrender.com/predict", payload);
//       setPrediction(response.data);
//     } catch (error) {
//       console.error("Prediction error:", error?.response?.data || error.message);
//       Alert.alert('Error', 'Prediction failed. Try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const chartData = {
//     labels: ['Age', 'Glucose', 'BP', 'Insulin', 'BMI', 'Skin', 'DPF'],
//     datasets: [
//       {
//         data: [
//           parseFloat(userInput.Age) || 0,
//           parseFloat(userInput.Glucose) || 0,
//           parseFloat(userInput.BloodPressure) || 0,
//           parseFloat(userInput.Insulin) || 0,
//           parseFloat(userInput.BMI) || 0,
//           parseFloat(userInput.SkinThickness) || 0,
//           parseFloat(userInput.DPF) || 0,
//         ],
//       },
//     ],
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Enter all details</Text>
//       {Object.keys(userInput).map((key) => (
//         <TextInput
//           key={key}
//           style={styles.input}
//           placeholder={key}
//           keyboardType="numeric"
//           onChangeText={(value) => handleChange(key, value)}
//           value={userInput[key]}
//         />
//       ))}

//       <Button title="Predict" onPress={handleSubmit} disabled={loading} />

//       {loading && <ActivityIndicator size="large" color="#6b21a8" style={{ marginTop: 20 }} />}

//       {prediction && (
//         <View style={styles.resultBox}>
//           <Text style={styles.resultText}>{prediction.prediction}</Text>

//           <View style={styles.buttonRow}>
//             <Button
//               title="Show Bar Chart"
//               onPress={() => {
//                 setShowChart(true);
//                 setShowDosDonts(false);
//               }}
//             />
//             <Button
//               title="Diabetes Tips"
//               onPress={() => {
//                 setShowChart(false);
//                 setShowDosDonts(true);
//               }}
//             />
//           </View>
//         </View>
//       )}

//       {showChart && (
//         <BarChart
//           data={chartData}
//           width={screenWidth - 40}
//           height={220}
//           yAxisSuffix=""
//           chartConfig={{
//             backgroundGradientFrom: '#f0f0f0',
//             backgroundGradientTo: '#e0e0e0',
//             decimalPlaces: 1,
//             color: (opacity = 1) => `rgba(106, 90, 205, ${opacity})`,
//             labelColor: () => '#333',
//           }}
//           style={styles.chart}
//         />
//       )}

//       {showDosDonts && (
//         <View style={styles.tipsBox}>
//           <Text style={styles.tipsHeader}>Diabetes Do's and Don'ts</Text>
//           <Text style={styles.tip}>✅ Maintain a healthy diet rich in fruits, vegetables, and whole grains.</Text>
//           <Text style={styles.tip}>✅ Exercise regularly to manage weight and insulin sensitivity.</Text>
//           <Text style={styles.tip}>✅ Monitor blood sugar levels regularly.</Text>
//           <Text style={styles.tip}>❌ Don’t consume excessive sugar or processed food.</Text>
//           <Text style={styles.tip}>❌ Don’t skip meals or overeat.</Text>
//           <Text style={styles.tip}>❌ Don’t ignore symptoms of high/low blood sugar.</Text>
//         </View>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#fdf6fd',
//     flexGrow: 1,
//   },
//   title: {
//     fontSize: 26,
//     textAlign: 'center',
//     fontWeight: 'bold',
//     color: '#6b21a8',
//     marginBottom: 20,
//   },
//   input: {
//     borderColor: '#ccc',
//     borderWidth: 1,
//     padding: 12,
//     marginVertical: 6,
//     borderRadius: 8,
//     backgroundColor: 'white',
//   },
//   resultBox: {
//     marginTop: 20,
//     padding: 15,
//     backgroundColor: '#d1fae5',
//     borderRadius: 8,
//   },
//   resultText: {
//     fontSize: 22,
//     textAlign: 'center',
//     color: '#065f46',
//     fontWeight: 'bold',
//   },
//   buttonRow: {
//     marginTop: 10,
//     flexDirection: 'column',
//     gap: 10,
//   },
//   chart: {
//     marginVertical: 20,
//     borderRadius: 8,
//   },
//   tipsBox: {
//     marginTop: 20,
//     backgroundColor: '#fefce8',
//     padding: 16,
//     borderRadius: 8,
//   },
//   tipsHeader: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#92400e',
//   },
//   tip: {
//     fontSize: 14,
//     marginBottom: 6,
//     color: '#4b5563',
//   },
// });

// export default PredictionScreen;
