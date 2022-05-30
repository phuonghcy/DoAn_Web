import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ role, redirectPath = '/' }) {
    if (role < 1) {
        return  <Navigate to={redirectPath} replace />
    }
    return <Outlet />
}

export default ProtectedRoute