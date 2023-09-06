import dynamic from "next/dynamic"
import { SettingHeader } from "@/components/ui/header/setting"
const AppearanceSettingForm = dynamic(() => import("@/components/fragments/form/appearance-setting"), { ssr: false });
import { useTranslations } from "next-intl"

export default function Page() {
    const t = useTranslations();
    return (
        <>
            <SettingHeader title={t('APPEARANCE')} description={t('APPEARANCE_SETTINGS_DESC')} />
            <AppearanceSettingForm />
        </>
    )
}