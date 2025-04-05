import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons'; // You can use react-native-vector-icons too

import agePlot from '../assets/plots/ages.png';
import BMIPlot from '../assets/plots/bmis.png';
import BloodPressurePlot from '../assets/plots/bps.png';
import DPF from '../assets/plots/dpfs.png';
import glucose from '../assets/plots/glucoses.png';
import insulin from '../assets/plots/insulins.png';
import skin from '../assets/plots/skins.png';

const plots = [
  { title: 'Age Plot', image: agePlot },
  { title: 'BMI Plot', image: BMIPlot },
  { title: 'Blood Pressure Plot', image: BloodPressurePlot },
  { title: 'Diabetes Pedigree Function Plot', image: DPF },
  { title: 'Glucose Plot', image: glucose },
  { title: 'Insulin Plot', image: insulin },
  { title: 'Skin Plot', image: skin },
];

const VisualizationScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Diabetes Visualization</Text>
      {plots.map((plot, index) => (
        <TouchableOpacity key={index} onPress={() => openModal(plot.image)}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{plot.title}</Text>
            <Image source={plot.image} style={styles.image} resizeMode="cover" />
          </View>
        </TouchableOpacity>
      ))}

      {/* Modal Viewer */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={closeModal}>
                <Ionicons name="close-circle" size={34} color="red" />
              </TouchableOpacity>
              {/* You can add a download logic here using react-native-fs */}
            </View>
            <Image source={selectedImage} style={styles.modalImage} resizeMode="contain" />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default VisualizationScreen;

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4F46E5',
    marginBottom: 20,
    borderBottomWidth: 2,
    paddingBottom: 8,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    width: screenWidth * 0.9,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4F46E5',
    marginBottom: 8,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: screenWidth * 0.9,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 12,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  modalImage: {
    width: '100%',
    height: 400,
  },
});
