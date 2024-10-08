import React, { useState } from "react";
import { View, Text, TextField, Button } from "react-native-ui-lib";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import tryRegisterWithEmailAndPassword from "../../http/auth/RegisterWithEmailAndPassword";
import { StyleSheet } from "react-native"; // Importa StyleSheet
import { width } from "../constants/measures"; // Importa a largura

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Register"
>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{ confirmPassword: boolean }>({
    confirmPassword: false,
  });

  const handleRegister = async () => {
    if (user.password !== user.confirmPassword) {
      setErrors({ confirmPassword: true });
      window.alert("Passwords do not match.");
      return;
    }

    const response = await tryRegisterWithEmailAndPassword(user);
    if (!response) {
      window.alert("Registration failed. Please try again.");
      return;
    }

    window.alert("Registration successful! You can now log in.");
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text text40 marginB-20>
        Register
      </Text>

      <TextField
        placeholder="Name"
        floatingPlaceholder
        value={user.name}
        onChangeText={(name) => setUser({ ...user, name })}
        marginB-20
        style={styles.input} // Aplica o estilo de input
      />

      <TextField
        placeholder="Email"
        floatingPlaceholder
        value={user.email}
        onChangeText={(email) => setUser({ ...user, email })}
        marginB-20
        style={styles.input} // Aplica o estilo de input
      />

      <TextField
        placeholder="Password"
        floatingPlaceholder
        value={user.password}
        onChangeText={(password) => setUser({ ...user, password })}
        secureTextEntry
        marginB-20
        style={styles.input} // Aplica o estilo de input
      />

      <TextField
        placeholder="Confirm Password"
        floatingPlaceholder
        value={user.confirmPassword}
        onChangeText={(confirmPassword) =>
          setUser({ ...user, confirmPassword })
        }
        secureTextEntry
        marginB-20
        style={[
          styles.input, // Aplica o estilo de input
          { borderColor: errors.confirmPassword ? "red" : undefined }, // Muda a cor da borda
        ]}
      />

      <Button label="Register" onPress={handleRegister} style={styles.button} marginV-10 /> {/* Estilo do botão */}
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: width * 0.3, // Mantém a largura igual à tela de login
    borderColor: "black",
  },
  button: {
    width: width * 0.175, // Mantém a largura igual à tela de login
  },
});

export default RegisterScreen;