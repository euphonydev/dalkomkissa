"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useTheme } from "next-themes"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import { useTranslations } from "next-intl"

export function AppearanceSettingForm() {
    const { theme, setTheme } = useTheme()
    const t = useTranslations()

    const FormSchema = z.object({
        theme: z.string({
            required_error: t("IS_REQUIRED", { field: t("THEME") }),
        }),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            theme,
        }
    })

    function onThemeChanged(theme: string) {
        form.setValue("theme", theme)
        setTheme(theme)
        toast({
            description: t("THEME_CHANGED_INFO", { theme: theme }),
        })
    }

    return (
        <Form {...form}>
            <FormField
                control={form.control}
                name="theme"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel>{t("CHANGE_FIELD", { field: t("THEME").toLowerCase() })}</FormLabel>
                        <FormControl>
                            <RadioGroup
                                defaultValue={field.value}
                                onValueChange={onThemeChanged}
                                className="flex flex-col space-y-1"
                            >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value="light" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        {t("LIGHT_MODE")}
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value="dark" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        {t("DARK_MODE")}
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value="system" />
                                    </FormControl>
                                    <FormLabel className="font-normal">{t("SYSTEM")}</FormLabel>
                                </FormItem>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </Form>
    )
}

AppearanceSettingForm.displayName = "AppearanceSettingForm"

export default AppearanceSettingForm