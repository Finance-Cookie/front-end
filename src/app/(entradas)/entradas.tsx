import { View, Text, ScrollView } from "react-native"
import { FilterButton } from "@/components/Button"
import Calendar from "@/components/Calendar"
import { Card } from "@/components/Card"
import { Feather } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { getEntries, Entry } from "@/services/api"
import { Input } from "@/components/Input"

export default function EntriesList() {
    const router = useRouter()

    const [entries, setEntries] = useState<Entry[]>([])
    const [loading, setLoading] = useState(true)

    const [search, setSearch] = useState("")
    const [ordering, setOrdering] = useState("-data")

    async function loadEntries(
        searchText = "",
        orderingText = "-data"
    ) {
        try {
            setLoading(true)

            const data = await getEntries(
                searchText,
                orderingText
            )

            setEntries(data)

        } catch (error) {
            console.error("Erro ao buscar entradas:", error)

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadEntries(search, ordering)
    }, [search, ordering])

    const total = entries.reduce(
        (sum, entry) => sum + Number(entry.valorTotal),
        0
    )

    return (
        <View className="w-full h-full">
            <ScrollView>
                <View className="w-full px-10 h-full items-center self-center gap-5 py-10">

                    <Calendar />

                    <Input
                        label="Pesquisar entrada"
                        value={search}
                        onChangeText={setSearch}
                    />

                    <View className="flex-row justify-between w-full gap-2 flex-wrap">

                        <FilterButton
                            label="Mais recentes"
                            selected={ordering === "-data"}
                            background="bg-verde"
                            onPress={() => setOrdering("-data")}
                        />

                        <FilterButton
                            label="Mais antigas"
                            selected={ordering === "data"}
                            background="bg-verde"
                            onPress={() => setOrdering("data")}
                        />

                        <FilterButton
                            label="Maior valor"
                            selected={ordering === "-valorTotal"}
                            background="bg-verde"
                            onPress={() => setOrdering("-valorTotal")}
                        />

                        <FilterButton
                            label="Menor valor"
                            selected={ordering === "valorTotal"}
                            background="bg-verde"
                            onPress={() => setOrdering("valorTotal")}
                        />

                    </View>

                    {loading && (
                        <Text className="text-preto text-2xl font-bold">
                            Carregando entradas...
                        </Text>
                    )}

                    <Text className="text-preto text-xl font-normal self-start">
                        Total de Entradas: R$ {total.toFixed(2)}
                    </Text>

                    <View className="gap-4 w-full">

                        {!loading &&
                            entries.map((entry) => (
                                <Card
                                    key={entry.id}
                                    onPress={() =>
                                        router.push(`/${entry.id}`)
                                    }
                                    className="flex-row justify-between items-center"
                                    backgroundColor="#FFFFF2"
                                    borderColor="cinza-200"
                                >
                                    <View className="gap-1">
                                        <Text className="text-preto text-2xl font-bold">
                                            {entry.descricao}
                                        </Text>

                                        <Text className="text-preto text-xl font-normal">
                                            R$ {Number(entry.valorTotal).toFixed(2)}
                                        </Text>

                                        <Text className="text-gray-500">
                                            {new Date(entry.data).toLocaleDateString("pt-BR")}
                                        </Text>
                                    </View>

                                    <Feather
                                        name="arrow-right"
                                        size={28}
                                        color="#1E1E1E"
                                    />
                                </Card>
                            ))}

                    </View>

                </View>
            </ScrollView>
        </View>
    )
}