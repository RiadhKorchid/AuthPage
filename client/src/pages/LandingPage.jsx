import { Button } from "@mui/material";
import { Link } from "react-router-dom";
function LandingPage() {
    return (<> 
    <Link to={"/auth"}>
        <Button variant="contained" > Login </Button>
    </Link>
    </>)
}

export default LandingPage;