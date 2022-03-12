import React, { createContext, useContext } from 'react'
import { View, Text } from 'react-native'

// Create the data layer for auth data
const AuthContext = createContext({
  // initial state is blank
});

export const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider
      value={{
        user: 'Kaitlin',
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext);
}
