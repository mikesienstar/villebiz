"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function SignIn() {
    const { toast }=useToast()
    const [isDisabled,setIsDisabled]=useState(false)
    const router = useRouter()
    async function handleSignIn(e:any) {
        try{
            setIsDisabled(true)
            e.preventDefault()
            const url="/api/auth/sign_in"
            const response=await fetch(url,{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({
                    password:e.target.password.value,
                    email:e.target.email.value
                })
            })
            const parseRes=await response.json()
            if(parseRes.error){
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: parseRes.error,
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                })
                setIsDisabled(false)
            }else{
                const data:any=parseRes.data
                console.log(data)
                const stringifyData=JSON.stringify(data)
                localStorage.setItem("user-details",stringifyData)
                router.push('/home')
            }
        }catch(error:any){
            setIsDisabled(false)
            console.log(error.message)
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error.message,
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        }
    }

    function checkAuth(){
        const stringifyData=localStorage.getItem("user-details")
        if(stringifyData){
            router.push("/home")
        }
    }

    useEffect(()=>{
        checkAuth()
    })
  return (
    <div className="flex font-[family-name:var(--font-geist-sans)] items-center flex-col h-screen">
        <div className="md:w-[500px] w-[90vw] flex items-center rounded-none h-screen shadow-none">
            <Card className="w-full rounded-none shadow-none border-none">
                <CardHeader>
                    <CardTitle className="text-3xl font-semibold text-[var(--primary-01)]">Welcome Back!</CardTitle>
                    <CardDescription>Get started by sign in to your account.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSignIn}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email" className="text-[var(--primary-01)] font-semibold required">Email address</Label>
                                <Input id="email" name="email" type="email" placeholder="Enter your email" className="border-[var(--primary-03)] placeholder:font-semibold outline-[1px] active:outline-[var(--primary-01)] focus:border-[var(--primary-01)] outline-[var(--primary-01)]" required/>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password" className="text-[var(--primary-01)]  font-semibold required">Password</Label>
                                <Input id="password" name="password" minLength={8} maxLength={24} type="password" className="border-[var(--primary-03)] placeholder:font-semibold outline-[1px] active:outline-[var(--primary-01)] focus:border-[var(--primary-01)] outline-[var(--primary-01)]" placeholder="Password" required/>
                            </div>
                            <div className="sm:flex md:items-center sm:justify-between">
                                <div className="flex items-center justify-center sm:justify-start py-2 sm:py-0">
                                    <input id="push-email" defaultValue={`${false}`} name="push-notifications" type="checkbox" phx-debounce="blur" className="h-4 w-4 rounded border-gray-300 text-[var(--primary-01)] focus:ring-[var(--primary-01)]"/>
                                    <label htmlFor="push-email" className="ml-3">
                                        <span className="block text-sm font-medium text-[var(--primary-01)]">
                                            Remember for 30 days
                                        </span>
                                    </label>
                                </div>
                                <div className="py-2 sm:py-0 text-center sm:text-left">
                                <Button variant="link" className="ml-auto text-[var(--primary-01)]" asChild>
                                    <Link href="/en/password-reset/new-request" data-phx-link="redirect" data-phx-link-state="push" className="text-sm text-navcolor-600 font-semibold hover:underline" title="Navigate to password reset page">
                                        Forgot Password
                                    </Link>
                                </Button>
                                </div>
                            </div>
                            <Button type="submit" variant={isDisabled===false?"default":"outline"} disabled={isDisabled} className={`h-[40px] ${isDisabled===false?"bg-[var(--primary-01)] font-semibold hover:bg-[var(--primary-01)]":""}`}>
                                {isDisabled===false?(<p>Sign in</p>):(<p>Sending...</p>)}
                            </Button>
                            {/* <p className="text-sm text-gray-500 text-center">Or sign in with</p> */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center" aria-hidden>
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm font-medium leading-6">
                                    <span className="bg-white px-6 text-gray-600">Or continue with</span>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Button type="button" className="h-[40px] font-semibold" variant="outline">
                                    <Image alt="" src="/google-vector.svg" width={18} height={18} priority/>
                                    <span>Sign in with Google</span>
                                </Button>
                            </div>
                            <div className="flex gap-1 text-gray-600 items-center justify-center md:text-sm text-xs">
                                <p>{`Don't have an account?`}</p>
                                <Button variant="link" className="text-[var(--primary-01)] md:text-sm text-xs" asChild>
                                    <Link href="/sign-up">Create account</Link>
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}
