
const Register = ({ open, children, onClose}) => {

    if (!open) return null;

    return (
        
            <button onClick={onClose}> Close {children}</button>
            
        
    )
}

export default Register