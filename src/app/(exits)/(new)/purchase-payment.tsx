import { Button, FilterButton } from "@/components/Button"
import { Input } from "@/components/Input"
import { useNewExit } from "@/contexts/NewExitContext"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useState } from "react"
import { View, ScrollView, Text } from "react-native"

export default function PurchasePayment() {
    const { exit, setExit } = useNewExit()
    const router = useRouter()
    const { mode } = useLocalSearchParams()

    const isSelectPaymentMode = mode === "select-payment"

    const [freight, setFreight] = useState(
        exit.freight !== undefined ? String(exit.freight) : ""
    )

    const [discount, setDiscount] = useState(
        exit.discount !== undefined ? String(exit.discount) : ""
    )

    function normalizeMoney(value: string) {
        if (!value) return 0
        return Number(value.replace(",", "."))
    }

    function selectPayment(payment: string) {
        setExit((exit) => ({
            ...exit,
            payment,
        }))

        if (isSelectPaymentMode) {
            router.replace("/(exits)/(new)")
        }
    }

    function save() {
        const newExit = {
            ...exit,
            freight: normalizeMoney(freight),
            discount: normalizeMoney(discount),
        }

        setExit(newExit)

        console.log("Saída:", newExit)

        router.replace("/(exits)/exits")
    }

    if (isSelectPaymentMode) {
        return (
            <View className="w-full h-full">
                <ScrollView>
                    <View className="w-full px-10 h-full items-center self-center gap-5 py-10">
                        <Text className="self-start text-preto font-normal text-2xl">
                            Forma de Pagamento
                        </Text>

                        <View className="flex-row gap-2 flex-wrap self-start">
                            <FilterButton
                                label="Pix"
                                selected={exit.payment === "Pix"}
                                onPress={() => selectPayment("Pix")}
                            />

                            <FilterButton
                                label="Espécie"
                                selected={exit.payment === "Espécie"}
                                onPress={() => selectPayment("Espécie")}
                            />

                            <FilterButton
                                label="Cartão"
                                selected={exit.payment === "Cartão"}
                                onPress={() => selectPayment("Cartão")}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }

    return (
        <View className="w-full h-full">
            <ScrollView>
                <View className="w-full px-10 h-full items-center self-center gap-5 py-10">
                    <Input
                        label="Frete"
                        value={freight}
                        onChangeText={setFreight}
                    />

                    <Input
                        label="Desconto"
                        value={discount}
                        onChangeText={setDiscount}
                    />

                    <Text className="self-start text-preto font-normal text-2xl">
                        Forma de Pagamento
                    </Text>

                    <View className="flex-row gap-2 flex-wrap self-start">
                        <FilterButton
                            label="Pix"
                            selected={exit.payment === "Pix"}
                            onPress={() => selectPayment("Pix")}
                        />

                        <FilterButton
                            label="Espécie"
                            selected={exit.payment === "Espécie"}
                            onPress={() => selectPayment("Espécie")}
                        />

                        <FilterButton
                            label="Cartão"
                            selected={exit.payment === "Cartão"}
                            onPress={() => selectPayment("Cartão")}
                        />
                    </View>

                    <View className="flex-row self-start items-center justify-start w-full border-t border-cinza-200 pt-2">
                        <Text className="self-start text-preto font-normal text-2xl">
                            Total:{" "}
                        </Text>

                        <Text className="self-start text-preto font-bold text-2xl">
                            R$ 00,00
                        </Text>
                    </View>

                    <Button
                        color="text-branco-100"
                        background="bg-vermelho-100"
                        label="Salvar"
                        onPress={save}
                    />
                </View>
            </ScrollView>
        </View>
    )
}