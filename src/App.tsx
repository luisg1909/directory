import { useState } from 'react'

import './App.css'

import  { UserList } from './UserList'; // 
import  {  useEffect, useMemo, useRef } from 'react';
import { SortBy, type User } from './types.d'

function App() {

const [users, setUsers] = useState<User[]>([])
 const [showColors,setShowColors]=useState(false)
 const [sortByCountry,setSortByCountry]=useState(false)
 const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
 const [filterCountry, setFilterCountry] = useState<string | null>(null)

 const originalUsers = useRef<User[]>([])

 const toggleColors = () => {
  setShowColors(!showColors)
}

  //

 
  const toggleSortByCountry = () => {
    console.log('hello')
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }
  
  const handleReset = () => {
    setUsers(originalUsers.current)
  }
  
  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }
 useEffect(()=>{

   fetch('https://randomuser.me/api?results=100')
   .then(async res=> await res.json())
   .then(res=>{
   
   setUsers(res.results)
   originalUsers.current = res.results

   })
   .catch(err=>{
     console.error(err)
   })
    
   },[])

   const filteredUsers = useMemo(() => {
    console.log('calculate filteredUsers')
    return filterCountry != null && filterCountry.length > 0
      ? users.filter(user => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      })
      : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    console.log('calculate sortedUsers')

    if (sorting === SortBy.NONE) return filteredUsers

    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last
    }

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [filteredUsers, sorting])

 

 return (
   <div className="App">
      <h1>Technical test</h1>
      <header>
        <button onClick={toggleColors}>
        draw files
        </button>
        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY ? 'No ordenar por país' : 'Ordenar por país'}
        </button>

        <button onClick={handleReset}>
          Resetear estado
        </button>

        <input placeholder='Filtra por país' onChange={(e) => {
          setFilterCountry(e.target.value)
        }} />


      </header>
      <main>
    <UserList changeSorting={handleChangeSort}  showColors={showColors} users={sortedUsers} />
 
      </main>
    
       </div>
    )
}

export default App
