import { useNewProduct } from '@/contexts/NewProductContext'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { View, ScrollView } from 'react-native'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { createProduct } from '@/services/api'

export default function Product() {
    const router = useRouter()
    const { product, setProduct } = useNewProduct()
    const [nome, setNome] = useState(product.nome || '')
    const [valor, setValor] = useState(String(product.valor || ''))
    const [descricao, setDescricao] = useState(product.descricao || '')

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
                        label='Avançar'
                        onPress={async () => {
                            console.log("botao clicado")
                            try {
                                const response = await createProduct({
                                    nome,
                                    valor: Number(valor),
                                    descricao
                                })

                                console.log("resposta api: ", response)

                                setProduct(response)
                                router.replace('/(products)/products')
                            } catch (error: any) {
                                console.log('Erro: ', error?.response?.data || error.message)
                            }
                    }}/>
                </View>
            </ScrollView>
        </View>
    )
}