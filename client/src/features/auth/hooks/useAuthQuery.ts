import {useQuery} from "@tanstack/react-query"
import { getCurrentUser } from "@/api/auth.ts";

export function useAuthQuery() {
    return useQuery({
        queryKey: ["me"],
        queryFn: () => getCurrentUser(),
        retry: false
    })
}