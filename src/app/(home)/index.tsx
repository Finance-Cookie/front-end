import { View, Text, Pressable, ScrollView } from "react-native";
import { Card } from "../../components/Card";
import { Feather } from "@expo/vector-icons"
import { Button } from "@/components/Button";
import { useState } from "react"

import { useRouter } from "expo-router";

export default function Home() {
    const router = useRouter()
    const [user, setUser] = useState<{ nome: String; saldo_fisico: String; saldo_online: String } | null>({
        nome: "Elder",
        saldo_fisico: "0",
        saldo_online: "0"
    })
    const saldoTotal = (user ? Number(user.saldo_fisico) + Number(user.saldo_online) : 0).toFixed(2)

    if (!user) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text>Nenhum usuário encontrado</Text>
            </View>
        )
    }

    return (
        <ScrollView>
            <View className="w-full px-10 h-full items-center self-center gap-5 pt-10">
                <View className="self-start flex-row w-full justify-between items-center border-b border-cinza-200 pb-4">
                    <Text className='font-semibold text-preto text-3xl'>Olá, {user.nome}!</Text>
                    <Pressable onPress={() => router.push("/(user)/profile")}>
                        <Feather name="user" size={28} color="#1E1E1E"/>
                    </Pressable>
                </View>
                <Text className="self-start text-preto font-normal text-2xl">Informações do dia</Text>
                <View className="flex-row w-full h-1/3 gap-4">
                    <View className="flex-auto h-full">
                        <Card backgroundColor="#FFFFF2" className="h-full items-center justify-around" borderColor="azul">
                            <View className="w-11/12">
                                <Text className="text-preto text-3xl font-bold">10</Text>
                                <Text className="text-cinza-300 text-2xl">Vendas</Text>
                            </View>
                            <View className="w-11/12">
                                <Text className="text-preto text-3xl font-bold">10</Text>
                                <Text className="text-cinza-300 text-2xl">Compras</Text>
                            </View>
                        </Card>
                    </View>
                    <View className="flex-auto h-full justify-between">
                        <Card onPress={() => router.push("/(entradas)")} borderColor="verde" backgroundColor="#FFFFF2" className="flex-auto justify-evenly">
                            <Feather name="log-in" color="#2B8722" size={20} />
                            <Text className="text-cinza-300 text-xl">Entradas</Text>
                            <Text className="text-preto text-3xl font-bold">R$ 00,00</Text>
                        </Card>
                        <Card onPress={() => router.push("/(exits)")} borderColor="vermelho-100" backgroundColor="#FFFFF2" className="flex-auto justify-evenly">
                            <Feather name="log-out" color="#930A0A" size={20} />
                            <Text className="text-cinza-300 text-xl">Saídas</Text>
                            <Text className="text-preto text-3xl font-bold">R$ 00,00</Text>
                        </Card>
                    </View>
                </View>
                <Text className="self-start text-preto font-normal text-2xl">Seus dados monetários</Text>
                <View className="w-full flex-row items-center gap-5">
                    <Text className="text-azul text-4xl font-bold">R$ {saldoTotal}</Text>
                    <Text className="text-preto font-normal text-2xl">Saldo Total</Text>
                </View>
                <View className="w-full flex-row justify-between">
                    <Card className="flex-1" borderColor="cinza-200" backgroundColor="#FFFFF2">
                        <View className="flex-row justify-between items-center">
                            <Text className="text-preto font-normal text-xl">Saldo Online</Text>
                            <Feather name="chevron-right" color="#333333" size={24}/>
                        </View>
                        <Text className="text-azul text-3xl font-bold">R$ {user.saldo_online}</Text>
                    </Card>
                    <Card className="flex-1" borderColor="cinza-200" backgroundColor="#FFFFF2">
                        <View className="flex-row justify-between items-center">
                            <Text className="text-preto font-normal text-xl">Saldo Físico</Text>
                            <Feather name="chevron-right" color="#333333" size={24}/>
                        </View>
                        <Text className="text-azul text-3xl font-bold">R$ {user.saldo_fisico}</Text>
                    </Card>
                </View>
                <View className="w-full gap-4">
                    <Button onPress={() => router.push("/(entradas)/(new)")} label="Nova Entrada" color="text-branco-100" background="bg-verde"/>
                    <Button onPress={() => router.push("/(exits)/(new)")} label="Nova Saída" color="text-branco-100" background="bg-vermelho-100"/>
                </View>

            </View>
        </ScrollView>
    )
}