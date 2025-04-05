import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';

const ContactUsScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideY = useRef(new Animated.Value(-50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideY, {
        toValue: 0,
        duration: 800,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const infoItems = [
    {
      label: 'Name',
      value: 'Siva V G',
      delay: 400,
    },
    {
      label: 'Email',
      value: 'siva@gmail.com',
      delay: 600,
    },
    {
      label: 'Message',
      value:
        'Looking forward to connecting with you and discussing more about our opportunities!',
      delay: 800,
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.View
        style={[
          styles.card,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideY }],
          },
        ]}
      >
        <Text style={styles.heading}>Contact Us</Text>
        {infoItems.map((item, index) => {
          const fadeItem = new Animated.Value(0);
          const slideItem = new Animated.Value(-50);

          useEffect(() => {
            Animated.parallel([
              Animated.timing(fadeItem, {
                toValue: 1,
                duration: 600,
                delay: item.delay,
                useNativeDriver: true,
              }),
              Animated.timing(slideItem, {
                toValue: 0,
                duration: 600,
                delay: item.delay,
                useNativeDriver: true,
              }),
            ]).start();
          }, []);

          return (
            <Animated.View
              key={index}
              style={[
                styles.infoBox,
                {
                  opacity: fadeItem,
                  transform: [{ translateX: slideItem }],
                },
              ]}
            >
              <Text style={styles.label}>{item.label}:</Text>
              <Text style={styles.value}>{item.value}</Text>
            </Animated.View>
          );
        })}
      </Animated.View>
    </ScrollView>
  );
};

export default ContactUsScreen;

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    alignItems: 'center',
    backgroundColor: 'white',
    minHeight: '100%',
  },
  card: {
    width: screenWidth * 0.9,
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#9CA3AF',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: '#D1D5DB',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#6B7280',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    color: '#111827',
  },
});
