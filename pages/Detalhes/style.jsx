import { StyleSheet, Dimensions} from "react-native-web";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  titulo: {
    fontSize:50,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2b61b3',
  },
  sensorContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2b61b3',
    padding: 25,
    borderRadius: 30
  },
  texto: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    padding: 10,
    fontWeight: 'bold',
  }
});

export default styles;