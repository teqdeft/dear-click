import React from "react";
import { Svg, Path } from "react-native-svg";

type Props = {
    width?: number;
    height?: number;
    color?: string;
    style?: any;
};

export default function CameraFlahOn({
    width = 30,
    height = 30,
    color = "#FFFFFF",
    style
}: Props) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            style={style}
        >
            <Path
                d="M10 2 L4 12 H10 L8 22 L20 10 H14 L16 2 Z"
                stroke={color}
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}