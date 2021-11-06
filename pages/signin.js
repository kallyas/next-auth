import { signIn } from "next-auth/react"

export default function signin() {
  return(
   <div className="row d-flex justify-content-center no-wrap">
     <div className="col-md-6">
     <button type="button" onClick={() => signIn()}>
    Sign In
  </button>
     </div>
   </div>
  )
}