import React, { useState } from "react";
import { View, Text, TextField, Button } from "react-native-ui-lib";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import tryRegisterWithEmailAndPassword from "../../http/auth/RegisterWithEmailAndPassword";

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
    <View flex padding-20>
      <Text text40 marginB-20>
        Register
      </Text>

      <TextField
        placeholder="Name"
        floatingPlaceholder
        value={user.name}
        onChangeText={(name) => setUser({ ...user, name })}
        marginB-20
      />

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

      <TextField
        placeholder="Confirm Password"
        floatingPlaceholder
        value={user.confirmPassword}
        onChangeText={(confirmPassword) =>
          setUser({ ...user, confirmPassword })
        }
        secureTextEntry
        marginB-20
        style={{
          borderColor: errors.confirmPassword ? "red" : undefined,
        }}
      />

      <Button label="Register" onPress={handleRegister} fullWidth marginV-10 />
    </View>
  );
};

export default RegisterScreen;
