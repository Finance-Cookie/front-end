import { Button } from "@/components/Button"
import Calendar from "@/components/Calendar"
import { Card } from "@/components/Card"
import { Feather } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { View, Text, ScrollView } from "react-native"

export default function Products(){
    const router = useRouter()
    return (
        <View className="w-full h-full">
            <ScrollView>
                <View className="w-full px-10 h-full items-center self-center gap-5 py-10">
                    <Calendar/>
                    <Button onPress={() => router.push("/(new)")} label="Novo Produto" color="text-branco-100" background="bg-amarelo"/>
                    <View className="w-full">
                        <Text className="self-start text-preto font-normal text-2xl">Rankig do Dia</Text>
                        <Card className="flex-row justify-between border-0 border-b border-cinza-200" >
                            <Text className="self-start text-preto font-bold text-2xl">1°</Text>
                            <Text className="self-start text-preto font-normal text-xl">Produto 1</Text>
                            <Text className="self-start text-preto font-bold text-2xl">30</Text>
                        </Card>
                        <Card className="flex-row justify-between border-0 border-b border-cinza-200" >
                            <Text className="self-start text-preto font-bold text-2xl">2°</Text>
                            <Text className="self-start text-preto font-normal text-xl">Produto 2</Text>
                            <Text className="self-start text-preto font-bold text-2xl">30</Text>
                        </Card>
                        <Card className="flex-row justify-between border-0 border-b border-cinza-200" >
                            <Text className="self-start text-preto font-bold text-2xl">3°</Text>
                            <Text className="self-start text-preto font-normal text-xl">Produto 3</Text>
                            <Text className="self-start text-preto font-bold text-2xl">30</Text>
                        </Card>
                    </View>
                    <View className="w-full gap-4">
                        <Card onPress={() => router.push("/products")} className="flex-row justify-between items-center" backgroundColor="#FFFFF2" borderColor="cinza-200">
                            <View className="gap-1">
                                <Text className="text-preto text-2xl font-bold">Produtos</Text>
                                <Text className="text-preto text-xl font-normal">Visualizar lista</Text>
                            </View>
                            <Feather name="arrow-right" size={28} color="#1E1E1E"/>
                        </Card>
                        <Card onPress={() => router.push("/monthly-analysis")} className="flex-row justify-between items-center" backgroundColor="#FFFFF2" borderColor="cinza-200">
                            <View className="gap-1">
                                <Text className="text-preto text-2xl font-bold">Análise por Mês</Text>
                                <Text className="text-preto text-xl font-normal">Dados dos Produtos</Text>
                            </View>
                            <Feather name="arrow-right" size={28} color="#1E1E1E"/>
                        </Card>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}