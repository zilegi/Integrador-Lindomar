import { StyleSheet, Dimensions} from "react-native-web";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  map: {
    position: 'relative',
    width: width - 40,
    height: height / 2,
    borderRadius: 10,
  },
  bolinha: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: 'red',
    borderRadius: 10,
    transform: [{ translateX: -10 }, { translateY: -10 }],
  },
  balaoContainer: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
  },
  textoBalao: {
    color: '#fff',
    fontWeight: 'bold',
  },

  image: {
    width: 390,
    height: 600,
  },
  marker: {
    backgroundColor: 'yellow',
    width: 15,
    height: 15,
    borderRadius: 20
  },
  btn: {
    backgroundColor: '#2b61b3',
    width: 105,
    height: 25,
    borderRadius: 20,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  textBtn: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
  }
});

export default styles;