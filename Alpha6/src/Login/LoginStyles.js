import { StyleSheet } from "react-native";

const estilosLogin = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "80%",
  },
  gradientTop:{
    position: "absolute",
    left: 0,
    right: 0,
    top: 0, // Alterado de bottom para top
    height: "20%", // Alterado para 20% da altura da tela
  },
  logoContainer: {
    position: "absolute",
    top: 20,
    left: 20,
    marginTop: 30,
  },
  logoText: {
    fontFamily: "Poppins-Black",
    color: "white", // Altere para a cor desejada
  },
  logoTitle: {
    fontSize: 17,
    marginLeft: 10
  },
  logoSubtitle: {
    fontSize: 7,
    fontWeight: 'bold',
    marginLeft: 80,
    marginTop: -5,
    padding: 2
  },
  loginContainer: {
    marginTop: -100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: '85%',
    backgroundColor: "#190733",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: 'white',
  },
  button: {
    backgroundColor: "#229954",
    borderRadius: 15,
    width: '85%',
    height: 50,
  },
  gradientBotao: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    width: "100%", // Ocupa 100% do TouchableOpacity
    height: 50,
  },
  buttonText: {
    color: "white",
    fontFamily: "Poppins-Black",
    textAlign: 'center',
  },
  acessText:{
    fontSize: 62,
    marginLeft: '8%'
  },
  textLogin:{
    color: '#fff',
    width: '85%',
    fontFamily: 'Poppins-Black',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  containerRegistro:{
    width: '100%',
    height: '50%',
    alignItems: 'center',
    marginTop: 150,
    padding: '5%',
  },
  textoCadastro:{
    width: '80%',
    textAlign: 'left',
    fontFamily: 'Poppins-Black',
    fontWeight: 'bold',
    color: 'white'
  }
});


export default estilosLogin;