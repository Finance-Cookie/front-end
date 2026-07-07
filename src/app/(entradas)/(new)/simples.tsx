import { Input } from "@/components/Input"
import { useNewEntry } from "@/contexts/NewEntryContext"
import { useRouter } from "expo-router"
import { View, Text, ScrollView, Pressable, Modal } from "react-native"
import { Button, FilterButton } from "@/components/Button"
import { Feather } from "@expo/vector-icons"
import { useFocusEffect } from "@react-navigation/native"
import { useCallback, useState } from "react"
import { getPaymentMethods, getTiposPagamento, createEntry } from "@/services/api"
import { Alert } from "react-native"

export default function NewEntry(){
    const router = useRouter()
    const { entry, setEntry } = useNewEntry()
    const [payments, setPayments] = useState<any[]>([])
    const [showTypes, setShowTypes] = useState(false)
    const [types, setTypes] = useState<any[]>([])
    const [selectedPayment, setSelectedPayment] = useState<number | null>(null)
    const [description, setDescription] = useState("")
    const [value, setValue] = useState("")
    const [loading, setLoading] = useState(false)

    useFocusEffect(
        useCallback(() => {
            async function loadData() {
                try {
                    const [paymentsResponse, typesResponse] = await Promise.all([
                        getPaymentMethods(),
                        getTiposPagamento(),
                    ])

                    setPayments(paymentsResponse)
                    setTypes(typesResponse)
                } catch (error) {
                    console.error("Error ao carregar tipos de pagamento:", error)
                }
            }

            loadData()
        }, [])
    )

    async function handleSave() {
        if (!entry.type) {
            Alert.alert("Erro", "Selecione um tipo.")
            return
        }

        if (!selectedPayment) {
            Alert.alert("Erro", "Selecione uma forma de pagamento.")
            return
        }

        if (!description.trim()) {
            Alert.alert("Erro", "Informe uma descrição.")
            return
        }

        if (!value.trim()) {
            Alert.alert("Erro", "Informe um valor.")
            return
        }

        try {
            setLoading(true)

            await createEntry({
                descricao: description,
                valorTotal: Number(
                    value.replace(",", ".")
                ),
                formapagamento: selectedPayment,
                tipocategoria: entry.type,
            })

            Alert.alert("Sucesso", "Entrada criada.")

            setEntry({
                type: undefined,
                typeName: "",
            })

            router.replace("/entradas")
        } catch (error) {
            console.error(error)
            Alert.alert("Erro", "Não foi possível criar a entrada.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <View className="w-full h-full">
            <ScrollView>
                <Modal
                    visible={showTypes}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setShowTypes(false)}>
                    <Pressable
                        className="flex-1 justify-center items-center bg-black/50"
                        onPress={() => setShowTypes(false)}
                    >
                        <View className="bg-white w-80 rounded-xl p-5 gap-3">

                            <Text className="text-2xl font-bold">
                                Escolha um tipo
                            </Text>
                            <Button
                                label="+ Adicionar tipo"
                                background="bg-transparent"
                                color="text-verde"
                                className="border-2 border-verde rounded-lg"
                                onPress={() => {
                                    setShowTypes(false)
                                    router.push("/(types)/(new)?from=entry")
                                }}
                            />

                            {types.map((type) => (
                                <Pressable
                                    key={type.id}
                                    className="py-3 border-b border-gray-200"
                                    onPress={() => {
                                        setEntry({
                                            ...entry,
                                            type: type.id,
                                            typeName: type.nome,
                                        })

                                        setShowTypes(false)
                                    }}
                                >
                                    <Text className="text-xl">
                                        {type.nome}
                                    </Text>
                                </Pressable>
                            ))}

                        </View>
                    </Pressable>
                </Modal>
                <View className="w-full px-10 h-full items-center self-center gap-5 py-10">
                    <View className="w-full gap-3">
                        <Text className="self-start text-preto font-normal text-2xl">
                            Tipo
                        </Text>

                        <Pressable
                            onPress={() => setShowTypes(true)}
                            className="w-full h-12 px-4 rounded-lg border border-preto bg-branco-100 flex-row items-center justify-between"
                        >
                            <Text className="text-preto text-xl font-normal">
                                {entry.typeName || "Selecionar Tipo"}
                            </Text>

                            <Feather name="chevron-down" size={24} color="#1E1E1E" />
                        </Pressable>

                        
                    </View>

                    <View className="w-full gap-5">
                        <Input
                            label="Descrição"
                            value={description}
                            onChangeText={setDescription}
                        />
                        <Text className="self-start text-preto font-normal text-2xl">Forma de Pagamento</Text>
                        <View className="flex-row gap-2 flex-wrap self-start">
                            {payments.map((payment: any) => (
                                <FilterButton
                                    key={payment.id}
                                    label={payment.nome}
                                    onPress={() => {
                                        setSelectedPayment(payment.id)

                                        setEntry({
                                            ...entry,
                                            payment: payment.id,
                                        })
                                    }}
                                    background={selectedPayment === payment.id ? "bg-verde" : "bg-branco-100"}
                                    color={selectedPayment === payment.id ? "text-branco-100" : "text-preto"} 
                                />
                            ))}
                            <FilterButton onPress={() => router.push("/formaPagamentos")} label="+"/>
                        </View>
                        <Input
                            label="Valor"
                            keyboardType="numeric"
                            value={value}
                            onChangeText={setValue}
                        />
                        <Button
                            label={loading ? "Salvando..." : "Salvar"}
                            background="bg-verde"
                            color="text-branco-100"
                            onPress={handleSave}
                        />                    </View>
                </View>
            </ScrollView>
        </View>
    )
}