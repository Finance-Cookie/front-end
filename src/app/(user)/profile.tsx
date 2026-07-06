import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Feather } from "@expo/vector-icons"
import { View, Text, ScrollView } from "react-native"
import { useEffect, useState } from "react"

import { getMe } from "@/services/api"

export default function Profile(){
    const [user, setUser] = useState<{ id: number, nome: string, email: string, criado_em: string, saldo_fisico: string, saldo_online: string } | null>(null)

    const saldoTotal = (user ? Number(user.saldo_fisico) + Number(user.saldo_online) : 0).toFixed(2)

    useEffect(() => {
        (async () => {
            const u = await getMe()
            setUser(u)
        })().catch(() => {})
    }, [])


    if (!user) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text>Nenhum usuário encontrado</Text>
            </View>
        )
    }

    return (
        <ScrollView>
            <View className="w-full px-10 h-full items-center self-center gap-5 pt-16">
                <View className="bg-azul/50 rounded-md p-2">
                    <Feather name="user" size={36} color="#1E1E1E"/>
                </View>
                
                <View className="self-start w-full gap-4">
                    <Text className="self-start text-preto font-normal text-2xl">Informações Pessoais</Text>
                    <Card borderColor="cinza-200" backgroundColor="#FFFFF2" className="w-full">
                        <View className="flex-row gap-2">
                            <Text className="text-preto font-normal text-2xl">Nome:</Text>
                            <Text className="text-preto font-bold text-2xl">{user.nome}</Text>
                        </View>
                        <View className="flex-row gap-2">
                            <Text className="text-preto font-normal text-2xl">Email:</Text>
                            <Text className="text-preto font-bold text-2xl">{user.email}</Text>
                        </View>
                        <View className="flex-row gap-2">
                            <Text className="self-start text-cinza-300 font-normal text-2xl">Criado em:</Text>
                            <Text className="self-start text-cinza-300 font-bold text-2xl">{new Date(user.criado_em).toLocaleDateString()}</Text>
                        </View>
                    </Card>
                    <Text className="self-start text-preto font-normal text-2xl">Dados Financeiros</Text>
                    <Card backgroundColor="#FFFFF2" borderColor="cinza-200">
                        <Text className="text-preto font-normal text-xl">Saldo Físico Inicial</Text>
                        <Text className="text-azul text-3xl font-bold">R$ {Number(user.saldo_fisico).toFixed(2)}</Text>
                    </Card>
                    <Card backgroundColor="#FFFFF2" borderColor="cinza-200">
                        <Text className="text-preto font-normal text-xl">Saldo Online Inicial</Text>
                        <Text className="text-azul text-3xl font-bold">R$ {Number(user.saldo_online).toFixed(2)}</Text>
                    </Card>
                    <View className="border-y border-cinza-200 p-2">
                        <Text className="text-preto font-normal text-xl">Saldo Total Inicial</Text>
                        <Text className="text-azul text-3xl font-bold">R$ {saldoTotal}</Text>
                    </View>
                </View>
                <Button label="Editar" color="text-branco-100"/>
            </View>
        </ScrollView>
    )
}