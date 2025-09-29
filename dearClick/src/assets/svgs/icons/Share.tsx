import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';
const Share = (props: any) => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_1313_1043)">
      <Path
        d="M7.69371 12C7.20541 12 6.77086 11.6722 6.63675 11.2029L5.33906 6.66093L0.797133 5.36324C0.327774 5.22913 0 4.79458 0 4.30647C0 3.81149 0.318422 3.38352 0.792375 3.24133L11.5474 0.0148282C11.6713 -0.0223203 11.8056 0.0115235 11.897 0.102977C11.9885 0.19443 12.0223 0.328703 11.9852 0.452594L8.75864 11.2076C8.61647 11.6816 8.1885 12 7.69371 12Z"
        fill="#FBC213"
      />
      <Path
        d="M7.69376 12C7.20546 12 6.77091 11.6722 6.6368 11.2029L5.33911 6.66098L11.8971 0.103027C11.9885 0.19448 12.0224 0.328754 11.9852 0.452645L8.75869 11.2077C8.61652 11.6816 8.18855 12 7.69376 12Z"
        fill="#FBC213"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_1313_1043">
        <Rect width={12} height={12} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default Share;
