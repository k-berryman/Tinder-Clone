# Tinder Clone

React Native, Expo, yarn, iOS, Android, Tailwind React Native, Context API, Google Auth/Sign-In, Firebase v9, Matching Algo, 1-1 Messaging, React Native Navigation, useContext API, custom hook

### Set Up Expo
Go to expo.dev, make an account
`sudo npm install --global expo-cli`
`expo init tinder-clone`, choose blank template
`cd tinder-clone`
`expo start`
Scan the QR Code, download Expo Go on your phone, and now you can see your app on your phone!
Hit `w` to open up web localhost — it works!
Hit `i` to open iOS Simulator — it works!

### Set Up Tailwind React Native
`yarn add tailwind-rn`
In `App.js`,
- `import { useTailwind } from 'tailwind-rn';`
- In the function, add `const tw = useTailwind();`
- Delete const `styles`
- Edit `<View style={tw('justify-center items-center')}>`

### Set Up React Native Navigation


### Notes
Instead of `<div></div>`s, we have `<View />`s
A view compiles down to relevant code for each platform
Now you can build an iOS App without a Mac
In React Native, flexbox turns items into a vertical column (which is the opposite of normal React) because it's on a phone and there's more vertical space
