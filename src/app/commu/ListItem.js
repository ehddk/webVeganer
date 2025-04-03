'use client'

export default async function ListItem(){
    const db = (await connectDB).db("vegan");
    const result = await db.collection('post').find().toArray();

    return(
        <div>
        {result.map((a,i) => {
            <table>
                 <tr key={i}>
                <td style={{ textAlign: "center" }}></td>
                    <td style={{ textAlign: "center" }}>
                    <Link prefetch={false} href={`/Commu/detail/${result[i]._id}`} style={{ textDecoration: 'none'}}>
                        {result[i].title} 
                        </Link>
                        </td>
                        </tr>
            </table>
        })}
        </div>
    )
}