import React from 'react';

const LockIcon: React.FC = () => {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="80"
        height="80"
        rx="19"
        fill="url(#paint0_linear_13406_23132)"
      />
      <g filter="url(#filter0_ii_13406_23132)">
        <path
          d="M28.5 54.2123V40.4692C28.5 38.0782 29.5056 36.8156 31.5167 36.6816V32.6257C31.5167 29.4301 32.3882 26.8603 34.1313 24.9162C35.8743 22.9721 38.1536 22 40.9692 22C43.7849 22 46.0642 22.9721 47.8073 24.9162C49.5503 26.8603 50.4218 29.4301 50.4218 32.6257V36.6816C52.4553 36.8156 53.472 38.0782 53.472 40.4692V54.2123C53.472 56.7374 52.2877 58 49.9189 58H32.0195C29.6732 58 28.5 56.7374 28.5 54.2123ZM35.1368 36.648H46.8016V32.2234C46.8016 30.2123 46.2709 28.5866 45.2095 27.3463C44.148 26.1061 42.7346 25.486 40.9692 25.486C39.2262 25.486 37.8184 26.1061 36.7458 27.3463C35.6731 28.5866 35.1368 30.2123 35.1368 32.2234V36.648Z"
          fill="url(#paint1_linear_13406_23132)"
        />
      </g>
      <defs>
        <filter
          id="filter0_ii_13406_23132"
          x="27.5"
          y="21"
          width="26.2217"
          height="37.25"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-1" dy="-1" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_13406_23132"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="0.25" dy="0.25" />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_innerShadow_13406_23132"
            result="effect2_innerShadow_13406_23132"
          />
        </filter>
        <linearGradient
          id="paint0_linear_13406_23132"
          x1="0"
          y1="0"
          x2="80"
          y2="80"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3F3E43" />
          <stop offset="1" stopColor="#0C0B10" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_13406_23132"
          x1="34.5"
          y1="32.5"
          x2="50.5"
          y2="55.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#DEDEE0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default LockIcon;
