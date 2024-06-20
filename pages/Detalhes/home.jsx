import React, { useEffect, useState } from "react";
import { Text, View, ImageBackground } from "react-native";
import styles from "./style";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Detalhes ({ route }) {
  const { id } = route.params;
  const [sensorInfo, setSensorInfo] = useState(null);

  useEffect(() => {
    async function fetchSensorInfo() {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(
          `https://gizile.pythonanywhere.com/api/sensores/${id}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );
        setSensorInfo(response.data);
      } catch (error) {
        console.error("Error fetching sensor info:", error);
      }
    }
    fetchSensorInfo();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sensor Mais Próximo</Text>
   {sensorInfo && (
     <View style={styles.sensorContainer}>
       <Text style={styles.texto}>Tipo: {sensorInfo.tipo}</Text>
       <Text style={styles.texto}>ID do Sensor: {sensorInfo.id}</Text>
       <Text style={styles.texto}>Latitude: {sensorInfo.latitude}</Text>
       <Text style={styles.texto}>Longitude: {sensorInfo.longitude}</Text>
       <Text style={styles.texto}>Local: {sensorInfo.localizacao}</Text>
       <Text style={styles.texto}>Responsavel: {sensorInfo.responsavel}</Text>
     </View>
   )}
    </View>
  )
}
