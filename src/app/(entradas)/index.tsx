import { Button } from "@/components/Button"
import Calendar from "@/components/Calendar"
import { Card } from "@/components/Card"
import { Feather } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { View, Text, ScrollView } from "react-native"

export default function Entries(){
    const router = useRouter()
    return (
        <View className="w-full h-full">
            <ScrollView>
                <View className="w-full px-10 h-full items-center self-center gap-5 py-10">
                    <Calendar/>
                    <Button onPress={() => router.push("/(entries)/(new)")} label="Nova Entrada" color="text-branco-100" background="bg-verde"/>
                    <View className="bg-branco-100 w-full h-96 border rounded-xl border-verde items-center justify-center">
                        <Text>Gráfico</Text>
                    </View>
                    <Card onPress={() => router.push("/entries")} className="flex-row justify-between items-center" backgroundColor="#FFFFF2" borderColor="cinza-200">
                        <View className="gap-1">
                            <Text className="text-preto text-2xl font-bold">Entradas</Text>
                            <Text className="text-preto text-xl font-normal">Visualizar lista</Text>
                        </View>
                        <Feather name="arrow-right" size={28} color="#1E1E1E"/>
                    </Card>
                    <Card className="flex-row justify-between items-center" backgroundColor="#FFFFF2" borderColor="cinza-200">
                        <View className="gap-1">
                            <Text className="text-preto text-2xl font-bold">Vendas</Text>
                            <Text className="text-preto text-xl font-normal">Visualizar lista</Text>
                        </View>
                        <Feather name="arrow-right" size={28} color="#1E1E1E"/>
                    </Card>
                </View>
            </ScrollView>
            <View className="w-full bg-preto flex-row justify-around p-12 pb-16 rounded-t-2xl">
                <Text className="text-branco-100 text-4xl font-bold">R$ 00,00</Text>
                <Text className="text-cinza-100 font-normal text-2xl">Em Entradas</Text>
            </View>
        </View>
    )
}