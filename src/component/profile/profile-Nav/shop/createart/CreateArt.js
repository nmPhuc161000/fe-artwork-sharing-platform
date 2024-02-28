import React from 'react';
import './CreatrArt.css';
import { Icon } from 'react-materialize';

export default function CreateArt() {
  return (
    <div className='createart'>
        <div className='cartcreate'>
            <div><Icon>add</Icon></div>
            <span>Create a new commissions</span>
            <p>Offer custom creations directly to deviants who love your style.</p>
        </div>
    </div>
  )
}
