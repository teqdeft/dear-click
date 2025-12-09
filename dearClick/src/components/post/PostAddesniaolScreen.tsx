import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { createPost } from "../../screens/post/services/services";
import toast from "../utils/Toast";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Music from "../../assets/svgs/interest/Music";
import Fashion from "../../assets/svgs/interest/Fashion";
import Game from "../../assets/svgs/interest/Games";
import Pet from "../../assets/svgs/interest/Pet";
import Travel from "../../assets/svgs/interest/Travel";
import Technology from "../../assets/svgs/interest/Technology";
import Beauty from "../../assets/svgs/interest/Beauty";
import Food from "../../assets/svgs/interest/Food";
import Comedy from "../../assets/svgs/interest/Comedy";
import Skincare from "../../assets/svgs/interest/Skincare";
import Wellness from "../../assets/svgs/interest/Wellness";
import Bag from "../../assets/svgs/interest/Bag";
import Accessories from "../../assets/svgs/interest/Accessories";
import Sports from "../../assets/svgs/interest/Sports";

export default function PostAddesniaolScreen() {
    const route = useRoute();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const { file }: any = route.params;
    const [caption, setCaption] = useState("");
    const [loading, setLoading] = useState(false);
    const [category, setcCategory] = useState<string>("");


    const toggleSelect = (interest: string) => {
        setcCategory(prev => prev === interest ? "" : interest);
    };

    const interests = [
        { name: 'Music', icon: <Music /> },
        { name: 'Fashion', icon: <Fashion /> },
        { name: 'Games', icon: <Game /> },
        { name: 'Pet', icon: <Pet /> },
        { name: 'Travelling', icon: <Travel /> },
        { name: 'Technology', icon: <Technology /> },
        { name: 'Beauty', icon: <Beauty /> },
        { name: 'Food', icon: <Food /> },
        { name: 'Comedy', icon: <Comedy /> },
        { name: 'Skincare', icon: <Skincare /> },
        { name: 'Wellness', icon: <Wellness /> },
        { name: 'Bag', icon: <Bag /> },
        { name: 'Accessories', icon: <Accessories /> },
        { name: 'Sports', icon: <Sports /> },
    ];

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const uploadData = {
                ...file,     // real file
                caption: caption,
                category: category
            };

            const res = await createPost(uploadData);

            if (!res?.success) {
                toast.error(res?.error?.message || "Upload failed");
                return;
            }

            toast.success(res?.message);
            navigation.navigate('AppTabs', { screen: 'Home' });
        } catch (e) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };



    return (
        <View style={styles.container}>
            <Image source={{ uri: file.path }} style={styles.previewImg} />

            <TextInput
                placeholder="Write a caption..."
                placeholderTextColor="#aaa"
                value={caption}
                onChangeText={setCaption}
                style={styles.captionInput}
                multiline
            />

            <TouchableOpacity style={styles.postBtn} onPress={handleSubmit}>
                <Text style={styles.postBtnText}>
                    {loading ? "Posting..." : "Post"}
                </Text>
            </TouchableOpacity>

            <View style={styles.header}>
                <Text style={styles.title}>select post categary</Text>
            </View>

            <View style={styles.optionsContainer}>
                {interests.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.input,
                            category === item.name && styles.selectedInput,
                        ]}
                        onPress={() => toggleSelect(item.name)}
                    >
                        <View style={styles.optionContent}>
                            {item.icon}
                            <Text
                                style={[
                                    styles.optionText,
                                    category === item.name && styles.selectedText,
                                ]}
                            >
                                {item.name}
                            </Text>
                        </View>
                    </TouchableOpacity>

                ))}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        padding: 20,
    },
    previewImg: {
        width: "100%",
        height: 350,
        borderRadius: 10,
        marginBottom: 20,
    },
    captionInput: {
        width: "100%",
        minHeight: 100,
        color: "white",
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#666",
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
    },
    postBtn: {
        backgroundColor: "#1e90ff",
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    postBtnText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },

    header: {
        marginBottom: 30,
    },
    title: {
        fontSize: 26,
        fontWeight: '500',
        color: '#fff',
        marginBottom: 6,
    },
    optionsContainer: {
        marginBottom: 20,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    optionContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 3,
        gap: 4,
        justifyContent: 'center',
    },
    optionText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '400',
    },
    input: {
        backgroundColor: '#262626',
        paddingVertical: 8,
        paddingHorizontal: 0,
        fontSize: 10,
        fontWeight: '500',
        color: '#fff',
        width: 'auto',
        borderRadius: 30,
    },
    selectedInput: {
        backgroundColor: 'white',
    },
    selectedText: {
        color: '#000',
        fontWeight: '600',
    },
});
