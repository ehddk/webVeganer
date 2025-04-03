import { v4 as uuidv4 } from 'uuid';

const today=new Date();


var commuData={
    
    category:[{
        id: uuidv4(),category:"정보공유",title:"ㄴㅇㄴㅇㄴsdfsdfsdfㅇ",author:"hi",date:`${today}`,view:"120"
    },
    {
        id: uuidv4(),category:"정보공유",title:"dfsdfsdfsfsdfsf",author:"hi132",date:`${today}`,view:"120"
    }
    ,{
        id: uuidv4(), category:"리뷰",title:"review",author:"hi424",date:`${today}`,view:"120"
    },
    {
        id: uuidv4(),category:"정보공유",title:"dfsdfsdfsfsdfsf",author:"asdasd",date:`${today}`,view:"120"
    }
    
]
}

export default commuData; 