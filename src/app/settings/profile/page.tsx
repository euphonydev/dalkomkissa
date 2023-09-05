import { SettingHeader } from "@/components/ui/header/setting";

export default function Page() {
    return (
        <div className="flex flex-col space-y-4">
            <SettingHeader title="Profile" description="This is how others will see you on the site." />
        </div>
    )
}