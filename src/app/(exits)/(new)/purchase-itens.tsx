import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { useNewExit } from "@/contexts/NewExitContext"
import { useRouter } from "expo-router"
import { View, ScrollView, Text, Pressable } from "react-native"
import { Feather } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import { getItems, Item } from "@/services/api"

export default function PurchaseItens() {
    const router = useRouter()
    const { exit, setExit } = useNewExit()

    const [items, setItems] = useState<Item[]>([])
    const [loading, setLoading] = useState(true)

    async function loadItems() {
        try {
            setLoading(true)

            const data = await getItems()
            setItems(data)
        } catch (error) {
            console.error("Erro ao buscar itens:", error)
        } finally {
            setLoading(false)
        }
    }

    function getQty(item: Item) {
        const found = exit.items?.find((purchaseItem) => purchaseItem.id === String(item.id))
        return found?.qty || 0
    }

    function changeQty(item: Item, amount: number) {
        setExit((oldExit) => {
            const currentItems = oldExit.items || []
            const existingItem = currentItems.find((purchaseItem) => purchaseItem.id === String(item.id))

            let updatedItems = currentItems

            if (existingItem) {
                const newQty = existingItem.qty + amount

                if (newQty <= 0) {
                    updatedItems = currentItems.filter((purchaseItem) => purchaseItem.id !== String(item.id))
                } else {
                    updatedItems = currentItems.map((purchaseItem) =>
                        purchaseItem.id === String(item.id)
                            ? { ...purchaseItem, qty: newQty }
                            : purchaseItem
                    )
                }
            } else if (amount > 0) {
                updatedItems = [
                    ...currentItems,
                    {
                        id: String(item.id),
                        name: item.nome,
                        value: Number(item.valor),
                        qty: 1,
                    },
                ]
            }

            return {
                ...oldExit,
                items: updatedItems,
            }
        })
    }

    const total = (exit.items || []).reduce((sum, item) => {
        return sum + item.value * item.qty
    }, 0)

    useEffect(() => {
        loadItems()
    }, [])

    return (
        <View className="w-full h-full">
            <ScrollView>
                <View className="w-full px-10 h-full items-center self-center gap-5 py-10">
                    <Text className="self-start text-preto font-normal text-2xl">
                        Selecione os itens
                    </Text>

                    {loading && (
                        <Text className="text-preto text-2xl font-bold">
                            Carregando itens...
                        </Text>
                    )}

                    {!loading && items.length === 0 && (
                        <Text className="text-preto text-xl font-normal">
                            Nenhum item cadastrado.
                        </Text>
                    )}

                    <View className="w-full gap-4">
                        {!loading && items.map((item) => {
                            const qty = getQty(item)

                            return (
                                <Card
                                    key={item.id}
                                    className="flex-row justify-between items-center"
                                    backgroundColor="#FFFFF2"
                                    borderColor="cinza-200"
                                >
                                    <View className="gap-2">
                                        <Text className="text-preto text-2xl font-bold">
                                            {item.nome}
                                        </Text>

                                        <Text className="text-preto text-xl font-normal">
                                            R$ {Number(item.valor).toFixed(2)}
                                        </Text>
                                    </View>

                                    <View className="flex-row items-center gap-2">
                                        <Pressable onPress={() => changeQty(item, -1)}>
                                            <Feather name="minus-circle" size={28} color="#1E1E1E" />
                                        </Pressable>

                                        <Text className="text-preto text-xl font-bold">
                                            {qty}
                                        </Text>

                                        <Pressable onPress={() => changeQty(item, 1)}>
                                            <Feather name="plus-circle" size={28} color="#1E1E1E" />
                                        </Pressable>
                                    </View>
                                </Card>
                            )
                        })}
                    </View>

                    <Button
                        onPress={() => router.push("/(exits)/(new)/newItem")}
                        label="Adicionar Item"
                        color="text-branco-100"
                        background="bg-vermelho-100"
                    />
                </View>
            </ScrollView>

            <View className="w-full bg-preto flex-row items-center justify-between p-12 pb-16 rounded-t-2xl">
                <Text className="text-branco-100 text-4xl font-bold">
                    R$ {total.toFixed(2)}
                </Text>

                <Button
                    className="w-1/2"
                    label="Avançar"
                    color="text-branco-100"
                    background="bg-vermelho-100"
                    onPress={() => router.push("/(exits)/(new)/purchase-payment")}
                />
            </View>
        </View>
    )
}