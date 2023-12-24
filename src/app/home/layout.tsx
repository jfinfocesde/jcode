'use client'
import { AppShell, Burger, Button, Group } from "@mantine/core";
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
   
    const [navbarOpened, { toggle: toggleNavbar }] = useDisclosure();
    const [asideOpened, { toggle: toggleAside }] = useDisclosure();  
    
    const handleToggle = () => {
        toggleNavbar();
      };

    return (
        <Provider store={store}>
            <AppShell
                header={{ height: 60 }}
                navbar={{ width: 300, breakpoint: 'md', collapsed: { mobile: !navbarOpened } }}
                
                aside={{ width: 250, breakpoint: 'md', collapsed: { mobile: !asideOpened } }}
                footer={{ height: 40 }}
            >
                <AppShell.Header>
                    <Group justify="space-between" h="100%">
                        <Group h="100%" px="md">
                            <Button onClick={handleToggle}>Toggle</Button>
                            <Burger opened={navbarOpened} onClick={(event)=>{
                                event.preventDefault()
                                toggleNavbar()
                            }} hiddenFrom="md" size="md" />
                            <Logo />
                        </Group>
                        <Group h="100%" px="md">
                            {/* Resto de los elementos del grupo */}
                            <ActionToggle />
                            <Burger opened={asideOpened} onClick={(event)=>{
                                event.preventDefault()
                                toggleAside()
                            }} hiddenFrom="md" size="md" />
                        </Group>                       
                    </Group>
                </AppShell.Header>
                <AppShell.Navbar >
                    <h1>navbar</h1>
                    {/* <DoubleNavbar /> */}
                </AppShell.Navbar>
                <AppShell.Main>
                    {children}
                </AppShell.Main>
                <AppShell.Aside p={'sm'}>
                <h1>aside</h1>
                    {/* <Sidebar onToggle={toggleAside} /> */}
                </AppShell.Aside>
                <AppShell.Footer >

                </AppShell.Footer>
            </AppShell>
        </Provider>
    )
}