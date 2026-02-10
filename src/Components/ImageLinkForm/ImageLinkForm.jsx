import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
    const onSubmit = (e) => {
        e.preventDefault();
        onPictureSubmit();
    };

    return (
        <div>
        <p className="f3">
            {'This Magic Brain will detect faces in your pictures. Give it a try!'}
        </p>

        <div className="center">
            <form className="center form pa4 br3 shadow-5" onSubmit={onSubmit}>
            <input
                className="f4 pa3 w-70 center"
                type="text"
                onChange={onInputChange}
            />

            <button
                type="submit"
                className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            >
                Detect
            </button>
            </form>
        </div>
        </div>
    );
};

export default ImageLinkForm;
