import { Button, FilterButton } from "@/components/Button"
import { Card } from "@/components/Card"
import { Input } from "@/components/Input"
import { Feather } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { View, Text, ScrollView } from "react-native"

export default function Clients(){
    const router = useRouter()
    return (
        <View className="w-full h-full">
            <ScrollView>
                <View className="w-full px-10 h-full items-center self-center gap-5 py-10">
                    <Button onPress={() => router.push("/(new)")} label="Novo Cliente" color="text-branco-100" background="bg-vermelho-200"/>
                    <View className="w-full gap-4">
                        <Card onPress={() => router.push("/clients")} className="flex-row justify-between items-center" backgroundColor="#FFFFF2" borderColor="cinza-200">
                            <View className="gap-1">
                                <Text className="text-preto text-2xl font-bold">Clientes</Text>
                                <Text className="text-preto text-xl font-normal">Visualizar Lista</Text>
                            </View>
                            <Feather name="arrow-right" size={28} color="#1E1E1E"/>
                        </Card>
                        <Card className="flex-row justify-between items-center" backgroundColor="#FFFFF2" borderColor="cinza-200">
                            <View className="gap-1">
                                <Text className="text-preto text-2xl font-bold">Análise</Text>
                                <Text className="text-preto text-xl font-normal">Dados dos Clientes</Text>
                            </View>
                            <Feather name="arrow-right" size={28} color="#1E1E1E"/>
                        </Card>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}