import * as React from "react"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

export interface FooterLink {
    to: string
    label: string
}

interface FooterProps {
    links?: FooterLink[]
    logo?: React.ReactNode
    rightContent?: React.ReactNode
    className?: string
    fixed?: boolean
    sticky?: boolean
    height?: string
    center?: boolean
}

export function Footer({
    links = [],
    logo,
    rightContent,
    className,
    fixed = false,
    sticky = false,
    height,
    center = false,
}: FooterProps) {
    return (
        <footer
            className={cn(
                "w-full border-t bg-background px-6 py-4 mt-4 flex items-center",
                center ? "justify-center" : "justify-between",
                fixed && "fixed bottom-0 left-0",
                sticky && "sticky bottom-0",
                className
            )}
            style={{ height }}
        >
            {!center && (
                <>
                    {/* Left */}
                    <div className="flex items-center gap-2">
                        {logo ?? (
                            <span className="text-sm text-muted-foreground">
                                © {new Date().getFullYear()} 🚀 Boilerplate
                            </span>
                        )}
                    </div>

                    {/* Middle */}
                    {links.length > 0 && (
                        <nav className="flex gap-4 text-sm">
                            {links.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    )}

                    {/* Right */}
                    {rightContent && <div className="flex items-center gap-2">{rightContent}</div>}
                </>
            )}

            {center && (
                <span className="text-sm text-muted-foreground text-center">
                    © {new Date().getFullYear()} 🚀 Boilerplate. All rights reserved.
                </span>
            )}
        </footer>
    )
}
