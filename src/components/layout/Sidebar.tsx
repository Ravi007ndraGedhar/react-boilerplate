import * as React from "react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { closeSidebar } from "@/store/slice/sidebarSlice"

type SidebarProps = {
    children: React.ReactNode
    width?: string
    side?: "left" | "right"
    drawerOnly?: boolean
    enabled?: boolean
}

export function Sidebar({
    children,
    width = "240px",
    side = "left",
    drawerOnly = false,
    enabled = true,
}: SidebarProps) {
    const dispatch = useAppDispatch()
    const isOpen = useAppSelector((state) => state.sidebar.isOpen)

    const [isMobile, setIsMobile] = React.useState(false)

    React.useEffect(() => {
        const checkScreen = () => setIsMobile(window.innerWidth < 768)
        checkScreen()
        window.addEventListener("resize", checkScreen)
        return () => window.removeEventListener("resize", checkScreen)
    }, [])

    if (!enabled) return null

    // Drawer (mobile or drawerOnly)
    if (drawerOnly || isMobile) {
        return (
            <Sheet open={isOpen} onOpenChange={(open) => !open && dispatch(closeSidebar())}>
                <SheetContent side={side} className="p-4" style={{ width }}>
                    {children}
                </SheetContent>
            </Sheet>
        )
    }

    // Fixed Sidebar (desktop)
    return (
        <aside
            className={cn("bg-muted p-4 hidden md:block h-screen")}
            style={{ width, position: "fixed", top: 0, [side]: 0 }}
        >
            {children}
        </aside>
    )
}
