'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CheckIcon, ChevronsUpDownIcon, PlusIcon, XIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'
import { CircleFlag } from 'react-circle-flags'
import { useForm } from 'react-hook-form'
import { getImageSize } from 'react-image-size'
import * as z from 'zod'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { languages } from '@/lib/enums/languages'
import { cn } from '@/lib/utils'
import '@/lib/utils/number/convert-file-size'
import '@/lib/utils/string/substring-after-last'

type Props = {
  label: string
  onModalSubmit: (value: any, file: File) => void
  openModalRef: RefObject<HTMLButtonElement>
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const ImageMultiLangModal = ({
  label,
  onModalSubmit,
  openModalRef,
  ...props
}: Props) => {
  const t = useTranslations()
  const [open, setOpen] = React.useState(false)
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null)
  const [imageResolution, setImageResolution] = React.useState<string | null>(
    null,
  )

  const formSchema = z.object({
    cover: z.object({
      language: z.string(),
      name: z.string(),
      url: z.string(),
    }),
  })

  type formValues = z.infer<typeof formSchema>

  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
  })

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      if (file.type.startsWith('image/')) {
        form.setValue('cover.url', URL.createObjectURL(file))
        form.clearErrors()
        fetchImageSize(URL.createObjectURL(file))
        setSelectedFile(file)
      }
    }
  }

  function removeFile() {
    if (selectedFile) {
      URL.revokeObjectURL(form.getValues('cover.url'))
    }
    form.setValue('cover.url', '')
    form.setValue('cover.name', '')
    setSelectedFile(null)
  }

  async function fetchImageSize(url: string) {
    const { width, height } = await getImageSize(url)
    if (width && height) {
      setImageResolution(`${width}x${height}`)
    }
  }

  function clearInputValue() {
    form.setValue('cover.language', '')
    form.setValue('cover.name', '')
    form.setValue('cover.url', '')
    form.clearErrors()
    removeFile()
    setImageResolution(null)
    open ? setOpen(false) : setOpen(true)
  }

  function validateForm(formData: formValues) {
    if (!formData.cover.language || !formData.cover.name) {
      if (!formData.cover.language) {
        form.setError('cover.language', {
          type: 'manual',
          message: t('IS_REQUIRED', { field: t('LANGUAGE') }),
        })
      }
      if (!formData.cover.name) {
        form.setError('cover.name', {
          type: 'manual',
          message: t('IS_REQUIRED', { field: t('COVER') }),
        })
      }
      return false
    }
    return true
  }

  async function handleSubmit() {
    const formData = form.getValues()
    const formValid = validateForm(formData)
    if (formValid && selectedFile) {
      onModalSubmit(formData.cover, selectedFile)
      setOpen(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={clearInputValue}
    >
      <DialogTrigger asChild>
        <Button
          {...props}
          variant="outline"
          ref={openModalRef}
        >
          <PlusIcon className="h-4 w-4 md:mr-2" />
          <span>{label}</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form>
            <DialogHeader className="text-left">
              <DialogTitle>{label}</DialogTitle>
              <DialogDescription>
                <div className="mb-8 justify-start space-y-8">
                  <FormField
                    control={form.control}
                    name="cover.language"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>{t('LANGUAGE')}</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  'w-[200px] justify-between',
                                  !field.value && 'text-muted-foreground',
                                )}
                              >
                                {field.value ? (
                                  <div className="flex items-center">
                                    <CircleFlag
                                      countryCode={
                                        field.value === 'en'
                                          ? 'gb'
                                          : field.value
                                      }
                                      className="mr-2 h-4 w-4"
                                    />
                                    {t(`lang.${field.value}`)}
                                  </div>
                                ) : (
                                  t('SELECT_FIELD', {
                                    field: t('LANGUAGE').toLowerCase(),
                                  })
                                )}
                                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput
                                placeholder={t('SEARCH_FIELD', {
                                  field: t('LANGUAGE').toLowerCase(),
                                })}
                              />
                              <CommandEmpty>
                                {t('FIELD_NOT_FOUND', { field: t('LANGUAGE') })}
                              </CommandEmpty>
                              <CommandGroup>
                                {languages.map((language) => (
                                  <CommandItem
                                    value={t(`lang.${language.value}`)}
                                    key={language.value}
                                    onSelect={() => {
                                      form.setValue(
                                        'cover.language',
                                        language.value,
                                      )
                                      form.clearErrors('cover.language')
                                    }}
                                  >
                                    <CheckIcon
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        language.value === field.value
                                          ? 'opacity-100'
                                          : 'opacity-0',
                                      )}
                                    />
                                    <div className="flex items-center">
                                      <CircleFlag
                                        countryCode={
                                          language.value === 'en'
                                            ? 'gb'
                                            : language.value
                                        }
                                        className="mr-2 h-4 w-4"
                                      />
                                      {t(`lang.${language.value}`)}
                                    </div>
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cover.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="cover">{t('COVER')}</FormLabel>
                        <FormControl onChange={handleImageChange}>
                          <Input
                            type="file"
                            id="cover"
                            accept="image/*"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {selectedFile ? (
                    <Card className="p-0">
                      <CardHeader className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className="relative w-12 overflow-hidden rounded-md">
                            <AspectRatio ratio={1 / 1}>
                              <Image
                                src={URL.createObjectURL(selectedFile)}
                                alt={selectedFile.name.substringAfterLast('.')}
                                width={100}
                                height={100}
                                className="h-full w-full rounded-md object-cover"
                                unoptimized
                              />
                            </AspectRatio>
                          </div>
                          <div className="flex w-full flex-col space-y-1">
                            <div className="text-base">{selectedFile.name}</div>
                            <div className="text-alt">
                              {`${
                                imageResolution || 'Loading...'
                              } • ${selectedFile.size.convertFileSize()}`}
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            className="text-alt"
                            size="xs"
                            type="button"
                            onClick={removeFile}
                          >
                            <XIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>
                  ) : null}
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                type="button"
                onClick={handleSubmit}
              >
                {t('SAVE_FORM', { form: t('IMAGE').toLowerCase() })}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

ImageMultiLangModal.displayName = 'MovieForm'

export default ImageMultiLangModal
