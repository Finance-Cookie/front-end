import { Input } from "@/components/Input"
import { useNewExit } from "@/contexts/NewExitContext"
import { useRouter } from "expo-router"
import { View, Text, ScrollView, Pressable } from "react-native"
import { Button } from "@/components/Button"
import { Feather } from "@expo/vector-icons"
import { useState } from "react"

export default function NewExit() {
    const router = useRouter()
    const { exit, setExit } = useNewExit()

    const [description, setDescription] = useState(exit.description || "")
    const [value, setValue] = useState(
        exit.value !== undefined ? String(exit.value) : ""
    )

    const isCompra = exit.typeName?.trim().toLowerCase() === "compra" ||
        exit.typeName?.trim().toLowerCase() === "compras"

    function save() {
        const normalizedValue = Number(String(value).replace(",", "."))

        const newExit = {
            ...exit,
            description,
            value: normalizedValue,
        }

        setExit(newExit)

        console.log("Saída:", newExit)

        router.replace("/(exits)/exits")
    }

    return (
        <View className="w-full h-full">
            <ScrollView>
                <View className="w-full px-10 h-full items-center self-center gap-5 py-10">

                    <View className="w-full gap-3">
                        <Text className="self-start text-preto font-normal text-2xl">
                            Tipo
                        </Text>

                        <Pressable
                            onPress={() => router.push("/(exits)/(new)/select-type")}
                            className="w-full h-12 px-4 rounded-lg border border-preto bg-branco-100 flex-row items-center justify-between"
                        >
                            <Text className="text-preto text-xl font-normal">
                                {exit.typeName || "Selecionar Tipo"}
                            </Text>

                            <Feather name="chevron-down" size={24} color="#1E1E1E" />
                        </Pressable>
                    </View>

                    {exit.type && !isCompra && exit.payment ? (
                        <View className="w-full gap-5">
                            <Text className="self-start text-preto font-normal text-2xl">
                                Forma de Pagamento
                            </Text>

                            <Pressable
                                onPress={() =>
                                    router.push({
                                        pathname: "/(exits)/(new)/purchase-payment",
                                        params: {
                                            mode: "select-payment",
                                        },
                                    })
                                }
                                className="w-full h-12 px-4 rounded-lg border border-preto bg-branco-100 flex-row items-center justify-between"
                            >
                                <Text className="text-preto text-xl font-normal">
                                    {exit.payment}
                                </Text>

                                <Feather name="chevron-down" size={24} color="#1E1E1E" />
                            </Pressable>

                            <Input
                                label="Descrição"
                                value={description}
                                onChangeText={setDescription}
                            />

                            <Input
                                label="Valor"
                                value={value}
                                onChangeText={setValue}
                            />

                            <Button
                                label="Salvar"
                                background="bg-vermelho-100"
                                color="text-branco-100"
                                onPress={save}
                            />
                        </View>
                    ) : null}
                </View>
            </ScrollView>
        </View>
    )
}