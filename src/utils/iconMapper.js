import { Scissors, Sparkles, UserRound } from "lucide-react";

const icons = { scissors: Scissors, sparkles: Sparkles, "user-round": UserRound };
export const getIcon = (name) => icons[name] || Sparkles;