import { useState } from 'react';
import ParticlesBg from 'particles-bg'
import Navigation from './Components/Navigation/Navigation';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import './App.css'

const initialState = {
  input: '',
  imageUrl: null,
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

function App() {

  const [input, setInput] = useState(initialState.input);
  const [imageUrl, setImageUrl] = useState(initialState.imageUrl);
  const [boxes, setBoxes] = useState([]);
  const [route, setRoute] = useState(initialState.route);
  const [isSignedIn, setIsSignedIn] = useState(initialState.isSignedIn);
  const [user, setUser] = useState(initialState.user);
  const [faceRatioBoxes, setFaceRatioBoxes] = useState([]);

  const resetState = () => {
  setInput(initialState.input);
  setImageUrl(initialState.imageUrl);
  setBoxes([]);
  setFaceRatioBoxes([]);
  setUser(initialState.user);
  setRoute(initialState.route);
  setIsSignedIn(initialState.isSignedIn);
};

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    })
  }

  const displayFaceBoxes = (newBoxes) => {
    setBoxes(newBoxes);
  }

  const calculateBoxesFromRatios = (ratios, image) => {
    const width = image.width;
    const height = image.height;
    return ratios.map((ratio) => ({
      leftCol: ratio.left_col * width,
      topRow: ratio.top_row * height,
      rightCol: width - (ratio.right_col * width),
      bottomRow: height - (ratio.bottom_row * height),
    }));
  };
  
  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onPictureSubmit = () => {
    if (!input.trim()) return;
    setImageUrl(input);
    setBoxes([]); 
    fetch('http://localhost:3000/clarifai', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl: input })
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('FULL clarifai response:', response);
        const regions = response?.outputs?.[0]?.data?.regions;
        if (!regions || regions.length === 0) {
          setFaceRatioBoxes([]);
          setBoxes([]);
          return;
        }

        const ratios = regions.map((r) => r.region_info.bounding_box);
        setFaceRatioBoxes(ratios);
        if (user.id) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: user.id })
          })
            .then((res) => res.json())
            .then((count) => {
              setUser((prevUser) => ({
                ...prevUser,
                entries: count
              }));
            })
            .catch(console.log);
        }
        const image = document.getElementById('inputimage');
        if (image && image.width && image.height) {
          const newBoxes = calculateBoxesFromRatios(ratios, image);
          displayFaceBoxes(newBoxes);
        }
      })
      .catch((error) => console.log('error', error));
  };

  const onRouteChange = (route) => {
  if (route === 'signout') {
    resetState();            
    return;
  } else if (route === 'home') {
    setIsSignedIn(true);
  }
  setRoute(route);
};

  const onImageLoad = () => {
  if (!faceRatioBoxes.length) return;

  const image = document.getElementById('inputimage');
  if (!image) return;

  const newBoxes = calculateBoxesFromRatios(faceRatioBoxes, image);
  displayFaceBoxes(newBoxes);
};

  return (
      <div className="App">
        <ParticlesBg color="#ffffff" type="cobweb" bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange}/>
        {route === 'home'
        ? <div>
            <Logo />
            <Rank name={user.name} entries={user.entries}/>
            <ImageLinkForm 
            onInputChange={onInputChange} 
            onPictureSubmit={onPictureSubmit} 
            />
            <FaceRecognition imageUrl={imageUrl} boxes={boxes} onImageLoad={onImageLoad} />
          </div>
        : route === 'signin'
          ? <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
          : <Register loadUser={loadUser} onRouteChange={onRouteChange} />
        } 
      </div>
  )
}

export default App
