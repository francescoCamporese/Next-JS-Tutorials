import { useRouter } from "next/router";
import { useEffect } from "react";

export default function NotFound() {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push("/");
        }, 2000);
    }, []);

    return (
        <h1>404 - Not Found</h1>
    );
}