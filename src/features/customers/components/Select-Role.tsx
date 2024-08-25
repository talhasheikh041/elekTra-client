import { useUpdateUserMutation } from "@/features/customers/api/user-api"
import { selectUser } from "@/features/customers/reducer/user-reducer"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/features/global-components/ui/select"
import { responseToast } from "@/lib/utils"
import { useAppSelector } from "@/redux/store"
import { Loader } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

type SelectRoleProps = {
   role: string
   userId: string
}

const SelectRole = ({ role, userId }: SelectRoleProps) => {
   const [selectedRole] = useState(role)

   const { user } = useAppSelector(selectUser)

   const [updateUser, { isLoading }] = useUpdateUserMutation()

   const updateRole = async (updatedRole: string) => {
      try {
         const res = await updateUser({ adminUserId: user?._id!, userId, role: updatedRole })
         responseToast(res)
      } catch (error) {
         toast.error(error as string)
      }
   }

   return (
      <Select defaultValue={selectedRole} onValueChange={updateRole}>
         <SelectTrigger>
            {isLoading ? <Loader className="animate-spin" /> : <SelectValue placeholder="Role" />}
         </SelectTrigger>
         <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="user">User</SelectItem>
         </SelectContent>
      </Select>
   )
}
export default SelectRole
