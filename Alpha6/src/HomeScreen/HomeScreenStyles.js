import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: "70%", // Reduzi um pouco a altura do gradiente inferior
  },
  gradientTop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "30%", // Aumentei um pouco a altura do gradiente superior
  },
  containerPesquisa: {
    marginTop: 100, // Ajuste para melhor posicionamento
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 50, // Aumentei um pouco a altura
    borderColor: '#ccc', // Cor de borda mais suave
    borderWidth: 1,
    paddingLeft: 16,
    paddingRight: 16, // Adicionei padding à direita
    marginBottom: 16,
    width: '85%',
    borderRadius: 25, // Bordas mais arredondadas
    backgroundColor: '#fff',
    shadowColor: "#000", // Cor da sombra
    shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
    shadowOpacity: 0.3, // Opacidade da sombra
    shadowRadius: 4, // Raio da sombra
    elevation: 5, // Elevação para Android (opcional)
  },
  dropdown: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: -10,
    zIndex: 1,
    shadowColor: "#000", // Sombra para destacar
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  item: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  itemImage: {
    width: 64,
    height: 64,
    borderRadius: 10, // Bordas mais arredondadas
    marginRight: 16,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemName: {
    color: '#333', // Cor de texto mais escura
    fontSize: 16,
    fontWeight: '500', // Peso de fonte um pouco mais leve
  },
  itemDescription: {
    color: '#777', // Cor de texto mais suave
    fontSize: 14,
  },
  homeText: {
    color: '#fff',
    fontSize: 28, // Fonte um pouco maior
    textAlign: 'center',
    marginTop: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // Sombra para destacar
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
});

export default styles;
