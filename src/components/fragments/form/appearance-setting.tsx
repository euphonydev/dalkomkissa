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
import { useEffect } from "react"

const FormSchema = z.object({
    theme: z.string({
        required_error: "You need to select a theme.",
    }),
})

export function AppearanceSettingForm() {
    const { theme, setTheme } = useTheme()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            theme,
        }
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    function onThemeChanged(theme: string) {
        form.setValue("theme", theme)
        setTheme(theme)
        toast({
            description: "You changed the theme to " + theme + " theme.",
        })
    }

    return (
        <Form {...form}>
            <FormField
                control={form.control}
                name="theme"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel>Change theme</FormLabel>
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
                                        Light mode
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value="dark" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        Dark mode
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value="system" />
                                    </FormControl>
                                    <FormLabel className="font-normal">System</FormLabel>
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

export default AppearanceSettingForm