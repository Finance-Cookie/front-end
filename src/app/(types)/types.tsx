import { useEffect, useState } from "react"
import { View, Text, ScrollView } from "react-native"
import { useRouter } from "expo-router"
import { Card } from "@/components/Card"
import { Feather } from "@expo/vector-icons"
import { getTiposPagamento, TipoPagamento } from "@/services/api"

export default function TypesList() {
    const router = useRouter()
    const [tipos, setTipos] = useState<TipoPagamento[]>([])
    const [loading, setLoading] = useState(true)

    async function loadTipos() {
        try {
            setLoading(true)
            const data = await getTiposPagamento()
            setTipos(data)
        } catch (error) {
            console.error("Erro ao buscar tipos:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadTipos()
    }, [])

    return (
        <View className="w-full h-full">
            <ScrollView>
                <View className="w-full px-10 h-full items-center self-center gap-5 py-10">
                    <Text className="text-preto text-2xl font-bold self-start">
                        Tipos de Pagamento
                    </Text>

                    {loading && (
                        <Text className="text-preto text-2xl font-bold">
                            Carregando tipos...
                        </Text>
                    )}

                    <Text className="text-preto text-xl font-normal self-start">
                        Total de Tipos: {tipos.length}
                    </Text>

                    <View className="w-full gap-4">
                        {!loading && tipos.map((tipo) => (
                            <Card
                                key={tipo.id}
                                onPress={() => router.push(`/(types)/${tipo.id}`)}
                                className="flex-row justify-between items-center"
                                backgroundColor="#FFFFF2"
                                borderColor="cinza-200"
                            >
                                <View className="gap-1">
                                    <Text className="text-preto text-2xl font-bold">
                                        {tipo.nome}
                                    </Text>
                                    <Text className="text-preto text-xl font-normal">
                                        Editar ou excluir
                                    </Text>
                                </View>

                                <Feather name="arrow-right" size={28} color="#1E1E1E" />
                            </Card>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}