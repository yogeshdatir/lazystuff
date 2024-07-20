import styled from '@emotion/styled';

export const SkeletonContainer = styled.div`
  .skeleton {
    background: #eee;
    background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
    border-radius: 5px;
    background-size: 200% 100%;
    animation: 2s shine linear infinite;
  }

  @keyframes shine {
    to {
      background-position-x: -200%;
    }
  }
`;
