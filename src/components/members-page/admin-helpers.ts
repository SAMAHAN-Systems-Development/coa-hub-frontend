import { AdminAction } from "@/components/layout/CardContainer";
import { HeaderMode } from "./admin-header-actions";

export function getAdminActionFromMode(mode: HeaderMode): AdminAction {
  if (mode === "edit") return "edit";
  if (mode === "delete") return "delete";
  return null;
}
