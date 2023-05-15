import React, { useState } from 'react';
import { TextField, Button } from "@mui/material"
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast';
function AuthPage() {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [signIn, setSignIn] = useState(true)
    async function logIn(e) {
        e.preventDefault()
        try {
            toast.loading("Loading ...", { id: "authToast" })
            const res = await fetch("http://localhost:5000/auth/signIn", {
                body: JSON.stringify({ email, password }),
                headers: {
                    "content-type": "application/json"
                },
                method: "POST"
            })
            const data = await res.json()
            if (res.status === 200) {
                toast.success(data.msg, { id: "authToast" })
            } else {
                toast.error(data.msg, { id: "authToast" })
            }
        } catch (err) {
            console.log(err)
        }
    }
    // const { data } = await axios.post("frt" , )
    async function signUp(e) {
        e.preventDefault()
        toast.loading("Loading ...", { id: "authToast" })
        try {
            const res = await fetch("http://localhost:5000/auth/signUp", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ name, email, phone, password })
            })
            const data = await res.json()
            if (res.status === 201) {
                toast.success(data.msg, { id: "authToast" })
            } else {
                toast.error(data.msg, { id: "authToast" })
            }
        } catch (err) {
            console.log(err)
        }


    }
    return (
        <section id="auth">
            <form action="" onSubmit={(signIn) ? logIn : signUp} >
                {(!signIn) ? <>
                    <TextField variant="outlined" value={name} onChange={(e) => setName(e.target.value)} label="name"></TextField>
                    <TextField variant="outlined" value={phone} onChange={(e) => setPhone(e.target.value)} label="phone"></TextField></> : null}
                <TextField variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} label="email"></TextField>
                <TextField variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} label="password"></TextField>
                <p>Don't have an account ! <span onClick={() => setSignIn(!signIn)}>{(signIn) ? "signUp" : "signIn"}</span></p>
                <Button variant="contained" label="signIn" type='submit'>{(signIn) ? "signin" : "signup"}</Button>
            </form>
            <Toaster position="bottom-center" />
        </section>);
}

export default AuthPage;