import Link from 'next/link';
import Layout from '../components/layout/layout.component';
import Signin from '../components/auth/signin.component';

const SigninPage = () => {
  return(
    <Layout>
      <Link href='/'>
        <a>home</a>
      </Link>
      <h2 className='text-center pt-4 pb-4'>Sign in page</h2>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <Signin />
        </div>
      </div>
    </Layout>
  ) 
}

export default SigninPage;