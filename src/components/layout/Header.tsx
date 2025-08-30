import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { SidebarToggle } from "./SidebarToggle"
import { ModeToggle } from "../theme"

export interface HeaderLink {
    to: string
    label: string
}

interface HeaderProps {
    links?: HeaderLink[]
    logo?: React.ReactNode
    rightContent?: React.ReactNode
    className?: string
    fixed?: boolean
    sticky?: boolean
    height?: string
}

export function Header({
    links = [],
    logo,
    rightContent,
    className,
    fixed = false,
    sticky = false,
}: HeaderProps) {
    return (
        <header
            className={cn(
                "w-full border-b bg-background shadow-sm px-6 py-3 flex items-center justify-between z-50",
                fixed && "fixed top-0 left-0",
                sticky && "sticky top-0",
                className
            )}
        >
            {/* Left: Logo */}
            <div className="flex items-center gap-2">
                {logo ?? <span className="font-bold text-lg">MyApp</span>}
            </div>

            {/* Middle: Navigation */}
            <nav className="flex gap-4">
                {links.map((link) => (
                    <Link
                        key={link.to}
                        to={link.to}
                        className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>

            {/* Right: Custom Content */}
            <div className="flex items-center gap-2">
                {rightContent ?? <Button variant="outline" size="sm">Login</Button>}
                <ModeToggle />
                <SidebarToggle className="md:hidden" />
            </div>
        </header>
    )
}
