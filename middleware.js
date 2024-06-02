import { NextResponse } from "next/server";

export default function middleware(req){
    let verify = req.cookies.get('loggedin');
    let url = req.url

    // only if the the user is logged in show the dashboard
    if(!verify && url.includes('/dashboard')){
        return NextResponse.redirect("http://localhost:3000/")
    }

    // if the user has logged in before than redirect to dashboard automatically 
    // if(verify && url === "http://localhost:3000/"){
    //     return NextResponse.redirect("http://localhost:3000/dashboard")
    // }
}