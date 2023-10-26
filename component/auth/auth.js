import { useEffect, useRef, useState } from 'react';
import classes from './auth.module.css'
import { BlueButton, LinkButton } from '../Button/button';
import Image from 'next/image';
import Link from 'next/link';
import { addItem } from '@/database/addToDatabase';
import {signIn, useSession} from 'next-auth/react'
import { useRouter } from 'next/router';

export default  function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter()

  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  
  async function submitHandler(e){
    e.preventDefault()

    let enteredUsername;
    const enteredEmail = emailRef.current.value
    const enteredPassword = passwordRef.current.value

    if(!isLogin){
        enteredUsername = usernameRef.current.value;
      }
  

    if(isLogin){

        const result = await signIn('credentials', {
            redirect: false,
            email: enteredEmail.toLowerCase(),
            password: enteredPassword,
          });
        console.log('logged in')
        
    }else{
        try{
            console.log('spinning')
            const results = await addItem('/api/auth/signUp', {username : enteredUsername.toLowerCase(), email : enteredEmail.toLowerCase(), password: enteredPassword})
        
            if(results.message === `Welcome ${enteredUsername.toLowerCase()}`){
                console.log('signed up')
            }else{
                console.log(results.message)
            }
        }catch(error){
            console.log('error signing up', error.message)
        }
    }
  }

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  return (
    <section className={classes.auth}>
        <div>
            <h3>{isLogin ? 'Login' : 'Sign Up'}</h3>
            <form onSubmit={submitHandler}>
                {isLogin ? '' : <div className={classes.control}>
                    <label htmlFor='name'>Username</label>
                    <input ref={usernameRef} type='name' id='name' required />
                </div> }

                <div className={classes.control}>
                    <label htmlFor='email'>Email</label>
                    <input ref={emailRef} type='email' id='email' required />
                </div>

                <div className={classes.control}>
                    <label htmlFor='password'>Password</label>
                    <input ref={passwordRef} type='password' id='password' required />
                </div>

                <div className={classes.actions}>
                    <div>
                        <BlueButton  text={isLogin ? 'Login' : 'Create Account'}/>
                    </div>
                    <div>
                        <Link onClick={switchAuthModeHandler}  href={`/profile/auth/${isLogin ? 'signup' : 'login'}`}>{isLogin ? 'Get an account' : 'Have an accout'}</Link>
                    </div>
                </div>
            </form>
        </div>

        <div>
            <Image src={'https://images.pexels.com/photos/4126147/pexels-photo-4126147.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} className={classes.img} alt={''} width={200} height={200} />
        </div>
    </section>
  );
}