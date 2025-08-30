import { useAppDispatch } from "@/store/hooks"
import { Button } from "@/components/ui/button"
import { toggleSidebar } from "@/store/slice/sidebarSlice"
import { cn } from "@/lib/utils"

export function SidebarToggle({ className }: { className?: string }) {
  const dispatch = useAppDispatch()
  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(className)}
      onClick={() => dispatch(toggleSidebar())}
    >
      ☰
    </Button>
  )
}
