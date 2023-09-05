import { SettingHeader } from "@/components/ui/header/setting";

export default function Page() {
    return (
        <div className="flex flex-col space-y-4">
            <SettingHeader title="Appearance" description="Customize how you see the site." />
        </div>
    )
}