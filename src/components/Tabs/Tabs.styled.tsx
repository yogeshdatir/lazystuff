import styled from '@emotion/styled';

export const TabListContainer = styled.div`
  display: flex;

  // start - for selected tab transparent bottom border
  position: relative;
  top: 1px;
  padding-bottom: 1px;
  // end - for selected tab transparent bottom border
`;

export const TabButton = styled.button`
  display: flex;
  gap: 0.75rem;
  padding: 0.25rem 0.75rem;
  background: #fff;
  border-bottom: 1px solid gray;

  // start - for selected tab transparent bottom border
  position: relative;
  top: 1px;
  // end - for selected tab transparent bottom border

  &[aria-selected='true'] {
    border: 1px solid gray;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;

    // start - for selected tab transparent bottom border
    border-bottom: none;
    // end - for selected tab transparent bottom border
  }
`;

export const TabPanelContainer = styled.div`
  display: flex;
  padding: 0.25rem 0.75rem;
  border-top: 1px solid gray;
`;
