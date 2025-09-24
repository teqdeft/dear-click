import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const BackButton = () => (
  <Svg width={8} height={14} viewBox="0 0 8 14" fill="none">
    <Path
      d="M7 1L1 7L7 13"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default BackButton;
