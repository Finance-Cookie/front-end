import { useNewClient } from '@/contexts/NewClientContext'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { View, ScrollView } from 'react-native'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { createClient } from '@/services/api'

export default function ClientAddress() {
    const router = useRouter()
    const { client, setClient } = useNewClient()
    const [address, setAddress] = useState(client.endereco || {})

    return (
        <View className="w-full h-full">
            <ScrollView>
                <View className="w-full px-10 h-full items-center self-center gap-5 py-10">
                    <Input label="Bairro" value={address.bairro || ''} onChangeText={(text) => setAddress({...address, bairro: text})}/>
                    <Input label='Logradouro' value={address.logradouro || ''} onChangeText={(text) => setAddress({...address, logradouro: text})}/>
                    <Input label='Número' value={address.numero || ''} onChangeText={(text) => setAddress({...address, numero: text})}/>
                    <Button background='bg-vermelho-200' color='text-branco-100' label='Salvar' 
                        onPress={async () => {
                            console.log("botao clicado")
                            try {
                                console.log("Antes do createClient")
                                const response = await createClient({
                                    nome: client.nome,
                                    telefone: client.telefone,
                                    email: client.email,
                                    endereco: address,
                                })

                                console.log("Resposta:", response)

                                setClient(response)
                                router.replace('/(clients)/clients')
                            } catch (error: any) {
                                console.log("ERRO COMPLETO");
                                console.log(error.response);
                                console.log(error.response?.data);

                            }
                        }}
                    />
                </View>
            </ScrollView>
        </View>
    )
}