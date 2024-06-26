"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "../../_components/ui/button";
import { Input } from "../../_components/ui/input";

import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/app/_components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation";


const formSchema = z.object({
    search: z.string({
        required_error: "Campo obrigatório."
    }).trim().min(1, "Campo obrigatório.")
})

interface SearchProps {
    defaultValues?: z.infer<typeof formSchema>
}

const Search = ({defaultValues}: SearchProps) => {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    })

    const handleSubmit = (data: z.infer<typeof formSchema>) => {
        router.push(`/barbershops?search=${data.search}`)
    }


    return (
        <div className="flex items-center gap-2">
            <Form {...form}>
                <form className="flex w-full gap-2 lg:w-[500px]" onSubmit={form.handleSubmit(handleSubmit)}>
                    <FormField
                        control={form.control}
                        name="search"
                        render={({ field }) => (
                            <FormItem className="w-full lg:my-3">
                                <FormControl>
                                    <Input placeholder="Busque por uma barbearia..." {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="w-10 h-8 lg:my-4 mt-1" variant="default" size="icon" type="submit">
                        <SearchIcon size={17} />
                    </Button>
                </form>

            </Form>
        </div>
    );
}


export default Search;