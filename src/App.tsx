import { useState } from 'react'

import './App.css'
import { User } from './types'; // Assuming types.d.ts is named types.ts
import  { UserList } from './UserList'; // 
import  {  useEffect, useMemo, useRef } from 'react';

function App() {

const [users, setUsers] = useState<User[]>([])
 const [showColors,setShowColors]=useState(false)
 const [sortByCountry,setSortByCountry]=useState(false)
 
 const toggleColors = () => {
  setShowColors(!showColors)
}

 const toggleSortByCountry=()=>{

   setSortByCountry(prevState=>!prevState)
   
 }  //

 const sortedUsers=sortByCountry?
 users
 :users
 useEffect(()=>{

   fetch('https://randomuser.me/api?results=100')
   .then(async res=> await res.json())
   .then(res=>{
   
   setUsers(res.results)
   })
   .catch(err=>{
     console.error(err)
   })
    
   },[])


 return (
   <div className="App">
      <h1>Technical test</h1>
      <header>
        <button onClick={toggleColors}>
        draw files
        </button>
        <button onClick={toggleSortByCountry}>
        Sort by country
        </button>
      </header>
      <main>
      <UserList showColors={showColors} users={users} />

      </main>
    
       </div>
    )
}

export default App
