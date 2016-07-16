import React from 'react';
import Stream from './presenter';
import { CLIENT_ID } from '../../constants/auth';
import { auth } from '../../api/auth';
import userStore from '../../stores/userStore';
import trackStore from '../../stores/trackStore';

function StreamContainer() {
  return <Stream userStore={userStore} trackStore={trackStore} clientId={CLIENT_ID} onAuth={auth} />;
}

export default StreamContainer;
