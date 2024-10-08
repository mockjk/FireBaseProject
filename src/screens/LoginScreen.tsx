import React, { useState } from "react";
import { View, Text, TextField, Button } from "react-native-ui-lib";
import { StackNavigationProp } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { RootStackParamList } from "../../App";
import tryLoginWithEmailAndPassword from "../../http/auth/LoginWithEmailAndPassword";
import { width } from "../constants/measures";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

interface User {
  email: string;
  password: string;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [user, setUser] = useState<User>({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email: boolean; password: boolean }>({
    email: false,
    password: false,
  });

  // Function trylogin
  const handleLogin = async () => {
    const response = await tryLoginWithEmailAndPassword(user);
    if (!response) {
      setErrors({
        email: user.email === "",
        password: user.password === "",
      });
      window.alert("Login failed. Please try again.");
      return;
    }
    window.alert("Login successful!");
    navigation.replace("Welcome");
  };

  const handleEmailChange = (email: string) => {
    setUser({ ...user, email });
    if (errors.email && email !== "") {
      setErrors((prev) => ({ ...prev, email: false }));
    }
  };

  const handlePasswordChange = (password: string) => {
    setUser({ ...user, password });
    if (errors.password && password !== "") {
      setErrors((prev) => ({ ...prev, password: false }));
    }
  };

  const handleNavigateToRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
        <Text text40 marginB-20>
          Login
        </Text>

        <TextField
          placeholder="Email"
          floatingPlaceholder
          value={user.email}
          onChangeText={handleEmailChange}
          marginB-20
          style={[
            styles.input,
            { borderColor: errors.email ? "red" : undefined }, // Muda a cor da borda
          ]}
        />

        <TextField
          placeholder="Password"
          floatingPlaceholder
          value={user.password}
          onChangeText={handlePasswordChange}
          secureTextEntry
          marginB-20
          style={[
            styles.input,
            { borderColor: errors.password ? "red" : undefined }, // Muda a cor da borda
          ]}
        />

        <Button label="Login" onPress={handleLogin} style={styles.button} marginV-10 />

        <Button
          label="Go to Register"
          onPress={handleNavigateToRegister}
          outline
          style={styles.button}
          marginV-10
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: width*0.3,
    borderColor: "black"
  },
  button: {
    width: width*0.175,
  },
});

export default LoginScreen;