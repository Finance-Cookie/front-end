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
        <Stack.Screen name='index' options={{ title: "Tipo de Entrada"}}/>
        <Stack.Screen name='select-type' options={{ title: "Selecionar Tipo" }} />
        <Stack.Screen name='sale-client' options={{ title: "Cliente"}}/>
        <Stack.Screen name='sale-products' options={{ title: "Itens"}}/>
        <Stack.Screen name='sale-payment' options={{ title: "Pagamento"}}/>
      </Stack>
    </NewEntryProvider>
  )
}