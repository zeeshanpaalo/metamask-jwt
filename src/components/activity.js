import { useWeb3 } from "../web3context";

function Activity (){
    const { web3, authToken } = useWeb3();
    console.log("----------")
    console.log(authToken);
    return <h1>Activity</h1>
}

export default Activity