import { Pressable, StyleSheet, Text, Image } from "react-native";

export default function IconButton({ icon, label, onPress }) {
    const link = icon === "reset" ? require("../assets/images/reset.png") : 
        require("../assets/images/save.png");
    return (
        <Pressable style={StyleSheet.iconButton} onPress={onPress}>
            <Image source={link} style={styles.buttonIcon} />
            <Text style={styles.iconButtonLabel}>{label}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    iconButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconButtonLabel: {
        color: '#fff',
        marginTop: 12,
    },
    buttonIcon: {
        width: 24,
        height: 24,
        tintColor: '#fff',
    },
})