import { Stack } from "expo-router"

export default function EntriesLayout(){
    return (
        <Stack screenOptions={{ 
              headerStyle: {
                backgroundColor: '#FFFFF2',
              },
              headerTintColor: '#1E1E1E',
              headerTitleStyle: {
                fontWeight: '600',
              },
            }}>
            <Stack.Screen name="index" options={{ title: "Entradas" }}/>
            <Stack.Screen name="entries" options={{ title: "Lista de Entradas" }}/>
            <Stack.Screen name="[id]" options={{ title: `Entrada` }}/>
            <Stack.Screen name="(new)" options={{ headerShown: false }}/>
        </Stack>
    )
}