import { useAllUsersQuery, useDeleteUserMutation } from "@/features/customers/api/user-api"
import { selectUser } from "@/features/customers/reducer/user-reducer"
import { CustomersType, customersColumns } from "@/features/customers/table/customer-columns"
import SkeletonWrapper from "@/features/global-components/shared/Skeleton-Wrapper"
import { DataTable } from "@/features/global-components/shared/data-table/Data-Table"
import { Avatar, AvatarFallback, AvatarImage } from "@/features/global-components/ui/avatar"
import { Button } from "@/features/global-components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/features/global-components/ui/card"
import { Skeleton } from "@/features/global-components/ui/skeleton"
import { responseToast } from "@/lib/utils"
import { useAppSelector } from "@/redux/store"
import { CustomErrorType } from "@/types/api-types"
import { FaTrash } from "react-icons/fa"
import { toast } from "sonner"

import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@/features/global-components/ui/alert-dialog"
import SelectRole from "@/features/customers/components/Select-Role"

const Customers = () => {
   const { user: loggedInUser } = useAppSelector(selectUser)

   const { data, isLoading, isSuccess, isError, error } = useAllUsersQuery(loggedInUser?._id!)
   const [deleteUser] = useDeleteUserMutation()

   let errorMessage: string | null = null
   if (isError) {
      const err = error as CustomErrorType
      errorMessage = err.data.message
      toast.error(errorMessage)
   }

   const deleteUserHandler = async (userId: string, adminUserId: string = loggedInUser?._id!) => {
      const res = await deleteUser({ userId, adminUserId })
      responseToast(res)
   }

   const allUsers: CustomersType[] | null = isSuccess
      ? data.users.map((user) => ({
           avatar: (
              <Avatar>
                 <AvatarImage src={user.photo} />
                 <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
           ),
           name: user.name,
           email: user.email,
           gender: user.gender,
           role:
              loggedInUser?._id === user._id ? (
                 <span>{user.role!}</span>
              ) : (
                 <SelectRole role={user.role!} userId={user._id} />
              ),
           action: (
              <AlertDialog>
                 <AlertDialogTrigger asChild>
                    <Button variant={"destructive"} size={"icon"} className="h-8 w-8">
                       <FaTrash />
                    </Button>
                 </AlertDialogTrigger>
                 <AlertDialogContent>
                    <AlertDialogHeader>
                       <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                       <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the user.
                       </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                       <AlertDialogCancel>Cancel</AlertDialogCancel>
                       <AlertDialogAction onClick={() => deleteUserHandler(user._id)} asChild>
                          <Button
                             variant={"destructive"}
                             className="bg-destructive hover:bg-destructive/90"
                          >
                             Delete
                          </Button>
                       </AlertDialogAction>
                    </AlertDialogFooter>
                 </AlertDialogContent>
              </AlertDialog>
           ),
        }))
      : null

   return (
      <Card>
         <CardHeader>
            <CardTitle className="font-light uppercase tracking-widest">Customers</CardTitle>
         </CardHeader>
         <CardContent>
            {isLoading ? (
               <SkeletonWrapper className="space-y-3" quantity={8}>
                  <Skeleton className="h-16 w-full" />
               </SkeletonWrapper>
            ) : isSuccess && allUsers ? (
               <DataTable columns={customersColumns} data={allUsers} isPagination={true} />
            ) : (
               <p className="mt-8 grid place-items-center">{errorMessage}</p>
            )}
         </CardContent>
      </Card>
   )
}
export default Customers
