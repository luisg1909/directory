import { SortBy, type User } from './types.d'

interface Props{
  showColors: boolean
  deleteUser: (email: string) => void
  users:User[]
  changeSorting: (sort: SortBy) => void

}

export function UserList ({ changeSorting, deleteUser, showColors, users }: Props) {

  return (
    
    <table>
       <thead> 
          <tr>
         <th>Picture</th>
         <th className='pointer' onClick={() => { changeSorting(SortBy.NAME) }}>Name</th>
          <th className='pointer' onClick={() => { changeSorting(SortBy.LAST) }}>Last</th>     
          <th className='pointer' onClick={() => { changeSorting(SortBy.COUNTRY) }}>Country</th>        
          <th>actions</th>
           </tr> 
      </thead> 
    <tbody  className={showColors ? 'table--showColors' : ''}> 
    { 
        users.map((user)=>{
         
         return(
          <tr key={user.email} >
           <td><img src={user.picture.thumbnail}></img></td>
           <td>{user.name.first}</td>
           <td>{user.name.last}</td>
           <td>{user.location.country}</td>
           <td> <button onClick={() => {
                    deleteUser(user.email)
                  }}>Delete</button>
                  </td>
          </tr>
         )
        }
        )
      }
    
     </tbody> 
    
    </table>
  )
} 
