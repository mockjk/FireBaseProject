import React, { useState } from "react";
import { View, Text, TextField, Button } from "react-native-ui-lib";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import tryLoginWithEmailAndPassword from "../../http/auth/LoginWithEmailAndPassword";

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

  const handleLogin = async () => {
    const response = await tryLoginWithEmailAndPassword(user);
    if (!response) {
      return;
    }
    navigation.navigate("Welcome");
  };

  return (
    <View flex padding-20>
      <Text text40 marginB-20>
        Login
      </Text>

      <TextField
        placeholder="Email"
        floatingPlaceholder
        value={user.email}
        onChangeText={(email) => setUser({ ...user, email })}
        marginB-20
      />

      <TextField
        placeholder="Password"
        floatingPlaceholder
        value={user.password}
        onChangeText={(password) => setUser({ ...user, password })}
        secureTextEntry
        marginB-20
      />

      <Button label="Login" onPress={handleLogin} fullWidth marginV-10 />
    </View>
  );
};

export default LoginScreen;
