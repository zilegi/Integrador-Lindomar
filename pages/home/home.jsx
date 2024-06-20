import React, { useEffect, useState } from "react";
import { Text, View, Dimensions, ImageBackground, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Importando o hook de navegação
import * as Location from "expo-location";
import styles from "./styles";
import senai from "../../assets/senai.png";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const bounds = {
  northWest: { latitude: -22.913963, longitude: -47.068029 },
  northEast: { latitude: -22.914149, longitude: -47.068679 },
  southWest: { latitude: -22.915030, longitude: -47.068627 },
  southEast: { latitude: -22.914843, longitude: -47.067728 },
};

const haversine = (lat1, lon1, lat2, lon2) => {
  const toRadians = (value) => (value * Math.PI) / 180;
  const R = 6371; // Raio da Terra em km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c * 1000; 
  return distance;
};

export default function Home() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [nearestSensor, setNearestSensor] = useState(null);
  const [pontos, setPontos] = useState([]);
  const navigation = useNavigation(); // Usando o hook de navegação

  useEffect(() => {
    async function fetchSensores() {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(
          "https://gizile.pythonanywhere.com/api/sensores/",
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );
        const sensores = response.data;
        setPontos(sensores);
      } catch (error) {
        console.error("Error fetching sensores:", error);
      }
    }
    fetchSensores();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const locationListener = await Location.watchPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 60,
        distanceInterval: 0.01,
      }, (newLocation) => {
        setLocation(newLocation.coords);
      });

      return () => {
        if (locationListener) {
          locationListener.remove();
        }
      };
    })();
  }, []);

  useEffect(() => {
    if (location && pontos.length > 0) {
      let minDistance = Number.MAX_SAFE_INTEGER;
      let nearest = null;
      pontos.forEach((point) => {
        const distance = haversine(
          location.latitude,
          location.longitude,
          point.latitude,
          point.longitude,
        );
        if (distance < minDistance) {
          minDistance = distance;
          nearest = point;
        }
      });
      setNearestSensor(nearest);
    }
  }, [location, pontos]);

  const calculatePosition = (latitude, longitude) => {
    const mapWidth = width - 40;
    const mapHeight = height / 2;
  
    const top = ((bounds.northWest.latitude - latitude) / (bounds.northWest.latitude - bounds.southWest.latitude)) * mapHeight;
    const left = ((longitude - bounds.southWest.longitude) / (bounds.southEast.longitude - bounds.southWest.longitude)) * mapWidth;
  
    return { top: top, left: left };
  };
  
  return (
    <View style={styles.container}>
      <ImageBackground source={senai} style={styles.image}>
        {nearestSensor && (
          <View
            style={[
              styles.marker,
              calculatePosition(nearestSensor.latitude, nearestSensor.longitude),
            ]}
          />
        )}
        {location && (
          <View style={[styles.bolinha, calculatePosition(location.latitude, location.longitude)]} />
        )}
      </ImageBackground>

      <Text style={styles.textoInfoSensor}>
        {errorMsg ||
          `Latitude: ${location?.latitude}, Longitude: ${location?.longitude}`}
      </Text>
      {nearestSensor && (
        <Text style={styles.textoInfoSensor}>
          {`Distância do Sensor mais próximo: ${haversine(
            location.latitude,
            location.longitude,
            nearestSensor.latitude,
            nearestSensor.longitude
          ).toFixed(2)} metros`}
        </Text>
      )}
      {nearestSensor && (
        <Pressable style={styles.btn} onPress={() => navigation.navigate("Detalhes", { id: nearestSensor.id })}>
          <Text style={styles.textBtn}>Detalhes</Text>
        </Pressable>
      )}
    </View>
  );
}
