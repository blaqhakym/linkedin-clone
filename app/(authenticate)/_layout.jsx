import { Stack } from "expo-router";
import { UserContextProvider } from "../../userContext";

export default function Layout() {
  return (
    // <UserContextProvider>
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
    </Stack>
    // </UserContextProvider>
      
  );
}
