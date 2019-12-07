import Link from 'next/link';
import Layout from '../components/layout/layout.component';
import Signup from '../components/auth/signup.component';

const SignupPage = () => {
  return(
    <Layout>
      <Link href='/'>
        <a>home</a>
      </Link>
      <h2 className='text-center pt-4 pb-4'>Sign up page</h2>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <Signup />
        </div>
      </div>
    </Layout>
  ) 
}

export default SignupPage;