import {
  Button,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { movers } from "@/assets/data/movers";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { defaultMoverImage } from "@/components/MoverListItem";

const MoverDetailScreen = () => {
  const colorScheme = useColorScheme() || "light";
  const { id } = useLocalSearchParams();
  console.log(id);
  const mover = movers.find((m) => m._id === id);
  if (!mover) {
    return (
      <Text style={{ color: Colors[colorScheme].text }}>Mover not found</Text>
    );
  }
  return (
    <ScrollView
      style={[
        styles.moverContainer,
        { backgroundColor: Colors[colorScheme].backgroundAccent },
      ]}
    >
      <Stack.Screen options={{ title: mover.businessName }} />

      <Image
        source={{ uri: mover.companyLogo || defaultMoverImage }}
        style={styles.moverLogo}
      />
      <View style={styles.moverDetails}>
        <Text style={[styles.moverName, { color: Colors[colorScheme].text }]}>
          {mover.businessName}
        </Text>
        <Text style={[styles.moverArea, { color: Colors[colorScheme].text }]}>
          {mover.serviceArea}
        </Text>
        <Text style={[styles.moverArea, { color: Colors[colorScheme].text }]}>
          {mover.description}
        </Text>
        <Text
          style={[
            styles.moverYearsInBusiness,
            { color: Colors[colorScheme].text },
          ]}
        >
          {mover.yearsInBusiness} in business
        </Text>
        <View style={styles.servicesContainer}>
          <Text
            style={[styles.servicesLabel, { color: Colors[colorScheme].text }]}
          >
            Services:
          </Text>
          {mover.services.map((service, index) => (
            <Text
              key={index}
              style={[styles.serviceItem, { color: Colors[colorScheme].text }]}
            >
              • {service}
            </Text>
          ))}
        </View>
        <View style={styles.ratingContainer}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Ionicons
              key={index}
              name={index < Math.floor(mover.rating) ? "star" : "star-outline"}
              size={16}
              color={Colors[colorScheme].accentColor}
            />
          ))}
          <Text
            style={[styles.ratingText, { color: Colors[colorScheme].text }]}
          >
            {mover.rating}
          </Text>
        </View>
        <Button title="Book Now" onPress={() => handleBookMover(mover._id)} />
      </View>
    </ScrollView>
  );
};

export default MoverDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  promptContainer: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  promptText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  moversList: {
    paddingBottom: 16,
  },
  moverContainer: {
    flexDirection: "column",
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#FFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  moverLogo: {
    width: "100%",
    height: 200,
    borderRadius: 32,
    marginRight: 16,
  },
  moverDetails: {
    flex: 1,
  },
  moverName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  moverArea: {
    fontSize: 14,
    marginVertical: 4,
  },
  moverDescription: {
    fontSize: 14,
    marginVertical: 4,
  },
  moverYearsInBusiness: {
    fontSize: 14,
  },
  servicesContainer: {
    marginTop: 4,
  },
  servicesLabel: {
    fontWeight: "bold",
  },
  serviceItem: {
    marginLeft: 8,
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    marginTop: 4,
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    marginLeft: 4,
  },
});
