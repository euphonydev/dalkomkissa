import { SettingHeader } from "@/components/ui/header/setting";
import { useTranslations } from "next-intl";

export default function Page() {
    const t = useTranslations();
    return (
        <>
            <SettingHeader title={t('ACCOUNT')} description={t('ACCOUNT_SETTINGS_DESC')} />
        </>
    )
}