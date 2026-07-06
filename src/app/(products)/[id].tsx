import { Button } from "@/components/Button"
import { useLocalSearchParams } from "expo-router"
import { useRouter } from "expo-router"
import { View, Text, ScrollView, Modal } from "react-native"
import { useEffect, useState } from "react"
import { getProducts, Product, deleteProduct } from "@/services/api"

export default function ProductDetails(){

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const { id } = useLocalSearchParams()
    const [product, setProduct] = useState<Product | null>(null)

    const router = useRouter()

    useEffect(() => {

        async function loadProduct() {
            try {
                const data = await getProducts()
                const productFound = data.find((item) => String(item.id) === String(id))
                setProduct(productFound ?? null)
            } catch (error) {
                console.error("Erro ao buscar produto:", error)
            }
        }

        if(id){
            loadProduct()
        }

    }, [id])

    if(!product){
        return(
            <View className="w-full h-full items-center justify-center">
                <Text className="text-preto text-2xl font-bold">Carregando produto...</Text>
            </View>
        )
    }

    async function handleDeleteProduct() {
        try {
            await deleteProduct(Number(id))
            router.replace(`/(products)/`)
        } catch (error) {
            console.error("Erro ao deletar produto:", error)
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
                                    background="bg-amarelo"
                                    color="text-branco-100"
                                    onPress={async () => {

                                        await deleteProduct(product.id)

                                        setShowDeleteModal(false)

                                        router.replace("/(products)/products")

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
                        <View className="gap-4">
                            <View className="flex-row gap-2 justify-between items-center">
                                <Text className="self-start text-preto font-bold text-2xl">{product.nome}</Text>
                                <Text className="self-start text-preto font-bold text-2xl">#{product.id}</Text>
                            </View>
                            <Text className="text-preto text-2xl font-normal">{product.descricao}</Text>
                            <View className="flex-row gap-2 items-center border-t-2 border-cinza-200 pt-2">
                                <Text className="self-start text-preto font-normal text-2xl">Valor</Text>
                            <Text className="text-preto text-2xl font-bold">R$ {Number(product.valor).toFixed(2)}</Text>
                            </View>
                        </View>
                    </View>
                    <View className="w-full gap-4">
                            <Button onPress={() => router.push(`/edit/${product.id}`)} label="Editar" color="text-branco-100" background="bg-amarelo"/>
                            <Button onPress={() => setShowDeleteModal(true)} className="border-2 border-vermelho-100 rounded-lg" label="Excluir" color="text-vermelho-100" background="bg-transparent"/>
                        </View>
                </View>
            </ScrollView>
        </View>
    )
}