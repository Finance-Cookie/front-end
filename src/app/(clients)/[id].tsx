import { Button } from "@/components/Button"
import { useLocalSearchParams } from "expo-router"
import { useRouter } from "expo-router"
import { View, Text, ScrollView, Modal } from "react-native"
import { useEffect, useState } from "react"
import { getClients, Client, deleteClient } from "@/services/api"

export default function ClientDetails(){

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const { id } = useLocalSearchParams()
    const [client, setClient] = useState<Client | null>(null)

    const router = useRouter()

    useEffect(() => {

        async function loadClient() {
            try {
                const data = await getClients()
                const clientFound = data.find((item) => String(item.id) === String(id))
                setClient(clientFound ?? null)
            } catch (error) {
                console.error("Erro ao buscar cliente:", error)
            }
        }

        if(id){
            loadClient()
        }

    }, [id])

    if(!client){
        return(
            <View className="w-full h-full items-center justify-center">
                <Text className="text-preto text-2xl font-bold">Carregando cliente...</Text>
            </View>
        )
    }

    async function handleDeleteClient() {
        try {
            await deleteClient(Number(id))
            router.replace(`/(clients)/`)
        } catch (error) {
            console.error("Erro ao deletar cliente:", error)
        }
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
                                    onPress={async () => {

                                        await deleteClient(client.id)

                                        setShowDeleteModal(false)

                                        router.replace("/(clients)/clients")

                                    }}
                                />
                                <Button
                                    label="Cancelar"
                                    background="transparent"
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
                            <Text className="self-start text-preto font-bold text-2xl">Nome: {client.nome}</Text>
                            <Text className="self-start text-preto font-bold text-2xl">#{client.id}</Text>
                        </View>
                        <Text className="self-start text-preto font-normal text-2xl">Telefone:</Text>
                        <Text className="self-start text-preto font-bold text-2xl">{client.telefone}</Text>
                        <Text className="self-start text-preto font-normal text-2xl">Email:</Text>
                        <Text className="self-start text-preto font-bold text-2xl">{client.email}</Text>
                        <Text className="self-start text-preto font-normal text-2xl">Endereço: </Text>
                        <Text className="self-start text-preto font-bold text-2xl">{client.logradouro}, {client.numero}, {client.bairro}</Text>
                    </View>
                    <View className="w-full gap-4">
                        <Button onPress={() => router.push(`/edit/${client.id}`)} label="Editar" color="text-branco-100" background="bg-vermelho-200"/>
                        <Button onPress={() => setShowDeleteModal(true)} className="border-2 border-vermelho-100 rounded-lg" label="Excluir" color="text-vermelho-100" background="bg-transparent"/>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}