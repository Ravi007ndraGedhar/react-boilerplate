import * as React from "react"
import { Button } from "@/components/ui/button"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { Sidebar } from "./Sidebar"

type LayoutProps = {
    children: React.ReactNode
    sidebar?: boolean
    sidebarWidth?: string
    drawerOnly?: boolean
    footer?: boolean
}

export function Layout({
    children,
    sidebar = true,
    sidebarWidth = "200px",
    drawerOnly = false,
    footer = true,
}: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <Header
                fixed
                logo={<span className="text-xl font-bold text-primary">🚀 Boilerplate</span>}
                links={[
                    { to: "/", label: "Home" },
                    { to: "/about", label: "About" },
                    { to: "/todos", label: "Todos" },
                ]}
                rightContent={<Button size="sm">Sign Up</Button>}
            />

            <div className="flex flex-1">
                {/* Sidebar */}
                <Sidebar
                    side="left"
                    width={sidebarWidth}
                    drawerOnly={drawerOnly}
                    enabled={sidebar}
                >
                    <div className={drawerOnly ? "" : "md:mt-14"}>
                        <p className="font-medium">Left Sidebar</p>
                        <ul className="mt-2 space-y-2">
                            <li><a href="/" className="hover:underline">Dashboard</a></li>
                            <li><a href="/settings" className="hover:underline">Settings</a></li>
                        </ul>
                    </div>
                </Sidebar>

                {/* Main Content */}
                <main
                    className={`pt-16  flex-1 ${drawerOnly ? '' : `md:ml-[${sidebarWidth}]`}`}
                >
                    {children}
                    {footer &&
                        <Footer
                            links={[
                                { to: "/about", label: "About" },
                                { to: "/privacy", label: "Privacy" },
                                { to: "/terms", label: "Terms" },
                            ]}
                            rightContent={<div className="flex gap-2">🌐 🐦 🔗</div>}
                        />
                    }
                </main>

            </div>

        </div>
    )
}
