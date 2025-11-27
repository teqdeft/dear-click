import React from "react";
import { Svg, Path } from "react-native-svg";

type Props = {
    width?: number;
    height?: number;
    color?: string;
    style?: any;
};

export default function CameraFlip({
    width = 30,
    height = 30,
    color = "#ffffffff",
    style,
}: Props) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            style={style}
        >
            {/* Top curved arc + right arrow */}
            <Path
                d="M7 7a7 7 0 0 1 11 0"
                stroke={color}
                strokeWidth={2.3}
                strokeLinecap="round"
            />
            <Path
                d="M18 5v3h-3"
                stroke={color}
                strokeWidth={2.3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Bottom curved arc + left arrow */}
            <Path
                d="M17 17a7 7 0 0 1 -11 0"
                stroke={color}
                strokeWidth={2.3}
                strokeLinecap="round"
            />
            <Path
                d="M6 19v-3h3"
                stroke={color}
                strokeWidth={2.3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}