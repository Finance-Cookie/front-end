import { Input, InputSelect } from "@/components/Input"
import { useNewEntry } from "@/contexts/NewEntryContext"
import { useRouter } from "expo-router"
import { View, Text, ScrollView, Pressable } from "react-native"
import { Button, FilterButton } from "@/components/Button"
import { Feather } from "@expo/vector-icons"

export default function NewEntry(){
    const router = useRouter()
    const { entry, setEntry } = useNewEntry()

    return (
        <View className="w-full h-full">
            <ScrollView>
                <View className="w-full px-10 h-full items-center self-center gap-5 py-10">
                    <View className="w-full gap-3">
                        <Text className="self-start text-preto font-normal text-2xl">
                            Tipo
                        </Text>

                        <Pressable
                            onPress={() => router.push("/(entries)/(new)/select-type")}
                            className="w-full h-12 px-4 rounded-lg border border-preto bg-branco-100 flex-row items-center justify-between"
                        >
                            <Text className="text-preto text-xl font-normal">
                                {entry.typeName || "Selecionar Tipo"}
                            </Text>

                            <Feather name="chevron-down" size={24} color="#1E1E1E" />
                        </Pressable>

                        {!entry.type && (
                            <Button
                                label="Adicionar novo tipo"
                                background="bg-transparent"
                                color="text-verde"
                                className="border-2 border-verde rounded-lg"
                                onPress={() => router.push("/(types)/(new)")}
                            />
                        )}
                    </View>

                    {entry.type && entry.typeName?.toLowerCase() !== "venda" ? (
                            <View className="w-full gap-5">
                                <Input label="Descrição"/>
                                <Text className="self-start text-preto font-normal text-2xl">Forma de Pagamento</Text>
                                <View className="flex-row gap-2 flex-wrap self-start">
                                    <FilterButton label="Pix"/>
                                    <FilterButton label="Espécie"/>
                                    <FilterButton label="Cartão"/>
                                </View>
                                <Input label="Valor"/>
                                <Button label="Salvar" background="bg-verde" color="text-branco-100" onPress={() => router.replace("/entries")}/>
                            </View>
                        ) : null}
                </View>
            </ScrollView>
        </View>
    )
}