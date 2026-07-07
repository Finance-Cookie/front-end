import { Stack } from 'expo-router'
import { NewEntryProvider } from '@/contexts/NewEntryContext'

export default function Layout() {
  return (
    <NewEntryProvider>
      <Stack screenOptions={{ 
              headerStyle: {
                backgroundColor: '#FFFFF2',
              },
              headerTintColor: '#1E1E1E',
              headerTitleStyle: {
                fontWeight: '600',
              },
        }}>
        <Stack.Screen name='index' options={{ title: "Nova Entrada"}}/>
        <Stack.Screen name='simples' options={{ title: "Entrada Simples"}}/>
      </Stack>
    </NewEntryProvider>
  )
}