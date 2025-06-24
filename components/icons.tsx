import { clsx } from 'clsx';
import type { LucideProps } from 'lucide-react';
import { FiBarChart } from 'react-icons/fi';

const arrowRotationMap = {
  up: 'rotate-180',
  right: '-rotate-90',
  down: 'rotate-0',
  left: 'rotate-90',
  'top-right': '-rotate-135',
};

interface ArrowIconProps {
  direction: 'up' | 'right' | 'down' | 'left' | 'top-right';
  size?: number;
  className?: string;
}

type SVGIconProps = {
  size?: number;
  stroke?: string;
  fill?: string;
  strokeWidth?: number;
  className?: string;
  children?: React.ReactNode;
  viewBox?: string;
};

const _SVGIcon: React.FC<SVGIconProps> = ({
  size = 20,
  stroke = 'currentColor',
  fill = 'currentColor',
  strokeWidth = 0.25,
  className,
  children,
  viewBox,
}) => {
  const intrinsicContentDimension = 20;
  const defaultViewBox = `0 0 ${intrinsicContentDimension} ${intrinsicContentDimension}`;

  return (
    <svg
      className={className}
      fill={fill}
      height={size}
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      viewBox={viewBox || defaultViewBox}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
};

export function ArrowIcon({
  direction,
  size = 32,
  className,
  ...props
}: ArrowIconProps) {
  return (
    <svg
      className={clsx(className, 'transform', arrowRotationMap[direction])}
      fill="none"
      height={size}
      viewBox="0 0 32 32"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M15.101 5.5V23.1094L9.40108 17.4095L8.14807 18.6619L15.9862 26.5L23.852 18.6342L22.5996 17.3817L16.8725 23.1094V5.5H15.101Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}

export const Icons = {
  google: ({ ...props }: LucideProps) => (
    <svg
      viewBox="0 0 186.69 190.5"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g transform="translate(1184.583 765.171)">
        <path
          clipPath="none"
          d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z"
          fill="#4285f4"
          mask="none"
        />
        <path
          clipPath="none"
          d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z"
          fill="#34a853"
          mask="none"
        />
        <path
          clipPath="none"
          d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z"
          fill="#fbbc05"
          mask="none"
        />
        <path
          clipPath="none"
          d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z"
          fill="#ea4335"
          mask="none"
        />
      </g>
    </svg>
  ),
  Overview: FiBarChart,
};
