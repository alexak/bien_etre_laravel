
import Auth from '@/Components/3_cell/Auth';

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {

    return (
        <Auth authform='login'/>
    );
}
