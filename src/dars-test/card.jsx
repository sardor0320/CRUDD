import { useContext } from "react"
import { UserData } from "./usProvider"

function Card() {
  const { changeData, userData } = useContext(UserData)

  return (
    <div>
      card
      {userData && userData.length && userData[0].title}
    </div>
  )
}

export default Card