import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { createPost } from "../../screens/post/services/services";
import toast from "../../components/utils/Toast";
import PreviewScreen from "../../components/uploadProfilePicture/PreviewScreen";
import { createStory } from "./services";

const { height, width } = Dimensions.get('window');

export default function StorySourceSelector() {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [photo, setPhoto] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<{
        type: "photo" | "video";
        path: string;
    } | null>(null);

    const openGallery = async () => {
        const result = await launchImageLibrary({
            mediaType: 'mixed',
            quality: 1,
        });

        if (result.assets && result.assets.length > 0) {
            const asset = result.assets[0];

            const fileType = asset.type;
            let mediaType: "photo" | "video" = fileType?.startsWith("image") ? "photo" : "video";

            setPhoto(asset);

            setPreview({ type: mediaType, path: asset.uri!, });
        }
    };

    const handleAddStory = async () => {
        try {
            setLoading(true);
            const data = await createStory(photo);
            if (!data?.success) return toast.error(data.error.message);
            toast.success(data.message);
            navigation.navigate('AppTabs', { screen: 'Home' });
        } catch (err) {
            setLoading(false);
            toast.error('Something went wrong');
        }
    };

    if (preview) {
        return (
            <PreviewScreen
                media={preview}
                onRetake={() => setPreview(null)}
                onUse={() => handleAddStory()}
            />
        );
    }

    return (
        <View style={styles.container}>

            <View style={styles.uploadStoryType}>

                <View style={styles.addContent}>
                    <Text style={styles.addProfileTitle}>Upload Your Story</Text>
                </View>

                {/* Upload Image Button */}
                <TouchableOpacity style={styles.uploadImageButton} onPress={openGallery}>
                    <Text style={styles.uploadBtnText}>Upload A Photo or Video</Text>
                </TouchableOpacity>

                {/* Take Photo Button */}
                <TouchableOpacity style={styles.takePhotoButton} onPress={() => navigation.navigate('CameraScreen')}>
                    <Text style={styles.takePhotoText} >Take A Photo or Video</Text>
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
