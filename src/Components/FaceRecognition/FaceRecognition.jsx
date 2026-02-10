import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes, onImageLoad }) => {
    if (!imageUrl) return null;

    return (
        <div className="center ma">
        <div className="mt2" style={{ position: 'relative', display: 'inline-block' }}>
            <img
            id="inputimage"
            src={imageUrl}
            alt=""
            width="500"
            onLoad={onImageLoad}
            />
            {boxes?.map((box, i) => (
            <div
                key={i}
                className="bounding-box"
                style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol
                }}
            />
            ))}
        </div>
        </div>
    );
};

export default FaceRecognition;
