import { Stack } from "expo-router"

export default function ItemsLayout() {
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
            <Stack.Screen name="index" options={{ title: "Itens" }} />
            <Stack.Screen name="items" options={{ title: "Lista de Itens" }} />
            <Stack.Screen name="[id]" options={{ title: "Item" }} />
            <Stack.Screen name="(new)" options={{ headerShown: false }} />
        </Stack>
    )
}