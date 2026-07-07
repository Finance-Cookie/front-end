import { Stack } from 'expo-router'
import { NewExitProvider } from '@/contexts/NewExitContext'

export default function NewExitLayout() {
  return (
    <NewExitProvider>
      <Stack screenOptions={{ 
              headerStyle: {
                backgroundColor: '#FFFFF2',
              },
              headerTintColor: '#1E1E1E',
              headerTitleStyle: {
                fontWeight: '600',
              },
        }}>
        <Stack.Screen name='index' options={{ title: "Tipo de Saída"}}/>
        <Stack.Screen name='select-type' options={{ title: "Selecionar Tipo" }} />
        <Stack.Screen name='purchase-place' options={{ title: "Local da Compra"}}/>
        <Stack.Screen name='purchase-itens' options={{ title: "Itens"}}/>
        <Stack.Screen name='newItem' options={{ title: "Novo Item"}}/>
        <Stack.Screen name='purchase-payment' options={{ title: "Pagamento"}}/>
      </Stack>
    </NewExitProvider>
  )
}