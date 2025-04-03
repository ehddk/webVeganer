'use client'
import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import Link from "next/link";
import { useRouter } from "next/navigation";
import {useState} from 'react';
export default async function Session(){
    let session=await getServerSession(authOptions)

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const router=useRouter();
     //const dropdownRef = useRef(null)
   
     const handleMenuClick = () => {
       setDropdownOpen(!isDropdownOpen);
     };
   

  const headerStyle = {
    display: "flex",
    lineHeight: "center",
    alignItems: "center",
    height: "50px",
    justifyContent: "space-between",
    padding: "15px",
    margin: "0 100px",
  };

  const loginUl = {
    listStyleType: "none",
    display: "flex",
    top: "0",
    position: "absolute",
    right: "0",
    marginRight: "5px",
    gap: "10px",
    color: "gray",
  };

  const menu = {
    display: "flex",
    gap: "100px",
    listStyleType: "none",
    marginTop: "40px",
    fontSize: "20px",
  };


    return(
        <>
       <div style={{ borderBottom: "0.5px solid green" }}>
        <header style={headerStyle}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <h1>Veganer</h1>
          </Link>
          <ul style={loginUl}>
           
           <span>{session.user.name}님 환영!</span>
          </ul>
          <ul style={menu}>
            <Link href="/Brand" style={{ textDecoration: "none", color: "black" }}>브랜드</Link>
            <Link href="/Cafe" style={{ textDecoration: "none", color: "black" }}>카페</Link>
            <Link href="/Food" style={{ textDecoration: "none", color: "black" }}>음식점</Link>
            <li onClick={handleMenuClick}>행사</li>
           
            <Link href="/Commu" style={{ textDecoration: "none", color: "black" }}>커뮤니티</Link>
          </ul>
          
        </header>
        {isDropdownOpen && (
              <ul style={dropdownStyle}>
                <li style={{marginTop:"10px"}} onClick={() => handleMenuItemClick('/Event/menu1')}>페어 / 페스타</li>
                <li onClick={() => handleMenuItemClick('/Event/menu2')}>강의</li>
              </ul>
            )}
      </div>
        </>
    )
}