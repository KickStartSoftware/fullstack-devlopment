import { LinkProps } from 'next/link';

export interface IStyledLinkProps extends LinkProps {
  classname?: string;
  isNav?: boolean;
  children?: React.ReactNode;
}

export type StyledLinkType = React.ComponentType<IStyledLinkProps>;
