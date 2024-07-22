 "use client";

 import { useEffect } from "react";
 import { Crisp } from "crisp-sdk-web";

 // Crisp chat component
 export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("2ad67fe7-3733-4a16-bc78-2a152afb0ec3"); // Website ID obtained from crisp
    }, [] );

    return null;
 }