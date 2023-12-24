'use client'
import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ActionToggle } from "./components/ActionToggle/ActionToggle";
import { DoubleNavbar } from "./components/DoubleNavbar/DoubleNavbar/DoubleNavbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Provider } from 'react-redux'
import { store } from "../store";
import Logo from "./components/Logo/Logo";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {    
    const [opened, { toggle }] = useDisclosure();
    const [navbarOpened, { toggle: toggleNavbar }] = useDisclosure();
    const [asideOpened, { toggle: toggleAside }] = useDisclosure();

    return (
        <Provider store={store}>
            <AppShell
                header={{ height: 40 }}
                navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
                
                aside={{ width: 250, breakpoint: 'sm', collapsed: { mobile: !asideOpened } }}
                footer={{ height: 40 }}
            >
                <AppShell.Header>
                    <Group justify="space-between" h="100%">
                        <Group h="100%" px="md">
                            <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
                            <Logo />
                        </Group>
                        <Group h="100%" px="md">
                            {/* Resto de los elementos del grupo */}
                            <ActionToggle />
                            <Burger opened={asideOpened} onClick={toggleAside} hiddenFrom="md" size="sm" />
                        </Group>                       
                    </Group>
                </AppShell.Header>
                <AppShell.Navbar >
                    <DoubleNavbar onToggle={toggle} />
                </AppShell.Navbar>
                <AppShell.Main>
                    {children}
                </AppShell.Main>
                <AppShell.Aside p={'sm'}>
                    <Sidebar onToggle={toggleAside} />
                </AppShell.Aside>
                <AppShell.Footer >

                </AppShell.Footer>
            </AppShell>
        </Provider>
    )
}