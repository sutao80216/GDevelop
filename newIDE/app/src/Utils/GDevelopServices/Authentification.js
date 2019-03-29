// @flow
import * as firebase from 'firebase';
import { GDevelopFirebaseConfig } from './ApiConfigs';

export type Profile = {
  uid: string, // This represents the userId
  providerId: string,
  email: ?string,
  emailVerified: boolean,
};

export type LoginForm = {
  email: string,
  password: string,
};

export type LoginError = {
  code:
    | 'auth/invalid-email'
    | 'auth/user-disabled'
    | 'auth/user-not-found'
    | 'auth/wrong-password'
    | 'auth/email-already-in-use'
    | 'auth/operation-not-allowed'
    | 'auth/weak-password',
};

export default class Authentification {
  user = null;
  _onUserChangeCb: ?() => void = null;

  constructor() {
    firebase.initializeApp(GDevelopFirebaseConfig);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }

      if (this._onUserChangeCb) this._onUserChangeCb();
    });
  }

  onUserChange = (cb: () => void) => {
    this._onUserChangeCb = cb;
  };

  createAccount = (form: LoginForm): Promise<void> => {
    return (
      firebase
        .auth()
        // $FlowFixMe - Outdated definitions?
        .createUserAndRetrieveDataWithEmailAndPassword(
          form.email,
          form.password
        )
        .then(userCredentials => {
          this.user = userCredentials.user;
        })
        .catch(error => {
          console.error('Error while creating account:', error);
          throw error;
        })
    );
  };

  login = (form: LoginForm): Promise<void> => {
    return (
      firebase
        .auth()
        // $FlowFixMe - Outdated definitions?
        .signInAndRetrieveDataWithEmailAndPassword(form.email, form.password)
        .then(userCredentials => {
          this.user = userCredentials.user;
        })
        .catch(error => {
          console.error('Error while login:', error);
          throw error;
        })
    );
  };

  forgotPassword = (form: LoginForm): Promise<void> => {
    return firebase.auth().sendPasswordResetEmail(form.email);
  };

  getUserProfile = (cb: (any, ?Profile) => void) => {
    if (!this.isAuthenticated()) return cb({ unauthenticated: true });

    cb(null, this.user);
  };

  getUserProfileSync = (): ?Profile => {
    return this.user;
  };

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('Logout successful');
      })
      .catch(error => {
        console.log('An error happened during logout', error);
      });
  };

  getAuthorizationHeader = (): Promise<string> => {
    if (!this.user)
      return Promise.reject(new Error('User is not authenticated'));

    return this.user.getIdToken().then(token => `Bearer ${token}`);
  };

  isAuthenticated = (): boolean => {
    return !!this.user;
  };
}
