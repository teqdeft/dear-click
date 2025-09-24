import * as React from 'react';
import Svg, { Mask, Path, G } from 'react-native-svg';

const SignInEmail = () => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Mask
      id="mask0_111_791"
      style={{
        maskType: 'luminance',
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={18}
      height={18}
    >
      <Path d="M0 1.90735e-06H18V18H0V1.90735e-06Z" fill="white" />
    </Mask>
    <G mask="url(#mask0_111_791)">
      <Path
        d="M16.0607 2.78679H1.93967C1.163 2.78679 0.527588 3.42224 0.527588 4.19888V13.8012C0.527588 14.5779 1.163 15.2132 1.93967 15.2132H16.0608C16.8373 15.2132 17.4728 14.5779 17.4728 13.8012V4.19888C17.4728 3.42224 16.8373 2.78679 16.0607 2.78679Z"
        stroke="white"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.4726 4.48129L10.175 9.34639C9.52877 9.7772 8.47134 9.7772 7.8252 9.34639L0.527466 4.48129"
        stroke="white"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);
export default SignInEmail;
