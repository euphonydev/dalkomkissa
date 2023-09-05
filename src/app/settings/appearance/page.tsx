import dynamic from "next/dynamic";
import { SettingHeader } from "@/components/ui/header/setting";
const AppearanceSettingForm = dynamic(() => import("@/components/fragments/form/appearance-setting"), { ssr: false });

export default function Page() {
    return (
        <>
            <SettingHeader title="Appearance" description="Customize how you see the site." />
            <AppearanceSettingForm />
        </>
    )
}