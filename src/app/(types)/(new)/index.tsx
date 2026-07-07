import { useState } from "react"
import { View, Text, ScrollView } from "react-native"
import { useRouter } from "expo-router"
import { Input } from "@/components/Input"
import { Button } from "@/components/Button"
import { createTipoPagamento } from "@/services/api"

export default function NewType() {
    const router = useRouter()
    const [nome, setNome] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleCreateType() {
        try {
            setLoading(true)

            await createTipoPagamento({
                nome,
            })

            router.replace("/(types)/types")
        } catch (error: any) {
            console.log("Erro ao criar tipo:", error?.response?.data || error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <View className="w-full h-full">
            <ScrollView>
                <View className="w-full px-10 h-full items-center self-center gap-5 py-10">
                    <Text className="text-preto text-2xl font-bold self-start">
                        Novo Tipo
                    </Text>

                    <Input
                        label="Nome do tipo"
                        value={nome}
                        onChangeText={setNome}
                    />

                    <Button
                        label={loading ? "Salvando..." : "Salvar"}
                        background="bg-verde"
                        color="text-branco-100"
                        onPress={handleCreateType}
                    />
                </View>
            </ScrollView>
        </View>
    )
}