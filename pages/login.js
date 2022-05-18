import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { userService } from '../services/UserService';

export default Login;

function Login() {
    const router = useRouter();

    useEffect(() => {
        // redirect to home if already logged in
        if (userService.userValue) {
            router.push('/');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function onSubmit({ username, password }) {
        return userService.login(username, password)
            .then(() => {
                // get return url from query parameters or default to '/'
                const returnUrl = router.query.returnUrl || '/';
                router.push(returnUrl);
            })
            .catch(error => {
                setError('apiError', { message: error });
            });
    }

    return (
        <div className="col-md-6 offset-md-3 mt-5">
            <div className="alert alert-info">
                Username: test<br />
                Password: test
            </div>
            <div className="card">
                <h4 className="card-header">Next.js Basic Authentication Example</h4>
                <div className="card-body">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input name="username" type="text"  />
                           
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input name="password" type="password" />
                        </div>
                        <button className="btn btn-primary">
                            
                            Login
                        </button>
                      
                    </form>
                </div>
            </div>
        </div>
    );
}