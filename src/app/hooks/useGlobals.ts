import { createContext, useContext } from "react";
import { Member } from "../../lib/types/member";

interface GlobalInterface {
    authMember: Member | null;                        // state
    setAuthMember: (member: Member | null) => void;   // setter
    orderBuilder: Date;
    setOrderBuilder: (input: Date) => void;
}
export const GlobalContext = createContext<GlobalInterface | undefined>(
    undefined
);

export const useGlobals = () => {
    const context = useContext(GlobalContext);
    if(context === undefined) throw new Error("useGlobals without Provider");
    return context
}