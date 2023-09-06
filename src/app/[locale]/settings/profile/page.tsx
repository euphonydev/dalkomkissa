import { SettingHeader } from "@/components/ui/header/setting";
import { useTranslations } from "next-intl";

export default function Page() {
    const t = useTranslations();
    return (
        <>
            <SettingHeader title={t('PROFILE')} description={t('PROFILE_SETTING_DESC')} />
        </>
    )
}