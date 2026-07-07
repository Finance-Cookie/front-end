import { useEffect, useState } from "react"
import { View, Text, ScrollView, Modal } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { Input } from "@/components/Input"
import { Button } from "@/components/Button"
import {
    getItem,
    updateItem,
    deleteItem,
    Item,
} from "@/services/api"

export default function ItemDetails() {
    const router = useRouter()
    const { id } = useLocalSearchParams()

    const [item, setItem] = useState<Item | null>(null)
    const [nome, setNome] = useState("")
    const [valor, setValor] = useState("")
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    async function loadItem() {
        try {
            setLoading(true)

            const data = await getItem(Number(id))

            setItem(data)
            setNome(data.nome)
            setValor(String(data.valor))
        } catch (error) {
            console.error("Erro ao buscar item:", error)
        } finally {
            setLoading(false)
        }
    }

    async function handleUpdateItem() {
        try {
            setSaving(true)

            await updateItem(Number(id), {
                nome,
                valor,
            })

            router.replace("/(items)/items")
        } catch (error: any) {
            console.log("Erro ao editar item:", error?.response?.data || error.message)
        } finally {
            setSaving(false)
        }
    }

    async function handleDeleteItem() {
        try {
            await deleteItem(Number(id))

            setShowDeleteModal(false)
            router.replace("/(items)/items")
        } catch (error: any) {
            console.log("Erro ao excluir item:", error?.response?.data || error.message)
        }
    }

    useEffect(() => {
        if (id) {
            loadItem()
        }
    }, [id])

    if (loading || !item) {
        return (
            <View className="w-full h-full items-center justify-center">
                <Text className="text-preto text-2xl font-bold">
                    Carregando item...
                </Text>
            </View>
        )
    }

    return (
        <View className="w-full h-full">
            <ScrollView>
                <Modal visible={showDeleteModal} transparent={true} animationType="fade">
                    <View className="flex-1 justify-center items-center bg-black/50">
                        <View className="w-96 bg-branco-100 rounded-xl p-6 gap-5">
                            <Text className="text-2xl font-bold text-center">
                                Deseja realmente excluir?
                            </Text>

                            <Text className="text-lg text-center">
                                Após confirmar, essa ação não poderá ser desfeita.
                            </Text>

                            <View className="gap-2">
                                <Button
                                    label="Sim"
                                    background="bg-vermelho-100"
                                    color="text-branco-100"
                                    onPress={handleDeleteItem}
                                />

                                <Button
                                    label="Cancelar"
                                    background="bg-transparent"
                                    color="text-vermelho-100"
                                    onPress={() => setShowDeleteModal(false)}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>

                <View className="w-full px-10 h-full items-center self-center gap-5 py-10">
                    <View className="bg-branco-100 w-full rounded-xl pt-8 p-5 gap-4 border border-cinza-200">
                        <View className="flex-row gap-2 justify-between items-center">
                            <Text className="self-start text-preto font-bold text-2xl">
                                Item
                            </Text>

                            <Text className="self-start text-preto font-bold text-2xl">
                                #{item.id}
                            </Text>
                        </View>

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
                    </View>

                    <View className="w-full gap-4">
                        <Button
                            label={saving ? "Salvando..." : "Editar"}
                            color="text-branco-100"
                            background="bg-vermelho-100"
                            onPress={handleUpdateItem}
                        />

                        <Button
                            onPress={() => setShowDeleteModal(true)}
                            className="border-2 border-vermelho-100 rounded-lg"
                            label="Excluir"
                            color="text-vermelho-100"
                            background="bg-transparent"
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}