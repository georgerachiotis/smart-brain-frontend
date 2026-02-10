import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt 
                tiltMaxAngleX={20} 
                tiltMaxAngleY={20}
                transitionSpeed={800}
                perspective={1200}
                scale={1.02}
            >
                <div className='Tilt pa3 br2 shadow-2 flex items-center justify-center' style={{ height: '150px', width: '150px' }}>
                <img style={{paddingTop: '5px'}} src={brain} alt="brain" />
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;