import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { View, ScrollView } from "react-native"
import { useRouter } from "expo-router"
import { useState } from "react"
import { Alert } from "react-native"

import { registerUser } from "@/services/api"

export default function Register(){
    const router = useRouter()

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    async function handleNext() {
        try {
            await registerUser({ nome, email, senha })
            router.push("/money")
        } catch (e: any) {
            Alert.alert("Erro", e?.response?.data?.detail || "Informações incorretas, tente novamente!" )
        }
    }

    return (
        <ScrollView>
            <View className="w-full px-10 h-full items-center self-center gap-5 pt-16">
                <Input label="Nome" value={nome} onChangeText={setNome}/>
                <Input label="Email" value={email} onChangeText={setEmail}/>
                <Input label="Senha" value={senha} onChangeText={setSenha}/>
                <Button onPress={handleNext} label="Avançar" color="text-branco-100"/>
            </View>
        </ScrollView>
    )
}