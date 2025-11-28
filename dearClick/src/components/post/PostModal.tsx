import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useRef } from "react";
import { Modal, View, TouchableOpacity, Animated, Dimensions, Text, StyleSheet } from "react-native";

const { height } = Dimensions.get("window");

type BottomModalProps = {
    visible: boolean;
    onClose: () => void;
};

export default function BottomModal({ visible, onClose }: BottomModalProps) {
    const slideAnim = useRef(new Animated.Value(height)).current;
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    useEffect(() => {
        if (visible) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: height,
                duration: 250,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    const closeModal = () => {
        Animated.timing(slideAnim, {
            toValue: height,
            duration: 250,
            useNativeDriver: true,
        }).start(() => {
            onClose();
        });
    };

    return (
        <Modal transparent visible={visible} animationType="none" onRequestClose={closeModal} >
            <TouchableOpacity style={styles.overlay} activeOpacity={1} onPressOut={closeModal} >
                <Animated.View style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] },]}>

                    <View style={styles.addStoryGroup}>
                        <TouchableOpacity style={styles.addStoryButton} onPress={() => navigation.navigate('PostSourceSelector', { type: "Story" })}>
                            <View style={styles.typeIcon}></View>
                            <View style={styles.typeTextDetail}>
                                <Text style={styles.typeTitle}  >Story</Text>
                                <Text style={styles.typeSubText}>Share content only for 24 hours</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.addStoryButton} onPress={() => navigation.navigate('PostSourceSelector', { type: "Post" })}>
                            <View style={styles.typeIcon}></View>
                            <View style={styles.typeTextDetail}>
                                <Text style={styles.typeTitle}>Post</Text>
                                <Text style={styles.typeSubText}>Upload photo & video</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </Animated.View >
            </TouchableOpacity >
        </Modal >
    );
}



const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "flex-end",
    },
    modalContainer: {
        height: "auto",
        backgroundColor: "#1F1F1F",
        borderRadius: 15,
        paddingVertical: 30,
        paddingHorizontal: 16,
        marginBottom: 100
    },

    addStoryGroup: { gap: 10 },
    addStoryButton: {
        paddingHorizontal: 15,
        paddingVertical: 18,
        flexDirection: "row",
        gap: 10,
        backgroundColor: "#2B2B2B",
        borderRadius: 15
    },
    typeIcon: { height: 24, width: 24 },
    typeTextDetail: {},
    typeTitle: { fontSize: 16, color: "#fff" },
    typeSubText: { fontSize: 12, color: "#999999" }
});
