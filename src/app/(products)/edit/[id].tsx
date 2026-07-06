import { useLocalSearchParams, useRouter } from 'expo-router'
import { View, ScrollView, Text } from 'react-native'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { getProducts, updateProduct, Product } from '@/services/api'
import { useEffect, useState } from 'react'

export default function EditProduct() {
    
    const { id } = useLocalSearchParams()
    const router = useRouter()

    const [nome, setNome] = useState('')
    const [valor, setValor] = useState('')
    const [descricao, setDescricao] = useState('')

    useEffect(() => {

        async function loadProduct() {
            const products = await getProducts()
            const product = products.find((item) => item.id === Number(id))

            if (!product) {
                return
            }

            setNome(product.nome)
            setValor(String(product.valor))
            setDescricao(product.descricao)
        }

        if(id){
            loadProduct()
        }
    }, [id])

    async function handleUpdate(){

        try {

            await updateProduct(Number(id), {
                nome,
                valor: Number(valor),
                descricao
            })

            router.replace(`/(products)/${id}`)
        } catch(error) {
            console.log("Erro ao editar:", error)
        }
    }

    return (
        <View className="w-full h-full">
            <ScrollView>
                <View className="w-full px-10 h-full items-center self-center gap-5 py-10">
                    <Input label="Nome do Produto" value={nome} onChangeText={setNome}/>
                    <Input label='Valor' value={valor} onChangeText={setValor}/>
                    <Input label='Descrição' value={descricao} onChangeText={setDescricao}/>
                    <Button 
                        background='bg-amarelo'
                        color='text-branco-100'
                        label='Salvar'
                        onPress={handleUpdate}
                    />
                </View>
            </ScrollView>
        </View>
    )
}