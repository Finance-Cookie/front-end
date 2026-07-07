import { useNewClient } from '@/contexts/NewClientContext'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { View, ScrollView } from 'react-native'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { createClient } from '@/services/api'

export default function Client() {
    const router = useRouter()
    const { client, setClient } = useNewClient()
    const [nome, setNome] = useState(client.nome || '')
    const [telefone, setTelefone] = useState(String(client.telefone || ''))
    const [email, setEmail] = useState(client.email || '')

    return (
        <View className="w-full h-full">
            <ScrollView>
                <View className="w-full px-10 h-full items-center self-center gap-5 py-10">
                    <Input label="Nome" value={nome} onChangeText={setNome}/>
                    <Input label='Telefone' value={telefone} onChangeText={setTelefone}/>
                    <Input label='Email' value={email} onChangeText={setEmail}/>
                    <Button background='bg-vermelho-200' color='text-branco-100' label='Avançar'
                        onPress={() => {
                            setClient({ nome, telefone, email })
                            router.push('/(clients)/(new)/address')
                        }}
                    />
                </View>
            </ScrollView>
        </View>
    )
}