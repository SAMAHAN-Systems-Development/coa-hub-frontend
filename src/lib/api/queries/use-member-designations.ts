import { useQuery } from "@tanstack/react-query";
import { memberDesignationsService } from "../services/member-designations.services";

export function useMemberDesignationsQuery(binId?: number) {
  return useQuery({
    queryKey: ["member-designations", binId],
    queryFn: () => memberDesignationsService.getAll(binId),
  });
}
