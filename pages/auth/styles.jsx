import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  titulo: {
    color: '#2b61b3',
    fontWeight: 'bold',
    fontSize: 35,
    marginBottom: 30,
    marginLeft: 130,
    marginVertical: 70,
  },

  tituloprin: {
    color: '#2b61b3',
    fontWeight: 'bold',
    fontSize: 40,
    marginBottom: 30,
    marginVertical: -300,
    
  },


  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },

  input: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#e6e8eb',
    fontSize: 18,
    borderRadius: 15,
    marginBottom: 20,
  },

  botao: {
    backgroundColor: '#2b61b3',
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 10,
  },

  textoBotao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },

  textoInferior: {
    marginTop: 20,
    fontSize: 16,
    color: '#2b61b3',
  },
});

export default styles;
