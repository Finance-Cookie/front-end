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
                    <View className="w-full gap-4">
                        <Card onPress={() => router.push("/simples")} className="flex-row justify-between items-center" backgroundColor="#FFFFF2" borderColor="cinza-200">
                            <View className="gap-1">
                                <Text className="text-preto text-2xl font-bold">Entrada Simples</Text>
                                <Text className="text-preto text-xl font-normal">Cadastrar Entrada</Text>
                            </View>
                            <Feather name="arrow-right" size={28} color="#1E1E1E"/>
                        </Card>
                        <Card className="flex-row justify-between items-center" backgroundColor="#FFFFF2" borderColor="cinza-200">
                            <View className="gap-1">
                                <Text className="text-preto text-2xl font-bold">Venda</Text>
                                <Text className="text-preto text-xl font-normal">Cadastrar Venda</Text>
                            </View>
                            <Feather name="arrow-right" size={28} color="#1E1E1E"/>
                        </Card>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}