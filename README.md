# Firebase Authentication com Email/Senha e Firestore

Este guia descreve como implementar o fluxo de cadastro de um usuário usando autenticação por e-mail e senha com Firebase, e como salvar os dados adicionais (nome completo e data de nascimento) no Firestore, utilizando o `uid` como chave primária no documento.

## Pré-requisitos

- Conta Firebase
- Projeto Firebase configurado
- Firebase Authentication e Firestore ativados

### 1. Instalar o SDK Firebase
Primeiro, instale o SDK do Firebase na sua aplicação:

```bash
npm install firebase
npm install firebase/firestore
npm install firebase/auth
```

### 2. Configurar Firebase no Projeto
Adicione a configuração do Firebase no seu arquivo principal:

```javascript
// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

Perceba que estamos exportando o acesso a nossos serviços diretamente no nosso arquivo de configuração `index.js` ou `config.js`

### 3. Cadastro de Usuário com Email/Senha
Crie uma função para registrar o usuário utilizando email e senha. Após o cadastro, armazene os dados adicionais no Firestore, utilizando o uid como chave primária do documento.

```javascript
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from './firebaseConfig';

const registerUser = async (email, password, fullName, birthDate) => {
  try {
    // Criação de usuário no Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Salvar dados adicionais no Firestore com uid como chave primária
    await setDoc(doc(db, "users", user.uid), {
      fullName: fullName,
      birthDate: birthDate,
      email: email,
    });

    console.log("Usuário registrado com sucesso:", user);
  } catch (error) {
    console.error("Erro no cadastro de usuário:", error.message);
  }
};
```

Perceba que o código acima não faz uso de padrões de design como o uso de objetos como parâmetro da função, e sim recebe variáveis soltas.

### 4. Conectar Formulário ao Cadastro
```javascript
<TextField
  placeholder="Nome Completo"
  value={user.fullName}
  onChangeText={(fullName) => setUser({ ...user, fullName })}
/>
<TextField
  placeholder="Email"
  value={user.email}
  onChangeText={(email) => setUser({ ...user, email })}
/>
<TextField
  placeholder="Senha"
  value={user.password}
  secureTextEntry
  onChangeText={(password) => setUser({ ...user, password })}
/>
<TextField
  placeholder="Confirmar Senha"
  value={user.confirmPassword}
  secureTextEntry
  onChangeText={(confirmPassword) => setUser({ ...user, confirmPassword })}
/>
<Button label="Registrar" onPress={() => registerUser(user.email, user.password, user.fullName, user.birthDate)} />
```

### 5. Fluxo de Login
```javascript
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebaseConfig';

const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Usuário logado com sucesso:", user);
    // Redirecionar para a tela principal ou dashboard
  } catch (error) {
    console.error("Erro no login de usuário:", error.message);
  }
};
```

### 6. Formulário de Login
```javascript
<TextField
  placeholder="Email"
  value={email}
  onChangeText={setEmail}
/>
<TextField
  placeholder="Senha"
  value={password}
  secureTextEntry
  onChangeText={setPassword}
/>
<Button label="Login" onPress={() => loginUser(email, password)} />
```

### 7. Erros Comuns

- Email já em uso.

### 8. Verificando o Firestore
Após o cadastro, você pode verificar o Firestore para confirmar se o documento foi criado corretamente:

- Abra o console Firebase.
- Navegue até Firestore Database.
- Verifique se a coleção users foi criada e os dados do usuário foram armazenados com o uid como chave.
  
👥 Membros
<table> 
     <tr> 
          <td align="center"> 
               <a href="https://github.com/mockjk"> 
                    <img src="https://avatars.githubusercontent.com/mockjk" width="100px;" alt="mockjk"/>
                    <br /> 
                    <sub>
                         <b>
                              Mock
                         </b>
                    </sub> 
               </a> 
          </td> 
          <td align="center"> 
               <a href="https://github.com/hayasshida"> 
                    <img src="https://avatars.githubusercontent.com/hayasshida" width="100px;" alt="hayasshida"/> 
                    <br /> 
                    <sub>
                         <b>
                              Hayashida
                         </b>
                    </sub> 
               </a> 
          </td>
          <td>
               <a href="https://github.com/Caua-Guerra">
                    <img src="https://avatars.githubusercontent.com/Caua-Guerra" width="100px;" alt="Caua-Guerra"/> 
                    <br /> 
                    <sub>
                         <b>
                              Guerra
                         </b>
                    </sub> 
               </a> 
          </td> 
     </tr> 
</table>
