import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const Save = (props: any) => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M9.38931 0H2.61063C2.01323 0 1.50586 0.481821 1.50586 1.10477V11.1282C1.50762 11.9189 2.47337 12.2899 3.02241 11.7348L5.60626 9.15171C5.81332 8.93569 6.18662 8.93569 6.39368 9.15171L8.97753 11.7348C9.52681 12.2901 10.4924 11.9185 10.4941 11.1282V1.10477C10.4941 0.481821 9.98671 0 9.38931 0Z"
      fill="#FBC213"
    />
  </Svg>
);
export default Save;
