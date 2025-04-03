'use client'
import {useRouter} from 'next/navigation'

export default function DetailLink(){
    let router=useRouter();
    return(
        <button style={{border:"0",marginLeft:"10px"}} onClick={()=>{router.push('/Commu/detail/dsds')}}>v</button>
    )

}