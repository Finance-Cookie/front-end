import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Feather } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { View, Text, ScrollView } from "react-native"

export default function Types() {
    const router = useRouter()

    return (
        <View className="w-full h-full">
            <ScrollView>
                <View className="w-full px-10 h-full items-center self-center gap-5 py-10">
                    <Button
                        onPress={() => router.push("/(types)/(new)")}
                        label="Novo Tipo"
                        color="text-branco-100"
                        background="bg-vermelho-200"
                    />

                    <Card
                        onPress={() => router.push("/(types)/types")}
                        className="flex-row justify-between items-center"
                        backgroundColor="#FFFFF2"
                        borderColor="cinza-200"
                    >
                        <View className="gap-1">
                            <Text className="text-preto text-2xl font-bold">
                                Tipos
                            </Text>
                            <Text className="text-preto text-xl font-normal">
                                Visualizar Lista
                            </Text>
                        </View>

                        <Feather name="arrow-right" size={28} color="#1E1E1E" />
                    </Card>
                </View>
            </ScrollView>
        </View>
    )
}