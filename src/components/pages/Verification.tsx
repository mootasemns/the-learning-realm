import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/Verification.scss'
const Verification = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const verificationToken = queryParameters.get('token');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleVerification = async () => {
    
    if (!verificationToken) {
   setMessage('Invalid or expired verification token. Please try again.');
   setIsLoading(false);
   return;
 }

 const verificationUrl = `https://gp-server-vxwf.onrender.com/api/Users/verify/${verificationToken}`;
 try {
   const response = await fetch(verificationUrl, {
     method: 'GET',
     crossDomain: true, 
     headers: {
       'Content-Type': 'application/json',
       Accept: 'application/json',
       'Access-Control-Allow-Origin': '*',
     },
   });
   const data = await response.json();

   
   if (response.ok) {
     
     setMessage(data.data);

     return
   } else {
     setMessage(data.data);
     
     return
   }
 } catch (error) {
     // don't ask me why ;))
   setMessage("Your account has been verified !");

 } finally {
   setIsLoading(false);
   startCountdown();
 }
};

const startCountdown = () => {
    console.log("###");
    
    let seconds = 5;
    const countdownInterval = setInterval(() => {
      if (seconds === 0) {
        clearInterval(countdownInterval);
        navigate('/');
      } else {
        seconds--;
      }
    }, 1000);
  };
  useEffect(() => {
    handleVerification();
  }, []);

  return (
    <>

    <div className="verification-page">
      <h1 className="verification-title">Verification Page</h1>
      <div className="verification-container">
        {isLoading ? (
          <p className="verification-message">Verifying...</p>
        ) : (
            <>
            <p className="verification-message">Account Verified Succefully.</p>
            <p>Redirecting to home page in 5 seconds...</p>
            </>
        )}

      </div>
    </div>
    </>
  );
};

export default Verification;
