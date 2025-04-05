import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";

const screenWidth = Dimensions.get("window").width;
const isLargeScreen = screenWidth >= 600;

const Home = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center" }}>
      {/* Hero Section */}
      <Animatable.View animation="fadeInDown" duration={1200} style={[styles.heroSection, isLargeScreen && styles.heroLarge]}>
        <Text style={[styles.title, isLargeScreen && styles.titleLarge]}>
          Welcome to the Diabetes Predictor!
        </Text>
        <Text style={[styles.subtitle, isLargeScreen && styles.subtitleLarge]}>Know your risk</Text>
        <Text style={[styles.subtitle, isLargeScreen && styles.subtitleLarge]}>
          Take control of your health.
        </Text>
        <TouchableOpacity style={[styles.button, isLargeScreen && styles.buttonLarge]} onPress={() => navigation.navigate("Prediction")}>
          <Text style={styles.buttonText}>GET STARTED</Text>
        </TouchableOpacity>
      </Animatable.View>

      {/* Section Title */}
      <Animatable.Text animation="fadeInUp" duration={1000} style={[styles.sectionTitle, isLargeScreen && styles.sectionTitleLarge]}>
        Features
      </Animatable.Text>

      {/* Cards Section */}
      <View style={styles.cardWrapper}>
        {[
          {
            title: "Data Info",
            text: "Explore and understand the data used for diabetes prediction.",
            image: require("../assets/dataInfo.jpeg"),
            route: "DataInfo",
          },
          {
            title: "Prediction",
            text: "Predict your likelihood of developing diabetes using our advanced algorithm.",
            image: require("../assets/prediction.jpeg"),
            route: "Prediction",
          },
          {
            title: "Visualization",
            text: "Visualize the data and predictions with interactive charts and graphs.",
            image: require("../assets/Visualization.jpeg"),
            route: "Visualization",
          },
        ].map((item, index) => (
          <Animatable.View
            key={index}
            animation={index % 2 === 0 ? "fadeInLeft" : "fadeInRight"}
            duration={1000}
            style={[styles.card, isLargeScreen && styles.cardLarge]}
          >
            <Image
              source={item.image}
              style={[
                styles.cardImage,
                isLargeScreen ? styles.imageLarge : styles.imageSmall,
              ]}
            />
            <View style={styles.textContent}>
              <Text style={[styles.cardTitle, isLargeScreen && styles.cardTitleLarge]}>{item.title}</Text>
              <Text style={[styles.cardText, isLargeScreen && styles.cardTextLarge]}>{item.text}</Text>
              <TouchableOpacity onPress={() => navigation.navigate(item.route)}>
                <Text style={[styles.linkButton, isLargeScreen && styles.linkButtonLarge]}>Explore</Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  heroSection: {
    width: "100%",
    height: 500,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    paddingHorizontal: 20,
  },
  heroLarge: {
    height: 600,
    paddingHorizontal: 40,
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  titleLarge: {
    fontSize: 42,
  },
  subtitle: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitleLarge: {
    fontSize: 22,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#FF9900",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonLarge: {
    paddingVertical: 14,
    paddingHorizontal: 28,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6B21A8",
    textAlign: "center",
    marginVertical: 20,
  },
  sectionTitleLarge: {
    fontSize: 30,
  },
  cardWrapper: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 40,
  },
  card: {
    flexDirection: "column",
    backgroundColor: "#f9f9f9",
    borderRadius: 15,
    padding: 16,
    marginBottom: 20,
    alignItems: "center",
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  cardLarge: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "85%",
    padding: 24,
  },
  cardImage: {
    borderRadius: 12,
  },
  imageSmall: {
    width: 120,
    height: 100,
    marginBottom: 12,
  },
  imageLarge: {
    width: 200,
    height: 160,
    marginRight: 20,
  },
  textContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6B21A8",
    marginBottom: 6,
    textAlign: "center",
  },
  cardTitleLarge: {
    fontSize: 22,
    textAlign: "left",
  },
  cardText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  cardTextLarge: {
    fontSize: 16,
    textAlign: "left",
  },
  linkButton: {
    fontSize: 14,
    color: "white",
    backgroundColor: "#6B21A8",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: "center",
  },
  linkButtonLarge: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },
});

export default Home;
