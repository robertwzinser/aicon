import { type NextPage } from "next";
import Head from "next/head";
import { Input } from "~/component/Input";
import { FormGroup } from "~/component/FormGroup";
import { useState } from "react";
import { api } from "~/utils/api";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "~/component/Button";

const GeneratePage: NextPage = () => {

    const [form, setForm] = useState({
        prompt: "",
    });

    const generateIcon = api.generate.generateIcon.useMutation({
        onSuccess(data) {
            console.log('mutation finished', data)
        }
    })

    function handleFormSubmit(e: React.FormEvent) {
        e.preventDefault();
        // TODO: submit the form data to the backend
        generateIcon.mutate({
            prompt: form.prompt,
        })
    }

    function updateForm(key: string) {
        return function (e: React.ChangeEvent<HTMLInputElement>) {
            setForm((prev) => ({
                ...prev,
                [key]: e.target.value,
            }));
        };
    }

    const session = useSession();
    
    const isLoggedIn = !!session.data;

    return (
        <>
            <Head>
                <title>AIcon</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex min-h-screen flex-col items-center justify-center">
                {!isLoggedIn && 
                <Button 
                    onClick={() => {
                        signIn().catch(console.error);
                    }}
                    >Login</Button>
                }
                {isLoggedIn && 
                <Button 
                    onClick={() => {
                        signOut().catch(console.error);
                    }}
                    >Log Out</Button>
                }
                <form className="flex flex-col gap-4"
                    onSubmit={handleFormSubmit}
                >
                    <FormGroup>
                        <label>Prompt</label>
                        <Input
                            value={form.prompt}
                            onChange={updateForm("prompt")}
                        ></Input>
                    </FormGroup>
                    <Button>Submit</Button>
                </form>
            </main>
        </>
    );
};

export default GeneratePage;