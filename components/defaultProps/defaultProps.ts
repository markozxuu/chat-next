import { ComponentType } from 'react';

const withDefaultProps = <P extends object, DP extends Partial<P> = Partial<P>>(
  defaultProps: DP,
  Cmp: ComponentType<P>
): object => {
  type RequiredProps = Omit<P, keyof DP>;
  type Props = Partial<DP> & Required<RequiredProps>;
  Cmp.defaultProps = defaultProps;
  return (Cmp as ComponentType<any>) as ComponentType<Props>;
};

export default withDefaultProps;
