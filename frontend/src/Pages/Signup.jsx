
import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signup = () => {

    const navigate = useNavigate()

    const [firstName,setFirstName] = useState()
    const [lastName,setLastName] = useState()
    const [username,setUsername] = useState()
    const [password,setPassword] = useState()


    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-centre">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign Up"}/>
                <SubHeading label={"Enter your information to create an account"}></SubHeading>
                <InputBox onChange={e => {
                    setFirstName(e.target.value)
                }} placeHolder={"John"} label={"First Name"}/>
                <InputBox onChange={e => {
                    setLastName(e.target.value)
                }} placeHolder={"Doe"} label={"Last Name"}/>
                <InputBox onChange={e =>{
                    setUsername(e.target.value)
                }} placeHolder={"gm@gmail.com"} label={"Email"}/>
                <InputBox onChange={e =>{
                    setPassword(e.target.value)
                }} placeHolder={"min 8 letter"} label={"Password"}/>
                <div className="pt-4">
                    <Button onClick={ async()=>{
                      await axios.post('http://localhost:3000/api/v1/user/signup',{
                            firstName,lastName,username,password
                        })
                        navigate('/signin')

                    }} label={"Sign Up"}></Button>
                </div>
                <BottomWarning label={"Already have an account?"} buttontext={"Sign in"} to={'/signin'}></BottomWarning>
                
            </div>
        </div>
    </div>


}