import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

const videoBackground = {
    height: "100%",
    width: "100%",
    float: "left",
    top: "0",
    padding: "none",
    position: "fixed",
    zIndex: -999
}

class BackgroundVideo extends Component {
    static propTypes = {
        videos: React.PropTypes.arrayOf(PropTypes.shape({
            src: PropTypes.string,
            type: PropTypes.string,
        })),
        children: PropTypes.node,
        preload: PropTypes.bool,
        loop: PropTypes.bool,
        autoPlay: PropTypes.bool,
        className: PropTypes.string,
        overlayClassName: PropTypes.string,
        videoId: PropTypes.string,
        overlay: PropTypes.bool,
        poster: PropTypes.string,
        onClick: PropTypes.func,
    };

    static defaultProps = {
        videos: [],
        preload: true,
        loop: false,
        autoPlay: true,
        className: '',
        overlayClassName: '',
        videoId: `video-#{Date.now()}`,
        overlay: true,
    };

    componentWillUnmount() {
        const videoElement = document.getElementById(this.props.videoId);

        if (videoElement) {
            videoElement.pause();
            videoElement.src = '';
            videoElement.load();
        }
    }

    render() {
        const videos = this.props.videos.map((video, index) =>
            <source key={index} src={video.src} type={video.type} />);

        const videoProps = {
            preload: this.props.preload,
            loop: this.props.loop,
            autoPlay: this.props.autoPlay,
            poster: this.props.poster,
        };

        const videoClassNames = classNames({
            'video-container': true,
            [this.props.className]: !!(this.props.className),
        });

        const videoOverlayClassNames = classNames({
            'video-overlay': true,
            [this.props.overlayClassName]: !!(this.props.overlayClassName),
        });

        const overlayElement = (this.props.overlay) ? this.props.overlayElement : null;
        {/*<div className={videoOverlayClassNames} />*/}
        return (
            // className={videoClassNames}
            <div style={videoBackground} onClick={this.props.onClick}>
                <video id={this.props.videoId} className="video-background" {...videoProps}>
                    {videos}
                </video>
                {overlayElement}
                <div className="video-content">{this.props.children}</div>
            </div>
        );
    }
}

export default BackgroundVideo;