import {type User} from './types.d';

interface Props{
  showColors: boolean
  users:User[]
}
export function UserList   ({ showColors,users }: Props)  {
  return (
    
    <table>
       <thead> 
          <tr>
         <th>Picture</th>
          <th>Name</th> 
          <th>Last </th> 
          <th>County</th> 
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
           <td><button>Erase</button></td>
          </tr>
         )
        }
        )
      }
    
     </tbody> 
    
    </table>
  )
} 
