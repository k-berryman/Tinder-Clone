# Tinder Clone

React Native, Expo, yarn, iOS, Android, Tailwind React Native, Context API, Google Auth/Sign-In, Firebase v9, Matching Algo, 1-1 Messaging, React Native Navigation, useContext API, custom hook, modals

Auth involves Firebase and Expo Google App Auth

## Set Up Expo
Go to expo.dev, make an account
`sudo npm install --global expo-cli`
`expo init tinder-clone`, choose blank template
`cd tinder-clone`
`expo start`
Scan the QR Code, download Expo Go on your phone, and now you can see your app on your phone!
Hit `w` to open up web localhost — it works!
Hit `i` to open iOS Simulator — it works!
Hit `r` to reload :D

## Set Up Tailwind React Native
`yarn add tailwind-rn`
In `App.js`,
- `import { useTailwind } from 'tailwind-rn';`
- In the function, add `const tw = useTailwind();`
- Delete const `styles`
- Edit `<View style={tw('justify-center items-center')}>`

## Set Up React Native Navigation
`yarn add @react-navigation/native`
`expo install react-native-screens react-native-safe-area-context`
`yarn add @react-navigation/native-stack`

Since `App.js` is at the highest level in our app, it's a good place to make it where the Stack Navigator lives. We're going to create a Stack Navigator file, `StackNavigator.js`. Don't worry — we'll wind up importing `StackNavigator.js` into `App.js` soon. Start with the boilerplate
```
import React from 'react'
import { View, Text } from 'react-native'

const StackNavigator = () => {
  return (
    <View>
      <Text></Text>
    </View>
  )
}

export default StackNavigator
```

#### Let's Add Stacks
Stacks are our screens in our app and how they live in our app

In `StackNavigator`,
```
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();
```

This gives us all the routing capabilities within React Native Navigation

```
<Stack.Navigator>
</Stack.Navigator>
```

#### Let's Add a Screen
Create `screens/` and in that create `Homescreen.js` and add in a boilerplate
```
import React from 'react'
import { View, Text } from 'react-native'

const HomeScreen = () => {
  return (
    <View>
      <Text></Text>
    </View>
  )
}

export default HomeScreen
```

#### Let's Connect that Screen to it's Stack
Go back to `StackNavigator.js`
`import HomeScreen from './screens/HomeScreen'`

```
<Stack.Navigator>
  <Stack.Screen name='Home' component={HomeScreen} />
</Stack.Navigator>
```

#### Let's Render our Stack Navigator
Go to `App.js` (our highest level component) and update it
```
import React from 'react';
import { useTailwind } from 'tailwind-rn';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';

export default function App() {
  const tw = useTailwind();
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
```
(I'm keeping the tailwind logic...)

#### Let's add another screen!
Create `screens/ChatScreen.js` and add the boilerplate
```
import React from 'react'
import { View, Text } from 'react-native'

const ChatScreen = () => {
  return (
    <View>
      <Text></Text>
    </View>
  )
}

export default ChatScreen
```

In `StackNavigator.js`,
`import ChatScreen from './screens/ChatScreen';`
`<Stack.Screen name='Chat' component={ChatScreen} />``

## Home Screen Build
Navigate from the home screen to the chat screen with
`import { useNavigation } from '@react-navigation/core'`

`const navigation = useNavigation();`

`<Button title='Go to Chat Screen' onPress={() => navigation.navigate('Chat')}/>`

## Add Log-In Functionality
If you're logged in, you should see the Home Screen
If you're not, you should see the Log-In Screen

#### Create a Login Screen
Create `screens/LoginScreen.js` and add the boilerplate
```
import React from 'react'
import { View, Text } from 'react-native'

const LoginScreen = () => {
  return (
    <View>
      <Text></Text>
    </View>
  )
}

export default LoginScreen
```

In `StackNavigator.js`,
`import LoginScreen from './screens/LoginScreen';`
`<Stack.Screen name='Login' component={LoginScreen} />``

#### Protect App from Un-Authenticated Users

#### The Context API
A global layer around the app to store values. We can store our auth values here & access them whenever we need to.

Redux is considered "heavy-weight", while the Context API is built into React

#### Hooks
Create a folder called `hooks/`
In that, create `useAuth.js`
```
import React from 'react'
import { View, Text } from 'react-native'

export const AuthProvider = () => {
  return (
    <View>
      <Text></Text>
    </View>
  )
}
```

In `App.js`,
```
<NavigationContainer>
  <AuthProvider>
    <StackNavigator />
  </AuthProvider>
</NavigationContainer>
```
This is a HOC (Higher Order Component), meaning it's at a higher level, so it wraps our child component. Our auth wraps our app. Our auth passes down all the auth stuff to the children.

----

Go back to `useAuth.js`
Destructure props `{ children }`
Children is passed into every React component
In this case, `StackNavigator` is the child

#### Create AuthContext
In `useAuth.js`,
```
// Create the data layer for auth data
const AuthContext = createContext({
  // initial state is blank
});

export const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={null}>
      {children}
    </AuthContext.Provider>
  )
}
```
#### expo-google-app-auth
`expo install expo-google-app-auth`

#### Creating useAuth Custom Hook
We use the `useContext` hook

```
export default function useAuth() {
  return useContext(AuthContext);
}
```

#### Pass Username Down (from useAuth, to ChatScreen and StackNavigator)
`useAuth.js`
```
<AuthContext.Provider
  value={{
    user: 'Kaitlin',
  }}
>
  {children}
</AuthContext.Provider>
```

----

`ChatScreen.js` and `StackNavigator.js` (although make sure their directory references are correct)
```
import useAuth from '../hooks/useAuth';
const { user } = useAuth();
console.log(user);
```

----

This is possible because the screens are children of useAuth in 	`App.js`

----

Wonderful, at this point we've used the Context API!


## Implement Auth
#### Set up Firebase iOS
Create a new firebase project, click gear to go to Project Settings

Scroll down to your apps
Select iOS
Under Apple bundle ID, type `host.exp.exponent` because of Expo — this is important!! this allows Expo to get through Google. If you don't do this, you'll get a redirect uri error.
**If you try to deploy this app to the app store**, repeat this step but change the Apple bundle ID
Click register

Click the download for GoogleService-info.plist

Put `GoogleService-info.plist` into the main dir
This is basically the key that allows us to connect to our backend (AKA IT'S SECRETTT)

Put it in your `.gitignore` for now.
If this project gets bigger, make some environment variables

In Firebase, click next after downloading that.
Ignore the SDK
Keep clicking next

Now it shows up under your apps!
Check for App ID, bundle ID, etc

#### Set up Firebase Android
Scroll down to your apps
Add App
Select Android
Under Android package name, type `host.exp.exponent`
Click register

Click the download for google-services.json

Put `google-services.json` into the main dir

Put it in your `.gitignore` for now.
If this project gets bigger, make some environment variables

In Firebase, click next after downloading that.
Ignore the SDK
Keep clicking next

Now it shows up under your apps!
Check for App ID, bundle ID,

## Implement Google Auth

# Notes
- Instead of `<div>`s, we have `<View>`s
- A view compiles down to relevant code for each platform
- Now you can build an iOS App without a Mac
- In React Native, flexbox turns items into a vertical column (which is the opposite of normal React) because it's on a phone and there's more vertical space.
- React has React Router to navigate between pages
- React Native has Stacks. Define the stacks and then navigate  between each one
- You can't have 2 screens with the same name
- Top screen in stack gets rendered first
- Buttons are self-closing components
- We don't have onClick. Instead, we have onPress.
- Redux is considered "heavy-weight", while the Context API is built into React
- Use React Fragments to avoid compile errors from having sibling components
- You can have multiple Contexts for multiple data layers, like authContext or userContext or basketContext. Similar to Redux Slices
- Auth involves Firebase and Expo Google App Auth
- `expo-google-app-auth` allows us to use Google sign-in inside our Expo app
- Inspect logs in terminal or expo developer tools
