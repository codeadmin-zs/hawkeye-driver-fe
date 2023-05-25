import React from "react";
import { View } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

export const DatePickerCalender = (props) => (
  <Svg
    width={props.width}
    height={props.height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M5.052 15.43h9.71a.652.652 0 0 0 .47-.201.702.702 0 0 0 .194-.488V9.23a.703.703 0 0 0-.194-.488.652.652 0 0 0-.47-.201h-9.71a.652.652 0 0 0-.47.201.703.703 0 0 0-.194.488v5.511c0 .183.07.358.194.488.125.129.293.201.47.201ZM12.23 9.92h1.868v1.378H12.23V9.919Zm0 2.755h1.868v1.379H12.23v-1.379ZM8.91 9.92h1.992v1.378H8.911V9.919Zm0 2.755h1.992v1.379H8.911v-1.379ZM5.716 9.92h1.868v1.378H5.715V9.919Zm0 2.755h1.868v1.379H5.715v-1.379Z"
      fill={props.iconColor}
    />
    <Path
      d="M4.799 0a.652.652 0 0 0-.47.202.702.702 0 0 0-.194.487v1.043h-.794a2.39 2.39 0 0 0-1.722.74 2.576 2.576 0 0 0-.713 1.786v11.216c0 .67.257 1.312.713 1.786a2.39 2.39 0 0 0 1.722.74h13.13c.646 0 1.266-.266 1.722-.74a2.576 2.576 0 0 0 .713-1.786V4.258c0-.67-.256-1.313-.713-1.787a2.39 2.39 0 0 0-1.721-.74h-.795V.69a.694.694 0 0 0-.331-.597.643.643 0 0 0-.664 0 .694.694 0 0 0-.332.597v1.043h-3.78V.689a.694.694 0 0 0-.332-.597.643.643 0 0 0-.664 0 .694.694 0 0 0-.332.597v1.043h-3.78V.689a.702.702 0 0 0-.194-.487.652.652 0 0 0-.47-.202H4.8Zm12.78 15.474c0 .304-.117.596-.325.812a1.086 1.086 0 0 1-.782.336H3.341c-.294 0-.575-.12-.783-.336a1.17 1.17 0 0 1-.324-.812V7.266H17.58v8.208ZM9.243 3.11v1.042c0 .246.126.474.332.597a.642.642 0 0 0 .663 0 .694.694 0 0 0 .332-.597V3.11h3.78v1.042c0 .246.127.474.332.597a.643.643 0 0 0 .664 0 .694.694 0 0 0 .332-.597V3.11h.794c.294 0 .575.12.783.336.207.215.324.507.324.812v1.63H2.234v-1.63c0-.305.117-.597.325-.812.207-.215.488-.336.782-.336h.794v1.042c0 .246.127.474.332.597a.643.643 0 0 0 .664 0 .694.694 0 0 0 .332-.597V3.11h3.78Z"
      fill={props.iconColor}
    />
  </Svg>
);

export const Bus = (props) => {
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 50 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  ></Svg>;
};

export const SchoolBus = ({ width, height, color }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 512 512">
      <Path
        fill={color}
        d="M455.34,354.24c.1,1.21.15,2.44.15,3.68a45.6,45.6,0,1,1-91.2,0q0-1.875.15-3.72a45.6,45.6,0,0,1,90.9.04Z"
      />
      <Path
        fill={color}
        d="M419.38,226.44a9.979,9.979,0,0,0,6.39,4.11l28.78,5.3a50,50,0,0,1,40.95,49.17v49.15a19.994,19.994,0,0,1-20,20H456.04l-.7.07a45.6,45.6,0,0,0-90.9-.04l-.31-.03H305.17V226.82H419.09Z"
      />
      <Path
        fill="#ebf0f7"
        d="M419.38,226.44l-.29.38H305.17V158.91H417.58v61.81A9.962,9.962,0,0,0,419.38,226.44Z"
      />
      <Path
        fill={color}
        d="M417.58,158.47v.44H91.44a20,20,0,0,0-20,20v27.91a20.007,20.007,0,0,0,20,20H195.17V354.17H147.66a45.6,45.6,0,0,0-90.9,0H36.5a19.994,19.994,0,0,1-20-20V148.47a40,40,0,0,1,40-40H367.58A50.005,50.005,0,0,1,417.58,158.47Z"
      />

      <Path
        fill="#d4e1f4"
        d="M195.17,158.91v67.91H91.44a20.007,20.007,0,0,1-20-20V178.91a20,20,0,0,1,20-20Z"
      />
      <Path
        fill={color}
        d="M147.66,354.17q.15,1.86.15,3.75a45.6,45.6,0,1,1-91.2,0q0-1.89.15-3.75a45.6,45.6,0,0,1,90.9,0Z"
      />
    </Svg>
  );
};

export const TrackerHistoryIcon = (props) => (
  <Svg
    width={props.width}
    height={props.height}
    fill="none"
    viewBox="0 0 17 22"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      stroke={props.stroke ? props.stroke : "none"}
      d="m14.729 9.242-3.202-1.646a.66.66 0 0 0-.88.28.689.689 0 0 0 .231.88l.284.2c1.276.88 2.275 1.98.7 2.623L4.3 14.009s-6.821 2.2-3.283 6.803a.803.803 0 0 0 .638.312h11.416a.359.359 0 0 0 .238-.627c-1.338-1.195-3.499-3.877.794-6.084 5.713-2.933.625-5.171.625-5.171Z"
      fill={props.stroke ? "none" : props.iconColor}
    />
    <Path
      stroke={props.stroke ? props.stroke : "none"}
      d="M4.813 11.368a.986.986 0 0 0 1.384 0c1.23-1.208 3.675-3.979 3.704-6.923A4.43 4.43 0 0 0 5.79 0h-.285a4.401 4.401 0 0 0-4.4 4.4c.006 2.956 2.46 5.75 3.707 6.968ZM3.748 4.4a1.76 1.76 0 1 1 3.52 0 1.76 1.76 0 0 1-3.52 0Z"
      fill={props.stroke ? "none" : props.iconColor}
    />
  </Svg>
);

export const MarkerStartIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    viewBox="-2 -2 20 20"
    fill="none"
    {...props}
  >
    <Circle
      cx={8}
      cy={8}
      r={6}
      stroke="#0090D9"
      strokeWidth={4}
      fill={props.color}
    />
  </Svg>
);

export const RoundOdo = (props) => (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M6 0C2.692 0 0 2.692 0 6s2.692 6 6 6 6-2.692 6-6-2.692-6-6-6Zm0 11.111a5.08 5.08 0 0 1-2.534-.675A5.075 5.075 0 0 1 6 9.76c.897 0 1.767.232 2.537.673A5.08 5.08 0 0 1 6 11.111Zm3.324-1.233A5.971 5.971 0 0 0 6 8.873c-1.193 0-2.336.35-3.321 1.007a5.102 5.102 0 0 1-1.77-3.436h1.758a.444.444 0 1 0 0-.888H.909a5.087 5.087 0 0 1 1.178-2.84l1.241 1.242a.444.444 0 1 0 .629-.629L2.716 2.088A5.086 5.086 0 0 1 5.556.91v1.757a.444.444 0 0 0 .888 0V.91a5.088 5.088 0 0 1 2.84 1.178L8.042 3.329a.444.444 0 1 0 .629.629l1.241-1.242a5.087 5.087 0 0 1 1.178 2.84H9.333a.444.444 0 0 0 0 .888h1.757a5.104 5.104 0 0 1-1.767 3.434ZM7.36 2.715a.444.444 0 0 0-.58.24l-.62 1.498a1.556 1.556 0 1 0 .821.34l.62-1.498a.444.444 0 0 0-.241-.58ZM6 6.667a.667.667 0 1 1 .002-1.335A.667.667 0 0 1 6 6.667Z"
      fill={props.iconColor}
    />
  </Svg>
);
export const PartialOdo = (props) => (
  <Svg
    width={props.width}
    height={props.height}
    fill="none"
    viewBox="0 0 17 12"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.74 8.255h1.084a.395.395 0 1 1 0 .791H14.74a.396.396 0 0 1 0-.79Zm-13.567 0h1.083a.395.395 0 1 1 0 .791H1.173a.396.396 0 0 1 0-.79Zm13.62-3.66a.397.397 0 0 1 .247.736l-.939.541a.396.396 0 0 1-.395-.685l.938-.541a.371.371 0 0 1 .15-.05Zm-12.59 0a.376.376 0 0 1 .149.05l.939.542c.188.11.253.35.143.54a.394.394 0 0 1-.539.145l-.939-.542a.395.395 0 0 1 .247-.735Zm9.794-2.32a.402.402 0 0 1 .154.05c.2.119.243.36.147.52L9.704 7.507A1.486 1.486 0 0 1 8.357 9.93l-.467.836c-.141.265-.533.253-.75.127-.216-.122-.465-.417-.309-.673l.542-.876a1.486 1.486 0 0 1 1.45-2.346L11.63 2.46a.377.377 0 0 1 .367-.185Zm-7.21-.36a.395.395 0 0 1 .391.194l.542.938a.396.396 0 0 1-.685.395l-.542-.938a.395.395 0 0 1 .294-.59ZM8.498.93c.219 0 .396.177.396.395v1.083a.395.395 0 1 1-.791 0V1.325c0-.218.175-.395.395-.395ZM8.5 0a8.492 8.492 0 0 0-5.48 2.003C.566 4.067-.445 7.259.18 10.262c.176.845.685 1.53 1.806 1.53h13.027c1.122 0 1.631-.684 1.807-1.53.624-3.003-.387-6.195-2.84-8.26A8.491 8.491 0 0 0 8.5 0Z"
      fill={props.iconColor}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.55 7.783a.699.699 0 1 0-.001 1.398.699.699 0 0 0 .001-1.398Z"
      fill="#909090"
    />
  </Svg>
);

export const ClockIcon = (props) => (
  <Svg
    width={props.width}
    height={props.height}
    fill="none"
    viewBox="0 0 9 9"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M4.5 0a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm0 1.607c.178 0 .321.144.321.322v2.44l1.497 1.497a.318.318 0 0 1 0 .452.318.318 0 0 1-.452 0L4.319 4.766a.392.392 0 0 1-.14-.266V1.929c0-.178.144-.322.321-.322Z"
      fill={props.iconColor}
    />
  </Svg>
);

export const Location = (props) => (
  <Svg
    width={16}
    height={23}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M.826 8.211C.826 4.113 4.25.805 8.418.805 12.587.805 16 4.112 16 8.21c0 .986-.212 1.912-.558 2.754-1.024 2.491-2.847 4.918-4.535 6.996 1.136.115 2.138.304 2.954.563.549.174 1.015.372 1.395.644.38.272.744.69.744 1.254 0 .634-.434 1.064-.884 1.348-.449.283-1.01.49-1.674.668-1.328.354-3.08.562-5.024.562-1.942 0-3.705-.208-5.034-.562-.665-.178-1.225-.385-1.675-.668-.45-.284-.883-.713-.883-1.348 0-.364.169-.696.372-.926.203-.23.446-.39.72-.539.551-.299 1.241-.526 2.07-.703a.74.74 0 0 1 .58.086.754.754 0 0 1 .227 1.06.744.744 0 0 1-.493.319c-.74.158-1.34.363-1.686.55-.125.069-.183.12-.232.165.013.002.039.01.116.058.243.154.693.34 1.267.492 1.15.307 2.815.516 4.652.516 1.836 0 3.493-.21 4.639-.515.573-.154 1.025-.34 1.268-.493h.001c.047-.03.076-.049.103-.07-.007-.006-.01-.01-.012-.014a.077.077 0 0 0-.023-.021c-.175-.125-.52-.29-.976-.434-.882-.279-2.19-.492-3.675-.574-.253.304-.525.633-.756.914a.742.742 0 0 1-1.15 0l-.698-.841c-1.955-2.354-4.465-5.374-5.745-8.487a7.224 7.224 0 0 1-.57-2.754Zm13.685 0c0-3.26-2.702-5.906-6.093-5.906-3.39 0-6.104 2.647-6.104 5.906 0 .764.17 1.491.453 2.18 1.143 2.782 3.534 5.669 5.491 8.033l.003.004.157.19.103-.125c1.968-2.377 4.383-5.295 5.537-8.102a5.703 5.703 0 0 0 .453-2.18Zm-9.953.035c0-2.098 1.752-3.785 3.86-3.785 2.108 0 3.85 1.687 3.85 3.785s-1.742 3.797-3.85 3.797-3.86-1.699-3.86-3.797Zm6.22 0c0-1.263-1.032-2.285-2.36-2.285-1.327 0-2.372 1.022-2.372 2.285 0 1.263 1.045 2.297 2.372 2.297 1.328 0 2.36-1.034 2.36-2.297Z"
      fill="#909090"
    />
  </Svg>
);

export const LiveLocation = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 340 340"
    style={{
      enableBackground: "new 0 0 340 340",
    }}
    xmlSpace="preserve"
    fill={props.color}
    {...props}
  >
    <Path
      d="M170 1.378c-65.781 0-119.297 53.517-119.297 119.297 0 27.144 8.896 52.708 25.726 73.928 21.464 27.063 83.759 91.194 86.401 93.911l7.169 7.375 7.17-7.374c2.643-2.718 64.958-66.864 86.424-93.935 16.815-21.204 25.703-46.76 25.703-73.905C289.297 54.895 235.781 1.378 170 1.378zm77.923 180.776c-16.648 20.995-60.591 67.003-77.923 85-17.327-17.993-61.254-63.989-77.901-84.978-13.998-17.649-21.396-38.915-21.396-61.5 0-54.753 44.544-99.297 99.297-99.297s99.297 44.544 99.297 99.297c0 22.586-7.391 43.845-21.374 61.478z"
      fill={props.color}
    />
    <Path
      d="M170 47.88c-39.422 0-71.495 32.072-71.495 71.494s32.072 71.495 71.495 71.495 71.495-32.072 71.495-71.495c0-39.421-32.073-71.494-71.495-71.494zm0 122.989c-28.394 0-51.495-23.101-51.495-51.495S141.606 67.88 170 67.88s51.495 23.1 51.495 51.494-23.101 51.495-51.495 51.495zM313.094 45.535 297.61 58.193C312.048 75.856 320 98.137 320 120.93c0 22.587-7.391 43.846-21.374 61.479l15.671 12.427C331.112 173.631 340 148.075 340 120.93c0-27.394-9.555-54.17-26.906-75.395zM26.906 45.535C9.555 66.76 0 93.536 0 120.93c0 27.145 8.888 52.701 25.703 73.905l15.671-12.427C27.391 164.775 20 143.517 20 120.93c0-22.793 7.952-45.074 22.39-62.737L26.906 45.535zM110 318.622h120v20H110z"
      fill={props.color}
    />
  </Svg>
);

export function MovingCar(props) {
  return (
    <Svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={props.size}
      height={props.size}
      viewBox="18.5 738.125 28.036 33.5"
      enable-background="new 18.5 738.125 28.036 33.5"
    >
      <Path
        d="M32.518,739.061c-6.37,0-11.553,5.184-11.553,11.553c0,3.85,3.54,9.922,5.062,12.355c1.252,2.002,2.597,3.904,3.784,5.357
        c1.933,2.363,2.476,2.363,2.707,2.363c0.223,0,0.744,0,2.669-2.363c1.191-1.463,2.537-3.365,3.788-5.357
        c1.532-2.438,5.096-8.523,5.096-12.355C44.07,744.244,38.889,739.061,32.518,739.061z M32.518,759.945
        c-5.039,0-9.14-4.1-9.14-9.139s4.101-9.141,9.14-9.141c5.04,0,9.14,4.102,9.14,9.141S37.558,759.945,32.518,759.945z"
        fill={props.color}
      />
      <Path
        d="M39.19,747.299c-0.063,0-0.129,0.01-0.193,0.027l-0.733,0.203l-0.763-1.857c-0.216-0.525-0.854-0.953-1.422-0.953h-7.132
        c-0.569,0-1.207,0.428-1.423,0.953l-0.761,1.854l-0.725-0.199c-0.065-0.018-0.13-0.027-0.193-0.027
        c-0.347,0-0.599,0.266-0.599,0.631v0.434c0,0.426,0.347,0.771,0.772,0.771h0.083l-0.123,0.299c-0.2,0.49-0.363,1.316-0.363,1.846
        v3.688c0,0.426,0.347,0.773,0.772,0.773h1.01c0.426,0,0.772-0.348,0.772-0.773v-0.922h8.684v0.922c0,0.426,0.347,0.773,0.773,0.773
        h1.009c0.426,0,0.772-0.348,0.772-0.773v-3.688c0-0.529-0.163-1.355-0.363-1.846l-0.123-0.299h0.094
        c0.426,0,0.772-0.346,0.772-0.771v-0.434C39.789,747.564,39.537,747.299,39.19,747.299z M27.317,748.715l1.152-2.807
        c0.13-0.316,0.514-0.572,0.854-0.572h6.379c0.341,0,0.725,0.256,0.854,0.572l1.152,2.807c0.13,0.314-0.043,0.572-0.383,0.572
        h-9.624C27.361,749.287,27.188,749.029,27.317,748.715z M29.891,752.268c0,0.17-0.139,0.309-0.309,0.309h-2.19
        c-0.17,0-0.309-0.139-0.309-0.309v-1.051c0-0.172,0.139-0.311,0.309-0.311h2.19c0.17,0,0.309,0.139,0.309,0.311V752.268z
         M37.922,752.268c0,0.17-0.139,0.309-0.309,0.309h-2.189c-0.171,0-0.31-0.139-0.31-0.309v-1.051c0-0.172,0.139-0.311,0.31-0.311
        h2.189c0.17,0,0.309,0.139,0.309,0.311V752.268z"
        fill={props.color}
      />
    </Svg>
  );
}

export const NotificationBell = (props) => (
  <Svg
    width={props.width}
    height={props.height}
    fill="none"
    viewBox="0 0 19 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M13.887 20.369a2.403 2.403 0 0 1-1.236 3.168A2.403 2.403 0 0 1 9.483 22.3a2.38 2.38 0 0 1-.197-.998l4-1.754c.248.222.457.495.6.82ZM1.535 14.013C.406 11.173.98 8.466 2.668 6.696c-.07-.107-.14-.206-.193-.328a2.401 2.401 0 0 1 1.236-3.166 2.406 2.406 0 0 1 3.168 1.236c.05.115.078.235.108.353 2.528-.05 5.023 1.488 6.327 4.106 0 0 1.932 4.435 4.053 4.788.065.004 1.203.032 1.55.861.327.785-.346 1.835-1.518 2.34L4.707 22.354c-1.17.505-2.464.302-2.741-.5-.273-.792.326-1.528.383-1.594 1.198-1.84-.814-6.248-.814-6.248Z"
      fill={props.iconColor}
    />
    <Circle cx={12} cy={4} r={3.5} fill="#FC0000" stroke="#fff" />
  </Svg>
);

export const StopwatchIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={props.color}
    {...props}
  >
    <Path d="M0 0h24v24H0V0z" fill="none" />
    <Path d="m22 5.7-4.6-3.9-1.3 1.5 4.6 3.9L22 5.7zM7.9 3.4 6.6 1.9 2 5.7l1.3 1.5 4.6-3.8zM12.5 8H11v6l4.7 2.9.8-1.2-4-2.4V8zM12 4c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z" />
  </Svg>
);

export function ButtonStop(props) {
  return (
    <Svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={props.size}
      height={props.size}
      viewBox="0 0 277.33 277.33"
      style="enable-background:new 0 0 277.33 277.33;"
    >
      <Path
        d="M231.677,0H45.665C20.45,0,0,20.442,0,45.657v186.021c0,25.207,20.45,45.652,45.665,45.652h186.012
		c25.223,0,45.653-20.445,45.653-45.652V45.657C277.338,20.434,256.899,0,231.677,0z"
        fill={props.color}
      />
    </Svg>
  );
}
export function Pause(props) {
  return (
    <Svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={props.size}
      height={props.size}
      viewBox="0 0 519.479 519.479"
      style="enable-background:new 0 0 519.479 519.479;"
    >
      <Path
        d="M193.441,0h-75.484c-16.897,0-30.6,13.703-30.6,30.6v458.277c0,16.898,13.703,30.602,30.6,30.602h75.484
			c16.897,0,30.6-13.703,30.6-30.602V30.6C224.042,13.703,210.339,0,193.441,0z"
        fill={props.color}
      />
      <Path
        d="M401.521,0h-75.484c-16.896,0-30.6,13.703-30.6,30.6v458.277c0,16.898,13.703,30.602,30.6,30.602h75.484
			c16.896,0,30.6-13.703,30.6-30.602V30.6C432.121,13.703,418.418,0,401.521,0z"
        fill={props.color}
      />
    </Svg>
  );
}

export function Play(props) {
  return (
    <Svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      height={props.size}
      width={props.size}
      viewBox="0 0 477.886 477.886"
      style="enable-background:new 0 0 477.886 477.886;"
    >
      <Path
        d="M476.091,231.332c-1.654-3.318-4.343-6.008-7.662-7.662L24.695,1.804C16.264-2.41,6.013,1.01,1.8,9.442
			c-1.185,2.371-1.801,4.986-1.8,7.637v443.733c-0.004,9.426,7.633,17.07,17.059,17.075c2.651,0.001,5.266-0.615,7.637-1.8
			L468.429,254.22C476.865,250.015,480.295,239.768,476.091,231.332z"
        fill={props.color}
      />
    </Svg>
  );
}

export function CustomMarker(props) {
  return (
    <Svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      style="enable-background:new 0 0 512 512;"
      height={props.size}
      width={props.size}
    >
      <Path
        d="M256,103.278c-39.429,0-71.505,32.077-71.505,71.505c0,39.429,32.077,71.505,71.505,71.505
			c39.428,0,71.505-32.077,71.505-71.505C327.505,135.355,295.429,103.278,256,103.278z"
        fill={props.color}
      />
      <Path
        d="M256,0C158.107,0,78.465,79.642,78.465,177.535c0,40.042,28.089,106.034,83.486,196.143
			c40.502,65.88,81.577,121.48,81.987,122.033L256,512l12.062-16.289c0.41-0.553,41.485-56.153,81.987-122.033
			c55.397-90.109,83.486-156.101,83.486-196.143C433.535,79.642,353.893,0,256,0z M256,276.306
			c-55.98,0-101.522-45.543-101.522-101.522c0-55.98,45.543-101.522,101.522-101.522s101.522,45.543,101.522,101.522
			C357.522,230.763,311.98,276.306,256,276.306z"
        fill={props.color}
      />
    </Svg>
  );
}

export function MarkerCircle(props) {
  return (
    <Svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      style="enable-background:new 0 0 512 512;"
      height={props.size}
      width={props.size}
    >
      <Path
        d="M256,0C115.39,0,0,115.39,0,256s115.39,256,256,256s256-115.39,256-256S396.61,0,256,0z"
        fill={props.color}
      />
    </Svg>
  );
}
export function Calendar(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height={props.height}
      viewBox="0 96 960 960"
      width={props.width}
    >
      <Path
        fill={props.color}
        d="M182.152 981.978q-27.599 0-47.865-20.265-20.265-20.266-20.265-47.865V298.152q0-27.697 20.265-48.033 20.266-20.337 47.865-20.337H245v-25.847q0-14.354 9.964-24.253 9.963-9.9 24.234-9.9 14.697 0 24.782 9.9 10.085 9.899 10.085 24.253v25.847h331.87v-25.847q0-14.354 9.963-24.253 9.964-9.9 24.235-9.9 14.696 0 24.782 9.9Q715 189.581 715 203.935v25.847h62.848q27.697 0 48.033 20.337 20.337 20.336 20.337 48.033v615.696q0 27.599-20.337 47.865-20.336 20.265-48.033 20.265H182.152Zm0-68.13h595.696V486H182.152v427.848Zm297.873-256.413q-17.599 0-29.529-11.905-11.931-11.906-11.931-29.505 0-17.599 11.905-29.529 11.906-11.931 29.505-11.931 17.599 0 29.529 11.905 11.931 11.906 11.931 29.505 0 17.599-11.905 29.529-11.906 11.931-29.505 11.931Zm-160 0q-17.599 0-29.529-11.905-11.931-11.906-11.931-29.505 0-17.599 11.905-29.529 11.906-11.931 29.505-11.931 17.599 0 29.529 11.905 11.931 11.906 11.931 29.505 0 17.599-11.905 29.529-11.906 11.931-29.505 11.931Zm320 0q-17.264 0-29.362-11.905-12.098-11.906-12.098-29.505 0-17.599 12.073-29.529 12.073-11.931 29.456-11.931 17.384 0 29.363 11.905 11.978 11.906 11.978 29.505 0 17.599-11.905 29.529-11.906 11.931-29.505 11.931Zm-160 160q-17.599 0-29.529-12.073-11.931-12.073-11.931-29.456 0-17.384 11.905-29.363 11.906-11.978 29.505-11.978 17.599 0 29.529 11.905 11.931 11.906 11.931 29.505 0 17.264-11.905 29.362-11.906 12.098-29.505 12.098Zm-160 0q-17.599 0-29.529-12.073-11.931-12.073-11.931-29.456 0-17.384 11.905-29.363 11.906-11.978 29.505-11.978 17.599 0 29.529 11.905 11.931 11.906 11.931 29.505 0 17.264-11.905 29.362-11.906 12.098-29.505 12.098Zm320 0q-17.264 0-29.362-12.073-12.098-12.073-12.098-29.456 0-17.384 12.073-29.363 12.073-11.978 29.456-11.978 17.384 0 29.363 11.905 11.978 11.906 11.978 29.505 0 17.264-11.905 29.362-11.906 12.098-29.505 12.098Z"
      />
    </Svg>
  );
}
export function StartTrackIcon(props) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0 22 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19.9029 16.5854L10.7808 29.0246L1.65874 16.5854H1.7001C0.622107 14.927 0 12.9365 0 10.7806C0 4.80975 4.80989 0 10.7806 0C16.7514 0 21.5613 4.80989 21.5613 10.7806C21.561 12.9368 20.9391 14.927 19.9025 16.5854H19.9029ZM10.7808 6.63409C8.50021 6.63409 6.63441 8.49989 6.63441 10.7805C6.63441 13.0611 8.50021 14.9269 10.7808 14.9269C13.0614 14.9269 14.9272 13.0611 14.9272 10.7805C14.9272 8.49989 13.0614 6.63409 10.7808 6.63409ZM10.7808 30.6832C16.7517 30.6832 21.5614 31.4294 21.5614 32.3416C21.5614 33.2538 16.7515 34 10.7808 34C4.81007 34 0.000178509 33.2538 0.000178509 32.3416C0.000178509 31.4294 4.81007 30.6832 10.7808 30.6832Z"
        fill={props.color}
      />
    </Svg>
  );
}

export const SearchIcon = (props) => (
  <Svg
    width={props.height}
    height={props.width}
    fill="none"
    viewBox="0 0 22 22"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="m21.7 19.02-4.284-4.283a1.03 1.03 0 0 0-.73-.3h-.7a8.892 8.892 0 0 0 1.89-5.5C17.876 4 13.876 0 8.938 0 4.001 0 0 4 0 8.937c0 4.936 4 8.936 8.938 8.936a8.896 8.896 0 0 0 5.5-1.89v.7c0 .275.108.537.301.73l4.285 4.284a1.027 1.027 0 0 0 1.456 0l1.216-1.216a1.036 1.036 0 0 0 .005-1.46ZM8.939 14.436a5.497 5.497 0 0 1-5.5-5.5c0-3.037 2.458-5.499 5.5-5.499 3.038 0 5.5 2.458 5.5 5.5 0 3.037-2.457 5.5-5.5 5.5Z"
      fill={props.color}
    />
  </Svg>
);

export const MessageIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    height={props.size}
    viewBox="0 96 960 960"
    width={props.size}
  >
    <Path
      fill={props.color ? props.color : "black"}
      d="M140 896q-24 0-42-18t-18-42V316q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm340-302L140 371v465h680V371L480 594Zm0-60 336-218H145l335 218ZM140 371v-55 520-465Z"
    />
  </Svg>
);

export const Driver = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    viewBox="0 0 489.785 489.785"
    {...props}
    fill={props.color}
  >
    <Path d="m409.772 379.327-81.359-124.975c-5.884-9.054-15.925-13.119-25.987-13.119-2.082 0-6.392.05-11.051.115-.363-.61-.742-1.215-1.355-1.627l-20.492-13.609a6.715 6.715 0 0 0-7.701.182l-16.948 12.508-16.959-12.508a6.745 6.745 0 0 0-7.72-.182l-20.455 13.609c-.578.377-.945.907-1.282 1.461-4.828.031-9.327.057-11.222.057-10.016 0-20.011 4.119-25.859 13.113l-81.36 124.975c-8.65 13.267-5.149 31.008 7.896 39.992l18.06 12.449c10.887-25.926 28.868-48.094 51.45-64.279l4.657-7.162v3.861a149.767 149.767 0 0 1 54.885-22.234c-5.926-13.152-10.899-28.819-14.546-43.586-4.249-17.232-6.741-33.201-6.741-42.245 0-3.351.433-6.579 1.09-9.727l14.8 48.975a6.694 6.694 0 0 0 6.425 4.776 6.738 6.738 0 0 0 5.818-3.34l11.538-19.873 3.246 3.235c-7.768 10.276-10.82 39.199-12.005 60.314 5.994-.734 12.066-1.222 18.254-1.222 6.201 0 12.292.497 18.304 1.23-1.186-21.114-4.237-50.037-12.024-60.322l3.246-3.255 11.574 19.892a6.695 6.695 0 0 0 6.584 3.294 6.746 6.746 0 0 0 5.659-4.73l14.791-48.872c.634 3.116 1.051 6.313 1.051 9.624 0 16.806-8.425 57.342-21.276 85.831a149.656 149.656 0 0 1 54.953 22.291v-3.899l4.735 7.256c22.504 16.193 40.436 38.324 51.293 64.206l18.139-12.488c13.041-8.984 16.525-26.725 7.894-39.992zm-189.81-102.642-8.613-28.53 12.388-8.24 12.322 9.088-16.097 27.682zm49.821 0-16.079-27.683 12.31-9.088 12.401 8.24-8.632 28.531z" />
    <Path d="m202.716 424.721 14.705 19.349a53.062 53.062 0 0 1 27.427-7.607c9.848 0 19.313 2.692 27.464 7.615l14.705-19.363c-11.465-10.799-26.346-16.721-42.15-16.721-15.812 0-30.711 5.931-42.151 16.727zM176.693 160.576c.499 25.456 14.96 47.266 36.03 58.591 9.622 5.18 20.473 8.384 32.174 8.384 11.683 0 22.503-3.198 32.114-8.368 21.063-11.311 35.579-33.117 36.06-58.582-17.379 12.075-41.896 19.923-68.174 19.923s-50.801-7.848-68.204-19.948zM174.741 100.132l-.225 20.205c.037 15.991 31.524 36.82 70.38 36.82 38.855 0 70.314-20.829 70.331-36.82l-.207-20.195c10.224-2.662 18.158-6.617 23.239-12.301 3.981-4.434 6.267-9.902 6.267-16.783C344.528 39.883 299.879 0 244.897 0c-55.031 0-99.631 39.883-99.631 71.058 0 6.881 2.273 12.34 6.236 16.783 5.083 5.683 13.027 9.638 23.239 12.291z" />
    <Path d="M244.848 356.925c-73.255 0-132.858 59.605-132.858 132.86h33.47v-.192c1.088-6.557 6.711-11.334 13.313-11.334.115 0 .243.01.37.01l51.707 1.341c-.973 3.247-1.648 6.619-1.648 10.176h71.322c0-3.557-.669-6.929-1.66-10.176l51.724-1.341c.109 0 .219-.01.353-.01 6.595 0 12.243 4.777 13.324 11.334v.192h33.44c.001-73.255-59.583-132.86-132.857-132.86zm57.353 76.985-27.562 36.317c-6.389-9.687-17.325-16.104-29.792-16.104-12.437 0-23.385 6.411-29.762 16.098l-27.555-36.3c-4.699-6.194-4.11-14.923 1.392-20.424 15.452-15.443 35.689-23.166 55.943-23.166 20.249 0 40.484 7.723 55.961 23.179 5.496 5.497 6.075 14.209 1.375 20.4z" />
  </Svg>
);


export const BusAttendant = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    height={props.size}
    viewBox="0 96 960 960"
    width={props.size}
  >
    <Path
      fill={props.color ? props.color : "black"}
      d="M202.87 944.131q-37.783 0-64.392-26.609-26.609-26.609-26.609-64.392V298.87q0-37.783 26.609-64.392 26.609-26.609 64.392-26.609h160.108q15.674-36.239 46.87-58.119 31.195-21.881 70.152-21.881t70.152 21.881q31.196 21.88 46.87 58.119H757.13q37.783 0 64.392 26.609 26.609 26.609 26.609 64.392v554.26q0 37.783-26.609 64.392-26.609 26.609-64.392 26.609H202.87ZM480 267.913q13.957 0 22.935-8.978 8.978-8.978 8.978-22.935 0-13.957-8.978-22.935-8.978-8.978-22.935-8.978-13.957 0-22.935 8.978-8.978 8.978-8.978 22.935 0 13.957 8.978 22.935 8.978 8.978 22.935 8.978ZM202.87 802.348q54-51.805 124.065-81.229Q397 691.696 480 691.696t153.065 29.184q70.065 29.185 124.065 80.989V298.87H202.87v503.478ZM480 620.783q58.957 0 100.435-41.479 41.478-41.478 41.478-100.434 0-58.957-41.478-100.316Q538.957 337.196 480 337.196t-100.435 41.358q-41.478 41.359-41.478 100.316 0 58.956 41.478 100.434Q421.043 620.783 480 620.783ZM280 853.13h400v-8.326q-42-35-93-52.261-51-17.26-107-17.26t-107 17.26q-51 17.261-93 52.261v8.326Zm199.944-315.934q-24.227 0-41.129-17.008-16.902-17.008-16.902-41.304 0-24.297 16.959-41.199 16.958-16.902 41.184-16.902 24.227 0 41.129 16.958 16.902 16.959 16.902 41.185 0 24.226-16.959 41.248-16.958 17.022-41.184 17.022Zm.056 13.413Z"
    />
  </Svg>
);

export const Dots = (props) => (
  <Svg
    width="5"
    height="23"
    viewBox="0 0 5 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Circle cx="2.5" cy="2.5" r="2.5" fill="#505050" />
    <Circle cx="2.5" cy="11.5" r="2.5" fill="#505050" />
    <Circle cx="2.5" cy="20.5" r="2.5" fill="#505050" />
  </Svg>
);