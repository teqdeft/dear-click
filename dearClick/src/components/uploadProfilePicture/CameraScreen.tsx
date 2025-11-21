import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Pressable, Animated, Easing, Platform, } from "react-native";
import { Camera, useCameraDevice, CameraPermissionStatus, VideoFile, } from "react-native-vision-camera";
import PreviewScreen from "./PreviewScreen";
import toast from "../utils/Toast";
import { createPost } from "../../screens/post/services/services";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { createStory } from "../../screens/stories/services";

export default function CameraWithSpinner() {
    const [cameraPermission, setCameraPermission] = useState<CameraPermissionStatus>("not-determined");
    const [isFront, setIsFront] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [flash, setFlash] = useState<"off" | "on">("off");
    const [isRecording, setIsRecording] = useState(false);
    const [recordTimeSec, setRecordTimeSec] = useState(0);
    const [photo, setPhoto] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<{
        type: "photo" | "video";
        path: string;
    } | null>(null);

    const route = useRoute<RouteProp<{ params: { type: string } }, 'params'>>();
    const { type } = route.params;

    // handle camera access front and back 
    const device = useCameraDevice(isFront ? "front" : "back");
    const cameraRef = useRef<Camera | null>(null);

    // Animated rotation value for spinner ring
    const rotateAnim = useRef(new Animated.Value(0)).current;

    // Timer interval ref
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        (async () => {
            const status = await Camera.requestCameraPermission();
            setCameraPermission(status);
            // microphone needed for video
            await Camera.requestMicrophonePermission();
        })();

        // cleanup on unmount
        return () => {
            stopSpinnerAnimation();
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Start spinner animation loop
    const startSpinnerAnimation = () => {
        rotateAnim.setValue(0);
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 5000, // rotation speed
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    };

    const stopSpinnerAnimation = () => {
        rotateAnim.stopAnimation();
        rotateAnim.setValue(0);
    };

    // Start recording
    const startRecording = async () => {
        try {
            setIsRecording(true);
            startSpinnerAnimation();
            setRecordTimeSec(0);

            // start a small timer to show seconds (optional)
            timerRef.current = setInterval(() => {
                setRecordTimeSec((s) => s + 1);
            }, 1000) as unknown as number;

            cameraRef.current?.startRecording({
                flash,
                onRecordingFinished: (video: VideoFile) => {
                    setIsRecording(false);
                    stopSpinnerAnimation();
                    if (timerRef.current) clearInterval(timerRef.current);
                    const videoUri = Platform.OS === 'android'
                        ? 'file://' + video.path
                        : video.path;
                    setPhoto({
                        uri: videoUri,
                        type: 'video/mp4',
                        fileName: `video_${Date.now()}.mp4`,
                    });
                    setPreview({
                        type: "video",
                        path: video?.path ? "file://" + video.path : "",
                    });
                },
                onRecordingError: (error) => {
                    console.error("Recording error:", error);
                    setIsRecording(false);
                    stopSpinnerAnimation();
                    if (timerRef.current) {
                        clearInterval(timerRef.current);
                        timerRef.current = null;
                    }
                },
            });
        } catch (err) {
            console.error("startRecording err:", err);
            setIsRecording(false);
            stopSpinnerAnimation();
        }
    };

    // Stop recording
    const stopRecording = async () => {
        if (!isRecording) return;
        try {
            await cameraRef.current?.stopRecording();
            // onRecordingFinished will handle resetting state
        } catch (err) {
            console.error("stopRecording err:", err);
            setIsRecording(false);
            stopSpinnerAnimation();
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        }
    };

    const capturePhoto = async () => {
        if (isRecording || !cameraRef.current) return;

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

            setPreview({
                type: "photo",
                path: photoUri,
            });

        } catch (err) {
            console.error("capturePhoto error:", err);
            toast.error("Photo is not capture yet!");
        }
    };

    // rotation interpolation
    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });


    // Permission & device checks
    if (cameraPermission !== "granted") {
        return (
            <View style={styles.center}>
                <Text style={styles.infoText}>Camera permission required</Text>
            </View>
        );
    }

    if (!device) {
        return (
            <View style={styles.center}>
                <Text style={styles.infoText}>Loading camera...</Text>
            </View>
        );
    }



    const handleAddStoryOrPost = async () => {
        try {

            if (type == "Post") {
                setLoading(true);
                const data = await createPost(photo);
                if (!data?.success) return toast.error(data.error.message);
                toast.success(data.message);
            }

            else if (type == "Story") {
                setLoading(true);
                const data = await createStory(photo);
                if (!data?.success) return toast.error(data.error.message);
                toast.success(data.message);
            }

            navigation.navigate('AppTabs', { screen: 'Home' });
        } catch (err) {

            setLoading(false);
            toast.error('Something went wrong');
        }
    };

    if (preview) {
        return (<PreviewScreen media={preview} onRetake={() => setPreview(null)} onUse={() => handleAddStoryOrPost()} />);
    }

    return (
        <View style={styles.container}>
            <Camera
                ref={cameraRef}
                style={StyleSheet.absoluteFill as any}
                device={device}
                isActive={true}
                photo={true}
                video={true}
            />

            {/* Top controls */}
            <View style={styles.topControls}>
                <TouchableOpacity
                    onPress={() => setFlash((f) => (f === "off" ? "on" : "off"))}
                    style={styles.topBtn}
                >
                    <Text style={styles.topBtnText}>{flash === "off" ? "Flash Off" : "Flash On"}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setIsFront((p) => !p)}
                    style={styles.topBtn}
                >
                    <Text style={styles.topBtnText}>Flip{type}</Text>
                </TouchableOpacity>
            </View>

            {/* Recording timer (shows when recording) */}
            {isRecording && (
                <View style={styles.recTimer}>
                    <View style={styles.recDot} />
                    <Text style={styles.recTimerText}>
                        {Math.floor(recordTimeSec / 60)
                            .toString()
                            .padStart(2, "0")}
                        :
                        {(recordTimeSec % 60).toString().padStart(2, "0")}
                    </Text>
                </View>
            )}

            {/* Bottom controls - center shutter with rotating ring */}
            <View style={styles.bottomControls}>
                {/* Spacer left */}
                <View style={{ width: 60 }} />

                {/* Shutter + spinner */}
                <View style={styles.shutterContainer}>
                    {/* Rotating outer ring visible only while recording */}
                    <Animated.View
                        style={[
                            styles.spinnerRing,
                            {
                                transform: [{ rotate: spin }],
                                opacity: isRecording ? 1 : 0,
                            },
                        ]}
                    />

                    {/* Inner clickable capture button */}
                    <Pressable
                        onPress={capturePhoto}
                        onLongPress={startRecording}
                        onPressOut={stopRecording}
                        style={[
                            styles.captureButton,
                            isRecording ? styles.captureButtonRecording : undefined,
                        ]}
                        android_ripple={{ color: "rgba(255,255,255,0.12)", radius: 40 }}
                    />
                </View>

                {/* Spacer right */}
                <View style={{ width: 60 }} />
            </View>
        </View>
    );
}

const StyleSheet = {
    absoluteFill: {
        position: "absolute" as const,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
};

const styles = StyleSheetCreate();

function StyleSheetCreate() {
    return {
        container: {
            flex: 1,
            backgroundColor: "black",
        } as any,
        center: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",
        } as any,
        infoText: {
            color: "white",
            fontSize: 16,
        } as any,
        topControls: {
            position: "absolute" as const,
            top: Platform.OS === "ios" ? 50 : 30,
            left: 20,
            right: 20,
            flexDirection: "row" as const,
            justifyContent: "space-between",
            alignItems: "center",
        } as any,
        topBtn: {
            padding: 8,
            backgroundColor: "rgba(0,0,0,0.4)",
            borderRadius: 8,
        } as any,
        topBtnText: {
            color: "white",
            fontSize: 14,
        } as any,
        recTimer: {
            position: "absolute" as const,
            top: Platform.OS === "ios" ? 50 : 30,
            alignSelf: "center",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
            paddingVertical: 4,
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: 20,
        } as any,
        recDot: {
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: "red",
            marginRight: 8,
        } as any,
        recTimerText: {
            color: "white",
            fontSize: 14,
            fontWeight: "600",
        } as any,
        bottomControls: {
            position: "absolute" as const,
            bottom: 40,
            left: 0,
            right: 0,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        } as any,
        shutterContainer: {
            width: 120,
            height: 120,
            alignItems: "center",
            justifyContent: "center",
        } as any,
        spinnerRing: {
            position: "absolute" as const,
            width: 120,
            height: 120,
            borderRadius: 60,
            borderWidth: 4,
            borderColor: "rgba(255,0,0,0.9)",
            borderLeftColor: "transparent",
            borderBottomColor: "transparent",
        } as any,
        captureButton: {
            width: 80,
            height: 80,
            borderRadius: 40,
            borderWidth: 6,
            borderColor: "white",
            backgroundColor: "rgba(255,255,255,0.12)",
            alignItems: "center",
            justifyContent: "center",
        } as any,
        captureButtonRecording: {
            backgroundColor: "red",
            borderColor: "red",
        } as any,
    };
}
