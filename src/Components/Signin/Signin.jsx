import { useState } from 'react';

const Signin = ({ onRouteChange, loadUser }) => {
    const [email, signInEmail] = useState('');
    const [password, signInPassword] = useState('');

    const onEmailChange = (event) => {
        signInEmail(event.target.value);
    };

    const onPasswordChange = (event) => {
        signInPassword(event.target.value);
    };

    const onSubmitSignIn = (e) => {
        e.preventDefault();

        fetch('https://smart-brain-backend-0wo0.onrender.com/signin', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
        })
        .then((response) => response.json())
        .then((user) => {
            if (user.id) {
            loadUser(user);
            onRouteChange('home');
            }
        })
        .catch(console.log);
    };

    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
            <div className="measure">
            <form onSubmit={onSubmitSignIn}>
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Sign In</legend>

                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">
                    Email
                    </label>
                    <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="email"
                    name="email-address"
                    id="email-address"
                    onChange={onEmailChange}
                    value={email}
                    />
                </div>

                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">
                    Password
                    </label>
                    <input
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="password"
                    name="password"
                    id="password"
                    onChange={onPasswordChange}
                    value={password}
                    />
                </div>
                </fieldset>

                <div>
                <input
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                    type="submit"
                    value="Sign in"
                />
                </div>
            </form>

            <div className="lh-copy mt3">
                <p
                onClick={() => onRouteChange('register')}
                className="f6 link dim black db pointer"
                >
                Register
                </p>
            </div>
            </div>
        </main>
        </article>
    );
};

export default Signin;
