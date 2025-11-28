import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Video from "react-native-video";
import React from "react";

type PreviewProps = {
    media: {
        type: "photo" | "video";
        path: string;
    };
    onRetake: () => void;
    onUse: () => void;
};

export default function PreviewScreen({ media, onRetake, onUse }: PreviewProps) {

    return (
        <View style={styles.container}>
            {/* Media preview */}
            {media.type === "photo" ? (
                <Image
                    source={{ uri: media.path }}
                    style={styles.media}
                    resizeMode="contain"
                />
            ) : (
                <Video
                    source={{ uri: media.path }}
                    style={styles.media}
                    resizeMode="contain"
                    repeat
                />
            )}

            {/* Buttons overlay */}
            <View style={styles.buttonsContainer}>

                <TouchableOpacity style={styles.button} onPress={onRetake}>
                    <Text style={styles.buttonText}>Retake</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={onUse}>
                    <Text style={styles.buttonText}>Use</Text>
                </TouchableOpacity>
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
    },

    media: {
        width: "100%",
        height: "100%",
    },

    buttonsContainer: {
        position: "absolute",
        bottom: 50,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
    },

    button: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: 10,
    },

    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
    },
});
