import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInFormContainer } from '../../components/SignInForm';
// ...

describe('SignIn', () => {
    describe('SignInContainer', () => {
        it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
            const signIn = jest.fn()
            render(<SignInFormContainer signIn={signIn} />)
            fireEvent.changeText(screen.getByPlaceholderText('Name'), 'matti')
            fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password')
            fireEvent.press(screen.getByText('Sign in'))
            screen.debug()
            await waitFor(() => {
                expect(signIn).toHaveBeenCalledTimes(1)
                expect(signIn.mock.calls[0][0]).toEqual({
                    username: 'matti',
                    password: 'password'
                })
            });
        });
    });
});