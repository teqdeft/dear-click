import * as React from 'react';
import Svg, {
  Circle,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
const Plusicon = ({ fill = '#fff', ...props }: any) => (
  <Svg
    width={64}
    height={64}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={32} cy={32} r={32} fill="url(#paint0_linear_1337_319)" />
    <Path
      d="M31.9834 25.3003V38.6667"
      stroke="#fff"
      strokeWidth={2.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M25.3003 31.9834H38.6667"
      stroke="#fff"
      strokeWidth={2.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_1337_319"
        x1={7.22924}
        y1={-0.00000195163}
        x2={62.4501}
        y2={2.32454}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor={fill} />
        <Stop offset={1} stopColor={fill} />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default Plusicon;
