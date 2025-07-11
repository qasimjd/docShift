"use client";

import { useRouter } from "next/navigation";

export const useNavigationHelpers = () => {
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

    const openSupportContact = () => {
        // You can replace this with your actual support contact method
        window.open("mailto:support@docshift.com?subject=AI Quota Issue", "_blank");
    };

    return {
        navigateToDashboard,
        navigateToFile,
        openSupportContact,
    };
};

export default useNavigationHelpers;
