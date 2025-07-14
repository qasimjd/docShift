"use client";

import { useRouter } from "next/navigation";

const useNavigationHelpers = () => {
    const router = useRouter();

    const navigateToDashboard = () => {
        router.push("/dashboard");
    };

    const navigateToFile = (fileId?: string) => {
        if (fileId) {
            router.push(`/dashboard/summary/${fileId}`);
        } else {
            router.push("/dashboard");
        }
    };

    return {
        navigateToDashboard,
        navigateToFile,
    };
};

export default useNavigationHelpers;
