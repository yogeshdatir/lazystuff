import { SkeletonContainer } from './SkeletonLoader.styled';

type Props = {};

const SkeletonLoader = (props: Props) => {
  return (
    <SkeletonContainer>
      <div className="skeleton" style={{ width: '100px', height: '30px' }} />
    </SkeletonContainer>
  );
};

export default SkeletonLoader;
