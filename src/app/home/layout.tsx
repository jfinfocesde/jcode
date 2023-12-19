'use client'
import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ActionToggle } from "./components/ActionToggle/ActionToggle";
import { DoubleNavbar } from "./components/DoubleNavbar/DoubleNavbar/DoubleNavbar";
import { MantineLogo } from "@mantinex/mantine-logo";
import Sidebar from "./components/Sidebar/Sidebar";
import { Provider } from 'react-redux'
import { store } from "../store";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [opened, { toggle }] = useDisclosure();   

    return (
        <Provider store={store}>           
                <AppShell
                    header={{ height: 60 }}
                    navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
                    padding="md"
                    aside={{ width: 250, breakpoint: 'sm', collapsed: { mobile: true } }}
                    footer={{ height: 60 }}
                >
                    <AppShell.Header>
                        <Group justify="space-between" h="100%">
                            <Group h="100%" px="md">
                                <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                                <MantineLogo size={30} />
                            </Group>
                            <Group visibleFrom="sm" m="sm">
                                <ActionToggle />
                            </Group>
                        </Group>
                    </AppShell.Header>
                    <AppShell.Navbar >
                        <DoubleNavbar />
                    </AppShell.Navbar>
                    <AppShell.Main>
                        {children}
                    </AppShell.Main>                   
                        <AppShell.Aside p={'sm'}>
                            <Sidebar />
                        </AppShell.Aside>                    
                    <AppShell.Footer >

                    </AppShell.Footer>
                </AppShell>          
        </Provider>
    )
}