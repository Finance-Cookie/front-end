import { Stack } from "expo-router"

export default function NewItemLayout() {
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
            <Stack.Screen name="index" options={{ title: "Novo Item" }} />
        </Stack>
    )
}