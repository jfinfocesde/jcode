'use client'
import { AppShell, Burger, Center, Flex, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ActionToggle } from "./components/ActionToggle/ActionToggle";
import { DoubleNavbar } from "./components/DoubleNavbar/DoubleNavbar/DoubleNavbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Provider } from 'react-redux'
import { store } from "../store";
import Logo from "./components/Logo/Logo";
import { useState } from "react";


export default function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const [navbarOpened, { toggle: toggleNavbar }] = useDisclosure();
    const [asideOpened, { toggle: toggleAside }] = useDisclosure();
    const [aside, setAside] = useState(false)

    return (
        <Provider store={store}>
            {aside ? (
                <AppShell
                    header={{ height: 60 }}
                    navbar={{ width: 300, breakpoint: 'md', collapsed: { mobile: !navbarOpened } }}
                    aside={{ width: 250, breakpoint: 'md', collapsed: { mobile: !asideOpened } }}
                    footer={{ height: 40 }}
                >
                    <AppShell.Header>
                        <Group justify="space-between" h="100%">
                            <Group h="100%" px="sm">
                                <Burger opened={navbarOpened} onClick={(event) => {
                                    event.preventDefault()
                                    toggleNavbar()
                                }} hiddenFrom="md" size="sm" />
                                <Logo />
                            </Group>
                            <Group h="100%" px="sm">
                                {/* Resto de los elementos del grupo */}
                                <ActionToggle />
                                <Burger opened={asideOpened} onClick={(event) => {
                                    event.preventDefault()
                                    toggleAside()
                                }} hiddenFrom="md" size="sm" />
                            </Group>
                        </Group>
                    </AppShell.Header>
                    <AppShell.Navbar >
                        <DoubleNavbar onToggle={toggleNavbar} setAside={setAside} />
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
            ) : (
                <AppShell
                    header={{ height: 60 }}
                    navbar={{ width: 300, breakpoint: 'md', collapsed: { mobile: !navbarOpened } }}
                    footer={{ height: 40 }}
                >
                    <AppShell.Header>
                        <Group justify="space-between" h="100%">
                            <Group h="100%" px="sm">
                                <Burger opened={navbarOpened} onClick={(event) => {
                                    event.preventDefault()
                                    toggleNavbar()
                                }} hiddenFrom="md" size="sm" />
                                <Logo />
                            </Group>
                            <Group h="100%" px="sm">
                                {/* Resto de los elementos del grupo */}
                                <ActionToggle />
                                {/* <Burger opened={asideOpened} onClick={(event) => {
                                    event.preventDefault()
                                    toggleAside()
                                }} hiddenFrom="md" size="sm" /> */}
                            </Group>
                        </Group>
                    </AppShell.Header>
                    <AppShell.Navbar >
                        <DoubleNavbar onToggle={toggleNavbar} setAside={setAside} />
                    </AppShell.Navbar>
                    <AppShell.Main>
                        {children}
                    </AppShell.Main>
                    <AppShell.Footer >
                        <Flex
                            mih={40}                           
                            gap="md"
                            justify="center"
                            align="center"
                            direction="row"
                            wrap="wrap"
                        >
                            <Text size="xs">&copy; 2024 JFVG V1.0</Text>
                        </Flex>
                    </AppShell.Footer>
                </AppShell>
            )}

        </Provider>
    )
}