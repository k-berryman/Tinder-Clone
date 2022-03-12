import React, { createContext, useContext } from 'react'
import { View, Text } from 'react-native'
import * as Google from 'expo-google-app-auth'

// Create the data layer for auth data
const AuthContext = createContext({
  // Initial state is blank
});

// The data we need access to from Google
const config = {
  // intentionally missing keys
  scopes: ['profile', 'email'],
  permissions: ['public_profile', 'email', 'gender', 'location'],
}

export const AuthProvider = ({ children }) => {

  // connect to Google Log-In pop-up
  const signInWithGoogle = async() => {
    Google.logInAsync(config).then(async (logInResult) => {
      if(logInResult.type === 'success') {
        // login...
      }
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user: null,
        signInWithGoogle
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext);
}
