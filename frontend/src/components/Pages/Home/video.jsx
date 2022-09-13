import styled from 'styled-components';
import Video from '../../../videos/video.mp4'

const VideoBg = styled.video`
    position: absolute;
    height: 125%;
    margin-bottom: 70px;
`;

export const CustomVideo = () => {
    return (
        <VideoBg autoPlay loop muted src={Video} type='video/mp4'></VideoBg>
    )
}
