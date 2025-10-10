import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const EditIcon = ({ fill = '#fff', ...props }: any) => (
  <Svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M2.35505 14.25L2.0117 15.5546C1.97956 15.6767 2.01471 15.8067 2.10397 15.896C2.19328 15.9853 2.32327 16.0204 2.44536 15.9883L3.75001 15.645L2.35505 14.25Z"
      fill={fill}
    />
    <Path
      d="M11.1228 4.13566L2.87073 12.3877L5.61132 15.1283L13.8634 6.87625L11.1228 4.13566Z"
      fill={fill}
    />
    <Path
      d="M15.4324 2.56764C14.6756 1.81079 13.4485 1.81079 12.6917 2.56764L11.7859 3.47345L14.5266 6.21418L15.4324 5.30833C16.1893 4.55157 16.1893 3.32449 15.4324 2.56764Z"
      fill={fill}
    />
  </Svg>
);
export default EditIcon;
