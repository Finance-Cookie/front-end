import { Stack } from "expo-router"

export default function TypesLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#FFFFF2",
                },
                headerTintColor: "#1E1E1E",
                headerTitleStyle: {
                    fontWeight: "600",
                },
            }}
        >
            <Stack.Screen name="index" options={{ title: "Tipos" }} />
            <Stack.Screen name="types" options={{ title: "Lista de Tipos" }} />
            <Stack.Screen name="[id]" options={{ title: "Tipo" }} />
            <Stack.Screen name="(new)" options={{ headerShown: false }} />
        </Stack>
    )
}