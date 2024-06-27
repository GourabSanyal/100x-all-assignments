import { useEffect } from "react";
import {useRouter} from 'next/navigation';

function ForcedReload(){
    const router = useRouter()

    useEffect(() => {
        router.refresh()
    },[])

    return <></>
}

export default ForcedReload;
