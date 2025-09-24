import * as React from 'react';
import Svg, { Mask, Path, G } from 'react-native-svg';
const CameraLogo = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Mask
      id="mask0_127_1954"
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={20}
      height={20}
    >
      <Path
        d="M19.25 19.25V0.75H0.75V19.25H19.25Z"
        fill="grey"
        stroke="grey"
        strokeWidth={1.5}
      />
    </Mask>
    <G mask="url(#mask0_127_1954)">
      <Path
        d="M18.2422 17.8125H1.75781C1.11062 17.8125 0.585938 17.2878 0.585938 16.6406V6.48438C0.585938 5.83719 1.11062 5.3125 1.75781 5.3125H18.2422C18.8894 5.3125 19.4141 5.83719 19.4141 6.48438V16.6406C19.4141 17.2878 18.8894 17.8125 18.2422 17.8125Z"
        stroke="white"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.375 5.3125H5.625L6.15578 2.65855C6.21059 2.38465 6.45105 2.1875 6.73035 2.1875H13.2696C13.5489 2.1875 13.7894 2.38465 13.8442 2.65855L14.375 5.3125Z"
        stroke="white"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.75 11.5625C13.75 13.6336 12.0711 15.3125 10 15.3125C7.92891 15.3125 6.25 13.6336 6.25 11.5625C6.25 9.49141 7.92891 7.8125 10 7.8125C12.0711 7.8125 13.75 9.49141 13.75 11.5625Z"
        stroke="white"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.125 7.8125H5"
        stroke="white"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);
export default CameraLogo;
