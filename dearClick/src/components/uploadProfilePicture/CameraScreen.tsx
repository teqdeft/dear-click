import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform, Alert } from "react-native";
import { Camera, useCameraDevice, useCameraPermission, useMicrophonePermission } from "react-native-vision-camera";
import PreviewScreen from "./PreviewScreen";
import toast from "../utils/Toast";
import { createPost } from "../../screens/post/services/services";
import { createStory } from "../../screens/stories/services";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFocusEffect, useNavigation } from "@react-navigation/core";
import { launchImageLibrary } from "react-native-image-picker";
import GalleryIcon from "../../assets/svgs/icons/GalleryIcon";
import CameraFlahOn from "../../assets/svgs/icons/CameraFlahOn";
import CameraFlip from "../../assets/svgs/icons/CameraFlip";
import CameraFlashOff from "../../assets/svgs/icons/CameraFlashOff";

const CameraScreen = () => {
    const [capturedMedia, setCapturedMedia] = useState<null | {
        type: "photo" | "video";
        path: string;
    }>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [selectedTab, setSelectedTab] = useState("Story");
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState<any>(null);
    const [isFront, setIsFront] = useState(false)
    const [flash, setFlash] = useState<"off" | "on">("off")
    const [recordTimeSec, setRecordTimeSec] = useState(0);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const tabs = ["Story", "Post"];
    const cameraRef = useRef<Camera>(null);


    // New VisionCamera permission API
    const { hasPermission: camPermission, requestPermission: requestCam } = useCameraPermission();
    const { hasPermission: micPermission, requestPermission: requestMic } = useMicrophonePermission();

    // WAY to select camera
    const device = useCameraDevice(isFront ? "front" : "back");
    const timerRef = useRef<number | null>(null);
    // Request permissions automatically

    useFocusEffect(
        useCallback(() => {
            // RESET ALL STATES HERE
            setPhoto(null);
            setCapturedMedia(null)
            setIsRecording(false);
            setFlash('off');
            setIsFront(false);
            setSelectedTab('Story');
            return () => { };
        }, []),
    );

    // ask for camera permission
    useEffect(() => {
        const askPermissions = async () => {
            if (!camPermission) {
                await requestCam();
            }
            if (!micPermission) {
                await requestMic();
            }
        };

        askPermissions();
    }, [camPermission, micPermission]);

    // validation for denied camera 
    if (!device) {
        return (
            <View >
                <Text >Loading camera…</Text>
            </View>
        );
    }

    // capture image handle ios and android both
    const capturePhoto = async () => {
        if (isRecording || !cameraRef.current) return;

        setRecordTimeSec(0);

        clearTimer(); // ensure no old timer running

        timerRef.current = setInterval(() => {
            setRecordTimeSec((prev) => prev + 1);
        }, 1000);

    try {
      const photo = await cameraRef.current.takePhoto({
        flash: flash,
        enableAutoRedEyeReduction: true,
      });

            if (!photo?.path) throw new Error("Photo path not found");

            const photoUri = Platform.OS === 'android'
                ? 'file://' + photo.path
                : photo.path;

      setPhoto({
        uri: photoUri,
        type: 'image/jpeg',
        fileName: `photo_${Date.now()}.jpg`,
      });

            setCapturedMedia({
                type: "photo",
                path: photoUri,
            });

        } catch (err) {
            console.error("capturePhoto error:", err);
            toast.error("Photo is not capture yet!");
        }
    };

    // open gallery function
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
            setCapturedMedia({ type: mediaType, path: asset.uri!, });
        }

    };

    // video recoarding function
    const startVideoRecording = async () => {
        try {
            setIsRecording(true);
            setRecordTimeSec(0);

            clearTimer(); // ensure no old timer running

            timerRef.current = setInterval(() => {
                setRecordTimeSec((prev) => prev + 1);
            }, 1000);

            const video = await cameraRef.current?.startRecording({
                fileType: "mp4",
                flash: flash,
                onRecordingFinished: (video) => {
                    setIsRecording(false);
                    const videoUri = Platform.OS === 'android'
                        ? 'file://' + video.path
                        : video.path;
                    setPhoto({
                        uri: videoUri,
                        type: 'video/mp4',
                        fileName: `video_${Date.now()}.mp4`,
                    });
                    setCapturedMedia({
                        type: "video",
                        path: video?.path ? "file://" + video.path : "",
                    });
                },
                onRecordingError: (err) => {
                    console.error("Video error:", err);
                    setIsRecording(false);
                },
            });
        } catch (error) {
            console.log("Start recording error:", error);
        }
    };

    // stop video recoarding
    const stopVideoRecording = async () => {
        try {
            clearTimer();
            await cameraRef.current?.stopRecording();
        } catch (error) {
            console.log("Stop recording error:", error);
        }
    };

    const handleRetake = () => {
        setCapturedMedia(null);
    };

    // handle post and story according to tab value
    const handleAddStoryOrPost = async () => {
        try {
            setLoading(true);
            let data;
            if (selectedTab === "Post") {
                data = await createPost(photo);
            }
            if (selectedTab === "Story") {
                data = await createStory(photo);
            }
            if (!data?.success) {
                toast.error(data?.error?.message || "Failed to submit");
                return;
            }
            toast.success(data.message);
            setCapturedMedia(null);
            navigation.navigate('AppTabs', { screen: 'Home' });
        } catch (err) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    // photo and video preview component
    if (capturedMedia) {
        return (
            <PreviewScreen
                media={capturedMedia}
                onRetake={handleRetake}
                onUse={() => handleAddStoryOrPost()}
            />
        );
    }

    const formatTime = (sec: number) => {
        const m = Math.floor(sec / 60).toString().padStart(2, "0");
        const s = (sec % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    const clearTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };
    return (
        <View style={styles.container}>
            {/* CAMERA VIEW */}
            <Camera
                ref={cameraRef}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                photo={true}
                video={true}
            />

            {/* :top: TOP BAR */}
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => setFlash(f => (f === "off" ? "on" : "off"))}>
                    {flash === "on" ? <CameraFlahOn /> : <CameraFlashOff />}
                </TouchableOpacity>

                {isRecording && (
                    <View style={styles.recordingTimerBox}>
                        <View style={styles.recordingDot} />
                        <Text style={styles.recordingText}>{formatTime(recordTimeSec)}</Text>
                    </View>
                )}

                <TouchableOpacity onPress={() => setIsFront(p => !p)}>
                    <CameraFlip />
                </TouchableOpacity>



            </View>

            {/* OTTOM SECTION */}
            <View style={styles.bottomContainer}>
                {/* GALLERY LEFT */}
                <TouchableOpacity style={styles.galleryBtn} onPress={openGallery}>
                    <GalleryIcon />
                </TouchableOpacity>
                {/* CAPTURE CENTER */}
                <TouchableOpacity
                    style={styles.captureBtn}
                    onPress={capturePhoto}
                    onLongPress={startVideoRecording}
                    onPressOut={stopVideoRecording}
                >
                    <View
                        style={[
                            styles.innerCircle,
                            isRecording && {
                                backgroundColor: "red",
                                width: 40,
                                height: 40,
                            },
                        ]}
                    />
                </TouchableOpacity>
            </View>

            {/* MODE TABS BELOW CAPTURE */}
            <View style={styles.modeTabs}>
                {tabs?.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => setSelectedTab(item)}
                        style={styles.modeItem}
                    >
                        <Text
                            style={[
                                styles.modeText,
                                selectedTab === item && styles.modeTextActive,
                            ]}
                        >
                            {item}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

        </View>
    );
};

export default CameraScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    /* TOP BAR */
    topBar: {
        position: "absolute",
        top: 70,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 20,
    },

    topBarCenter: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    recordingTimerBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.6)",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },

    recordingDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "red",
        marginRight: 8,
    },

    recordingText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },


    /* BOTTOM SECTION */
    bottomContainer: {
        position: "absolute",
        bottom: 120,
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    galleryBtn: {
        position: "absolute",
        left: 40,
        bottom: 0,
        zIndex: 30,
    },
    captureBtn: {
        width: 80,
        height: 80,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    innerCircle: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: "#fff",
    },
    /* BOTTOM TABS */
    modeTabs: {
        position: "absolute",
        bottom: 40,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
    },
    modeItem: {
        marginHorizontal: 15,
    },
    modeText: {
        color: "#b6b0b0ff",
        fontSize: 16,
        fontWeight: "500",
    },
    modeTextActive: {
        color: "white",
        fontWeight: "700",
    },
});