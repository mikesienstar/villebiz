"use client";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { ChevronRight, Home, LogIn, Mail, Menu, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

type LinkType={
    label:string,
    href:string,
    className?:string,
    variant:any,
    icon?:any
}

export default function Header() {
  const [isMobile,setIsMobile]=useState(false)
  const [open, setOpen] = useState(false); // Manage menu visibility

  const links:LinkType[]=[
    {
        label:"Products",
        href:"/",
        className:"hover:text-[var(--primary-01)] text-[var(--text-primary-04)]",
        variant:"ghost"
    },
    {
        label:"Contact us",
        href:"mailto:imranmat254@gmail.com?subject=Mail from Villebiz-ke",
        className:"hover:text-[var(--primary-01)] text-[var(--text-primary-04)]",
        variant:"ghost"
    },
    {
        label:"Sign in",
        href:"/sign-in",
        className:"bg-[var(--primary-01)] hover:bg-[var(--primary-01)]",
        variant:"default"
    }
  ]

  const mobileLinks:LinkType[]=[
    {
        label:"Go to home page",
        icon:(<Home className="text-[var(--primary-01)] w-[20px] h-[20px]"/>),
        href:"/",
        variant:"link"
    },
    {
        icon:(<LogIn className="text-[var(--primary-01)] w-[20px] h-[20px]"/>),
        label:"Sign in",
        href:"/sign-in",
        variant:"ghost"
    },
    {
        icon:(<Plus className="text-[var(--primary-01)] w-[20px] h-[20px]"/>),
        label:"Add new product",
        href:"/",
        variant:"link"
    },
  ]

  const handleClose = () => {
    setOpen(false); // Set open state to false to close the menu
  };

  
  function checkScreen(){
    if(screen.width>768){
        setIsMobile(false)
    }else{
        setIsMobile(true)
    }
  }

  
  useEffect(()=>{
    checkScreen()
    if (typeof window !== 'undefined') {
        window.onresize=checkScreen
    }
  },[])
  return (
    <>
        <header className="font-[family-name:var(--font-geist-sans)] bg-[var(--body-bg)] border-b-[1px] z-50 fixed top-0 left-0 right-0">
            <div className="my-2 mx-2 max-md:my-4 max-md:mx-4">
                <nav className="flex justify-between items-center w-full md:px-5">
                    <Link href="/" className="flex gap-2 text-[var(--primary-01)] font-semibold">
                        Villebiz
                    </Link>
                    
                    {isMobile?(
                        <Drawer open={open} onOpenChange={setOpen}>
                            <DrawerTrigger asChild>
                                <Menu onClick={() => setOpen(true)} className="w-[23px] h-[23px] text-[var(--primary-01)]"/>
                            </DrawerTrigger>
                            <DrawerContent>
                                <div className="mx-auto w-full max-w-sm">
                                    <DrawerHeader className="none">
                                        <DrawerTitle hidden className="text-[var(--primary-01)]">Villebiz</DrawerTitle>
                                        <DrawerDescription hidden className="text-gray-600">Menu</DrawerDescription>
                                    </DrawerHeader>
                                    <div className="flex flex-col gap-y-4 p-4 pb-0">
                                        {mobileLinks.map((link,index)=>(
                                            <Link key={index} href={link.href}>
                                                <Button onClick={handleClose} variant={link.variant} asChild>
                                                    <span className="flex items-center w-full">
                                                        <span className="flex gap-2 items-center">
                                                            {link.icon}
                                                            <span>{link.label}</span>
                                                        </span>
                                                        <ChevronRight className="ml-auto w-[30px] h-[30px] text-[var(--primary-01)]"/>
                                                    </span>
                                                </Button>
                                            </Link>
                                        ))}
                                        <a target="_blank" rel="noreferrer noopener" href="mailto:imranmat254@gmail.com?subject=Mail from Villebiz-ke">
                                            <Button onClick={handleClose} variant="link" asChild>
                                                <span className="flex items-center w-full">
                                                    <span className="flex gap-2 items-center">
                                                        <Mail className="text-[var(--primary-01)] w-[20px] h-[20px]"/>
                                                        <span>Contact us</span>
                                                    </span>
                                                    <ChevronRight className="ml-auto w-[30px] h-[30px] text-[var(--primary-01)]"/>
                                                </span>
                                            </Button>
                                        </a>
                                    </div>
                                    <DrawerFooter>
                                        <Link href="/sign-up" className="w-full">
                                            <Button onClick={handleClose} variant="outline" className="border-[1px] w-full border-dashed border-[var(--primary-01)] text-[var(--primary-01)]">
                                                Get Started
                                            </Button>
                                        </Link>
                                        <DrawerClose asChild>
                                            <Button variant="ghost" onClick={handleClose} className="text-gray-600 hover:text-[var(--primary-01)]">Close Menu</Button>
                                        </DrawerClose>
                                    </DrawerFooter>
                                </div>
                            </DrawerContent>
                        </Drawer>
                    ):(
                        <div id="desktop_nav" className="flex gap-2">
                            {links.map(link=>(
                                <Button key={link.href} variant={link.variant} className={link.className} asChild>
                                    <Link href={link.href}>
                                        {link.label}
                                    </Link>
                                </Button>
                            ))}
                        </div>
                    )}
                </nav>
            </div>
        </header>
    </>
  );
}