import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { View, ScrollView } from "react-native"
import { Alert } from "react-native"

import { useRouter } from "expo-router"
import { useState } from "react"


import { updateMe } from "@/services/api"

export default function Money(){
    const router = useRouter()

    const [saldoFisico, setSaldoFisico] = useState("")
    const [saldoOnline, setSaldoOnline] = useState("")

    async function handleRegister() {
        try {
            await updateMe({ saldo_fisico: saldoFisico, saldo_online: saldoOnline })
            router.replace("/(home)")
        } catch (e: any) {
            Alert.alert("Erro", e?.response?.data?.detail || "Informações incorretas, tente novamente!")
        }
    }

    return (
        <ScrollView>
            <View className="w-full px-10 h-full items-center self-center gap-5 pt-16">
                <Input label="Saldo Físico" keyboardType="numeric" value={saldoFisico} onChangeText={setSaldoFisico}/>
                <Input label="Saldo Online" keyboardType="numeric" value={saldoOnline} onChangeText={setSaldoOnline}/>
                <Button onPress={handleRegister} label="Cadastrar" color="text-branco-100"/>
            </View>
        </ScrollView>
    )
}