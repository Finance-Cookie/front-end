import { useState } from "react"
import { View, Text, ScrollView } from "react-native"
import { useRouter } from "expo-router"
import { Input } from "@/components/Input"
import { Button } from "@/components/Button"
import { createItem } from "@/services/api"

export default function NewItem() {
    const router = useRouter()

    const [nome, setNome] = useState("")
    const [valor, setValor] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleCreateItem() {
        try {
            setLoading(true)

            await createItem({
                nome,
                valor,
            })

            router.replace("/(items)/items")
        } catch (error: any) {
            console.log("Erro ao criar item:", error?.response?.data || error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <View className="w-full h-full">
            <ScrollView>
                <View className="w-full px-10 h-full items-center self-center gap-5 py-10">
                    <Text className="text-preto text-2xl font-bold self-start">
                        Novo Item
                    </Text>

                    <Input
                        label="Nome"
                        value={nome}
                        onChangeText={setNome}
                    />

                    <Input
                        label="Valor"
                        value={valor}
                        onChangeText={setValor}
                    />

                    <Button
                        label={loading ? "Salvando..." : "Salvar"}
                        background="bg-vermelho-100"
                        color="text-branco-100"
                        onPress={handleCreateItem}
                    />
                </View>
            </ScrollView>
        </View>
    )
}