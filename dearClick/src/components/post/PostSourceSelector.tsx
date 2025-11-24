import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import PreviewScreen from "../uploadProfilePicture/PreviewScreen";
import { createPost } from "../../screens/post/services/services";
import toast from "../utils/Toast";
import { createStory } from "../../screens/stories/services";
const { height, width } = Dimensions.get('window');

export default function PostSourceSelector() {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [photo, setPhoto] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<{
        type: "photo" | "video";
        path: string;
    } | null>(null);

    const route = useRoute<RouteProp<{ params: { type: string } }, 'params'>>();
    const { type } = route.params;

    const openGallery = async () => {
        const result = await launchImageLibrary({
            mediaType: 'mixed',
            quality: 1,
            selectionLimit: 10
        });

        if (result.assets && result.assets.length > 0) {
            const asset = result.assets[0];

            const fileType = asset.type;
            let mediaType: "photo" | "video" = fileType?.startsWith("image") ? "photo" : "video";

            setPhoto(asset);

            setPreview({ type: mediaType, path: asset.uri!, });
        }
    };

    const handleAddStoryOrPost = async () => {
        try {
            setLoading(true);

            let data;

            if (type == "Post") {
                data = await createPost(photo);
            }

            if (type == "Story") {
                data = await createStory(photo);
            }

            if (!data?.success) {
                toast.error(data?.error?.message || "Failed to submit");
                return;
            }

            toast.success(data.message);
            navigation.navigate('AppTabs', { screen: 'Home' });

        } catch (err) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }

    };

    if (preview) {
        return (
            <PreviewScreen
                media={preview}
                onRetake={() => setPreview(null)}
                onUse={() => handleAddStoryOrPost()}
            />
        );
    }

    if (loading) {
        return (
            <>
                <View>
                    <Text>loading.............</Text>
                </View>
            </>

        )
    }

    return (
        <View style={styles.container}>

            <View style={styles.uploadStoryType}>

                <View style={styles.addContent}>
                    <Text style={styles.addProfileTitle}>Upload Your {type}</Text>
                </View>

                {/* Upload Image Button */}
                <TouchableOpacity style={styles.uploadImageButton} onPress={openGallery}>
                    <Text style={styles.uploadBtnText}>Upload A Photo</Text>
                </TouchableOpacity>

                {/* Take Photo Button */}
                <TouchableOpacity style={styles.takePhotoButton} onPress={() => navigation.navigate('CameraScreen', { type: type })}>
                    <Text style={styles.takePhotoText} >Take A Photo</Text>
                </TouchableOpacity>

                {/* Skip For Now Button */}
                <TouchableOpacity style={styles.skipBtn} onPress={() => navigation.goBack()}>
                    <Text style={styles.skipBtnText} >Skip For Now</Text>
                </TouchableOpacity>

            </View>

        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        height: height,
        width: width,
        backgroundColor: "#1A1A1A"
    },

    uploadStoryType: {
        marginTop: "auto",
        marginBottom: "auto",
    },

    addContent: {
        position: "relative"
    },

    addProfileTitle: {
        fontSize: 20,
        color: "#fff",
        textAlign: "center",
        marginTop: 30,
        fontWeight: 500
    },

    addProfiletext: {
        fontSize: 16,
        color: "#fff",
        textAlign: "center",
        marginBottom: 30
    },

    uploadImageButton: {
        backgroundColor: "#f5a623",
        padding: 15,
        borderRadius: 25,
        alignItems: "center",
        marginTop: 30,
    },

    uploadBtnText: {
        fontSize: 18,
        color: "#101010",
        fontWeight: 500
    },

    takePhotoButton: {
        backgroundColor: "#f5a623",
        padding: 15,
        borderRadius: 25,
        alignItems: "center",
        marginTop: 20,
        marginBottom: 40
    },

    takePhotoText: {
        fontSize: 18,
        color: "#101010",
        fontWeight: 500
    },

    skipBtn: {
        position: "relative",
    },

    skipBtnText: {
        fontSize: 15,
        color: "#fff",
        textAlign: "center",
        marginBottom: 50
    }

});
