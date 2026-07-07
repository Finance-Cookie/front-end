import { useEffect, useState } from "react"
import { View, Text, ScrollView } from "react-native"
import { useRouter } from "expo-router"
import { Card } from "@/components/Card"
import { Feather } from "@expo/vector-icons"
import { Input } from "@/components/Input"
import { FilterButton } from "@/components/Button"
import { getItems, Item } from "@/services/api"

export default function ItemsList() {
    const router = useRouter()

    const [items, setItems] = useState<Item[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [ordering, setOrdering] = useState("")

    async function loadItems(searchText = "", orderingText = "") {
        try {
            setLoading(true)
            const data = await getItems(searchText, orderingText)
            setItems(data)
        } catch (error) {
            console.error("Erro ao buscar itens:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadItems(search, ordering)
    }, [search, ordering])

    return (
        <View className="w-full h-full">
            <ScrollView>
                <View className="w-full px-10 h-full items-center self-center gap-5 py-10">
                    <Input
                        label="Pesquisar item"
                        value={search}
                        onChangeText={setSearch}
                    />

                    <View className="flex-row gap-2 flex-wrap self-start">
                        <FilterButton
                            label="A-Z"
                            selected={ordering === "nome"}
                            background="bg-vermelho-100"
                            onPress={() => setOrdering("nome")}
                        />

                        <FilterButton
                            label="Z-A"
                            selected={ordering === "-nome"}
                            background="bg-vermelho-100"
                            onPress={() => setOrdering("-nome")}
                        />

                        <FilterButton
                            label="Menor valor"
                            selected={ordering === "valor"}
                            background="bg-vermelho-100"
                            onPress={() => setOrdering("valor")}
                        />

                        <FilterButton
                            label="Maior valor"
                            selected={ordering === "-valor"}
                            background="bg-vermelho-100"
                            onPress={() => setOrdering("-valor")}
                        />
                    </View>

                    {loading && (
                        <Text className="text-preto text-2xl font-bold">
                            Carregando itens...
                        </Text>
                    )}

                    <Text className="text-preto text-xl font-normal self-start">
                        Total de Itens: {items.length}
                    </Text>

                    <View className="w-full gap-4">
                        {!loading && items.map((item) => (
                            <Card
                                key={item.id}
                                onPress={() => router.push(`/(items)/${item.id}`)}
                                className="flex-row justify-between items-center"
                                backgroundColor="#FFFFF2"
                                borderColor="cinza-200"
                            >
                                <View className="gap-1">
                                    <Text className="text-preto text-2xl font-bold">
                                        {item.nome}
                                    </Text>

                                    <Text className="text-preto text-xl font-normal">
                                        R$ {Number(item.valor).toFixed(2)}
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