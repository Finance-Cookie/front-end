import { useEffect, useState } from "react"
import { View, Text, ScrollView } from "react-native"
import { useRouter } from "expo-router"
import { Card } from "@/components/Card"
import { Feather } from "@expo/vector-icons"
import { useNewExit } from "@/contexts/NewExitContext"
import { getTiposPagamento, TipoPagamento } from "@/services/api"

export default function SelectType() {
    const router = useRouter()
    const { setExit } = useNewExit()

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

    function handleSelectType(tipo: TipoPagamento) {
        setExit((exit) => ({
            ...exit,
            type: tipo.id,
            typeName: tipo.nome,
        }))

        const nomeTipo = tipo.nome.trim().toLowerCase()

        if (nomeTipo === "compra" || nomeTipo === "compras") {
            router.replace("/(exits)/(new)/purchase-place")
            return
        }

        router.replace({
            pathname: "/(exits)/(new)/purchase-payment",
            params: {
                mode: "select-payment",
            },
        })
    }

    useEffect(() => {
        loadTipos()
    }, [])

    return (
        <View className="w-full h-full">
            <ScrollView>
                <View className="w-full px-10 h-full items-center self-center gap-5 py-10">
                    <Text className="text-preto text-2xl font-bold self-start">
                        Selecionar Tipo
                    </Text>

                    {loading && (
                        <Text className="text-preto text-2xl font-bold">
                            Carregando tipos...
                        </Text>
                    )}

                    {!loading && tipos.length === 0 && (
                        <Text className="text-preto text-xl font-normal">
                            Nenhum tipo cadastrado.
                        </Text>
                    )}

                    <View className="w-full gap-4">
                        {!loading && tipos.map((tipo) => (
                            <Card
                                key={tipo.id}
                                onPress={() => handleSelectType(tipo)}
                                className="flex-row justify-between items-center"
                                backgroundColor="#FFFFF2"
                                borderColor="cinza-200"
                            >
                                <Text className="text-preto text-2xl font-bold">
                                    {tipo.nome}
                                </Text>

                                <Feather name="check" size={28} color="#1E1E1E" />
                            </Card>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}