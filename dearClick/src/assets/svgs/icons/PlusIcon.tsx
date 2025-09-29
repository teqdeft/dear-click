import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const PlusIcon = (props: any) => (
  <Svg
    width={10}
    height={10}
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M5 1V9"
      stroke="black"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M1 5H9"
      stroke="black"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default PlusIcon;
