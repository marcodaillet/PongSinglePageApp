import Navbar from "react-bootstrap/Navbar";

type UserBarProps = {
    UserName: string,
    Avatar: string,
}

export const UserBar = (props: UserBarProps) => {
    return (
        <Navbar bg="dark" variant="dark" className="UserBar">
            <Navbar.Brand>
                <img src={props.Avatar} width="30" height="30" alt="Avatar"></img>
                {props.UserName} 
            </Navbar.Brand>
        </Navbar>
    );
}