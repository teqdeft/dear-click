// GalleryIcon.tsx
import React from "react";
import { Svg, Rect, Circle, Polygon, Path } from "react-native-svg";

type Props = {
    width?: number;
    height?: number;
    color?: string;
    style?: any;
};

export default function GalleryIcon({
    width = 30,
    height = 30,
    color = "#ffffffff",
    style,
}: Props) {
    // using viewBox 0 0 24 24 so icon scales nicely
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            style={style}
            accessibilityLabel="Gallery icon"
            accessible
        >
            {/* outer rounded rectangle (frame) */}
            <Rect
                x={1.5}
                y={2}
                width={21}
                height={20}
                rx={2.2}
                stroke={color}
                strokeWidth={1.4}
                fill="none"
            />

            {/* sun or spotlight */}
            <Circle cx={17} cy={7} r={1.6} fill={color} />

            {/* mountains / photo content */}
            <Polygon
                points="5,17 9.2,11 13,15 16.8,10 19.5,14.5 19.5,17"
                fill={color}
                opacity={0.12}
            />
            <Path
                d="M4.5 16.8 L8.8 11.2 L12.4 15 L16.1 10.6 L19 14.3"
                stroke={color}
                strokeWidth={1.2}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
        </Svg>
    );
}
