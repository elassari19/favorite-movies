import React from 'react';
import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';

const Variants = cva('text-md', {
  variants: {
    variant: {
      default: 'font-regular text-body-regular',
      caption: 'font-regular text-caption',
      xs: 'font-regular text-body-xsmall',
      sm: 'font-regular text-body-small',
      p: 'text-md',
      lg: 'font-regular text-body-large',
      h6: 'font-semibold text-heading-6',
      h5: 'font-semibold text-heading-5',
      h4: 'font-semibold text-heading-4',
      h3: 'font-semibold text-heading-3',
      h2: 'font-semibold text-heading-2',
      h1: 'font-semibold text-heading-1',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
interface IProps
  extends React.HTMLProps<HTMLElement>,
    VariantProps<typeof Variants> {
  heading?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  ellipsis?: boolean;
  center?: boolean;
}

const Typography = ({
  variant,
  heading = 'p',
  ellipsis,
  center,
  children,
  className,
}: IProps) => {
  return React.createElement(
    heading,
    {
      className: cn(
        `font-montserrat
        ${ellipsis && 'overflow-hidden text-ellipsis whitespace-nowrap'}
        ${center && 'w-full text-center'}
      `,
        Variants({ variant }),
        className
      ),
    },
    children
  );
};

export default Typography;
