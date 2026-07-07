import { View, Text, ScrollView } from "react-native"
import { FilterButton } from "@/components/Button"
import { Card } from "@/components/Card"
import { Feather } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { Input } from "@/components/Input"
import { useEffect, useState } from "react"
import { getClients, Client } from "@/services/api"

export default function ClientsList(){
    const router = useRouter()
    const [clients, setClients] = useState<Client[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const [search, setSearch] = useState("")
    const [ordering, setOrdering] = useState("")

    async function loadClients(searchText = "", ordering = "") {
        try {
            setLoading(true)
            const data = await getClients(searchText, ordering)
            setClients(data)
        } catch (error) {
            console.error("Erro ao buscar clientes:", error)

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadClients(search, ordering)
    }, [search, ordering])

    return (
        <View className="w-full h-full">
            <ScrollView>
                <View className="w-full px-10 h-full items-center self-center gap-5 py-10">
                    <Input
                        label="Pesquisar cliente"
                        value={search}
                        onChangeText={setSearch}
                    />
                    <View className="flex-row justify-between w-full gap-2">

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
                            label="Bairro"
                            selected={ordering === "bairro"}
                            background="bg-vermelho-100"
                            onPress={() => setOrdering("bairro")}
                        />

                    </View>
                    <View className="gap-4 w-full">
                        {loading && (
                            <Text className="text-preto text-2xl font-bold">
                                Carregando clientes...
                            </Text>
                        )}

                        <Text className="text-preto text-xl font-normal self-start">Total de Clientes: {clients.length}</Text>
                        {!loading && clients.map((client) => (
                            <Card onPress={() => router.push(`/${client.id}`)} className="flex-row justify-between items-center" backgroundColor="#FFFFF2" borderColor="cinza-200">
                                <View className="gap-1">
                                    <Text className="text-preto text-2xl font-bold">{client.nome}</Text>
                                    <Text className="text-preto text-xl font-normal">{client.telefone}</Text>
                                </View>
                                <Feather name="arrow-right" size={28} color="#1E1E1E"/>
                            </Card>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}