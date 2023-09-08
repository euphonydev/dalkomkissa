import dynamic from "next/dynamic"
import { MainHeader } from "@/components/ui/main-header"
const AppearanceSettingForm = dynamic(() => import("@/components/fragments/form/appearance-setting"), { ssr: false });
import { useTranslations } from "next-intl"

export default function Page() {
    const t = useTranslations();
    return (
        <>
            <MainHeader title={t('APPEARANCE')} description={t('APPEARANCE_SETTINGS_DESC')} />
            <AppearanceSettingForm />
        </>
    )
}