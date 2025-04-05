import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, LayoutAnimation, Platform, UIManager, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const faqData = [
  {
    header: "What is this System?",
    text: "Our Diabetes Prediction app offers a user-friendly platform to assess your risk of diabetes using machine learning based on your health data.",
  },
  {
    header: "What is BMI (Body Mass Index)?",
    text: "BMI is a person’s weight in kilograms divided by the square of height in meters, used to determine weight category.",
  },
  {
    header: "How to calculate BMI?",
    text: "BMI = weight (kg) / height (m)^2. Or: weight (kg) / height (cm)^2 × 10,000.",
  },
  {
    header: "What is DPF (Diabetes Pedigree Function)?",
    text: "DPF estimates your genetic risk for diabetes based on family history, often used in datasets like Pima Indians Diabetes Dataset.",
  },
  {
    header: "What is Skin Thickness Parameter?",
    text: "It measures triceps skinfold thickness in mm to estimate body fat levels.",
  },
  {
    header: "What is Blood Pressure?",
    text: "Blood pressure is the force your heart uses to pump blood through arteries, vital for delivering oxygen and nutrients.",
  }
];

const FAQScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>FAQ</Text>
      <Text style={styles.subtitle}>Any Questions? Look Here</Text>
      <Text style={styles.description}>Some of the frequently asked questions</Text>

      {faqData.map((item, index) => (
        <AccordionItem key={index} header={item.header} text={item.text} />
      ))}
    </ScrollView>
  );
};

const AccordionItem = ({ header, text }) => {
  const [active, setActive] = useState(false);

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActive(!active);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={toggleAccordion} style={styles.header}>
        <View style={styles.iconCircle}>
          <Ionicons
            name={active ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="#fff"
          />
        </View>
        <Text style={styles.headerText}>{header}</Text>
      </TouchableOpacity>
      {active && <Text style={styles.bodyText}>{text}</Text>}
    </View>
  );
};

export default FAQScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f3f4f6',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#4f46e5',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    color: '#111827',
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    backgroundColor: '#4f46e5',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  bodyText: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 22,
    color: '#4b5563',
    paddingLeft: 44,
  },
});
