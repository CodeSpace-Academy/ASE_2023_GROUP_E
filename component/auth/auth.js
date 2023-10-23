import { useState } from 'react';
import classes from './auth.module.css'
import { BlueButton, LinkButton } from '../Button/button';
import Image from 'next/image';
import Link from 'next/link';

export default  function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  return (
    <section className={classes.auth}>
        <div>
            <h3>{isLogin ? 'Login' : 'Sign Up'}</h3>
            <form>
                {isLogin ? '' : <div className={classes.control}>
                    <label htmlFor='name'>Username</label>
                    <input type='name' id='name' required />
                </div> }

                <div className={classes.control}>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' required />
                </div>

                <div className={classes.control}>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' required />
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