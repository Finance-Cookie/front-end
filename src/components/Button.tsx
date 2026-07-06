import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

type ButtonProps = TouchableOpacityProps & {
    label?: string;
    children?: React.ReactNode;
    background?: string;
    color?: string;
    onPress?: () => void;
    selected?: boolean;
    className?: string;
};

export function Button({ label, children, background, color, onPress, className, ...rest }: ButtonProps) {
    return (
        <View className={`w-full ${className}`}>
            <TouchableOpacity onPress={onPress} {...rest} className={`rounded-lg p-3 w-full items-center justify-center ${background ? background : 'bg-azul'}`}>
                <Text className={`font-bold text-xl ${color}`}>{label}</Text>
            </TouchableOpacity>
        </View>
    )
}

export function FilterButton({ label, children, background, color, onPress, selected, ...rest }: ButtonProps) {
    return (
        <View>
            <TouchableOpacity onPress={onPress} className={`${selected ? (background || "bg-cinza-100") : 'bg-branco-100'} px-4 py-2 rounded-full border border-cinza-200 justify-center items-center`}>
                <Text className={`font-normal text-xl ${color}`}>{label}</Text>
            </TouchableOpacity>
        </View>
    )
}