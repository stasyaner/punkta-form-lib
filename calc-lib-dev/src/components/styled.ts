import styled from "@emotion/styled";

export const Root = styled.div`
    width: 300px;
    height: 510px;
    overflow: hidden;
    position: relative;
`;

export const BackgroundCircle = styled.div`
    width: 372px;
    height: 372px;
    position: absolute;
    top: -162px;
    left: -36px;
    z-index: -1;
    border-radius: 50%;
    background-color: #f5f5f5;
`;

export const Container = styled.div`
    padding: 12px 25px 35px;
`;

export const Header = styled.div`
    text-align: center;
`;

export const Slogan = styled.h3`
    text-transform: uppercase;
    color: #0a2c48;
    font-weight: bold;
    font-size: 16px;
    line-height: 21px;
    letter-spacing: 0;
    font-family: "Red Hat Display";
    margin-top: 25px;
`;
