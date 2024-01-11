import styled from "styled-components";

interface ISpacer {
  width?: number;
  height?: number;
}

const StyledSpacer = styled.div<ISpacer>`
  width: ${(props) => props.width ?? 0}px;
  height: ${(props) => props.height ?? 0}px;
`;

function Spacer(props: ISpacer) {
  return <StyledSpacer {...props} />;
}

export default Spacer;
