import { Card, CardContent, CardHeader } from "./ui/card"
import { Skeleton } from "./ui/skeleton"

function StatCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="w-full h-5" />
      </CardHeader>
      <CardContent>
        <Skeleton className="w-1/4 h-10" />
        <Skeleton className="w-full h-3 mt-2" />
      </CardContent>
    </Card>
  )
}

export default StatCardSkeleton
