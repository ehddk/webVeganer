import { connectDB } from "@/util/database";
import { ObjectId } from 'mongodb';

export default async function Delete({props}){
    const db = (await connectDB).db("vegan");
    const find = await db.collection('post').findOne({_id:new ObjectId(props.params.id)})

    const btn1={
        fontSize:"15px",
        color:"white",
        backgroundColor:"green",
        borderRadius:"5px",
        border:"0",
        padding:"5px",
        width:"60px",
        marginRight:"7px"
    }
    return(
        <>
          <button  style={btn1} onClick={(e)=>{
            fetch('/api/post/delete',{method:'POST',body:find._id})
            .then((r)=> r.json())
                    .then((result)=>{ 
                        alert(result)
                        router.push('/Commu')
                    })
          }}> 삭제</button>
            
        </>
        
    )
}