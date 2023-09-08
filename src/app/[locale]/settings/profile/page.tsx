import ProfileSettingForm from "@/components/fragments/form/profile-setting";
import { MainHeader } from "@/components/ui/main-header";
import { useTranslations } from "next-intl";

export default function Page() {
    const t = useTranslations();
    return (
        <>
            <MainHeader title={t('PROFILE')} description={t('PROFILE_SETTINGS_DESC')} />
            <ProfileSettingForm />
        </>
    )
}