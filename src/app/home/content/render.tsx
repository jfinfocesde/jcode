'use client'

import { MDXProvider } from "@mdx-js/react";
import { ClassAttributes, HTMLAttributes, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { ActionIcon, Group, Paper, Tooltip } from "@mantine/core";
import { Text } from '@mantine/core';
import { useViewportSize } from "@mantine/hooks";
import classes from './render.module.css';
import { IconCaretUpFilled } from "@tabler/icons-react";
import { reduxSetLeftSidebarLink, typeLeftSidebarLink } from "@/app/features/leftSidebarLink/leftSidebarLink";
import { reduxSetSelectLink } from "@/app/features/selectLink/selectLink";
import { Database } from "@/types/supabase/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePathname } from "next/navigation";

type typeCourses = Database['public']['Tables']['courses']['Row']
type typeUserGroup = Database['public']['Tables']['user_group']['Row']
type typeGroupCourse = Database['public']['Tables']['group_course']['Row']

/** @type {import('mdx/types.js').MDXComponents} */
const components = {
    em(props: JSX.IntrinsicAttributes & ClassAttributes<HTMLElement> & HTMLAttributes<HTMLElement>) {
        return <i {...props} />
    }
}

export default function RenderMdx({ PAGES }: { PAGES: JSX.Element[] }) {
    // export default function RenderMdx({ PAGES, MENU }: { PAGES: JSX.Element[], MENU: typeLeftSidebarLink }) {

    const supabase = createClientComponentClient<Database>()
    const currentsession = useSelector((state: RootState) => state.Session.currentSession)
    const user = currentsession?.user

    const path = usePathname()
    const segments = path.split('/');
    const lastSegment = segments[segments.length - 1];
    const [nameCourse, setNameCourse] = useState('')

    useEffect(() => {

        function isValidDate(date: string) {
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            const givenDate = new Date(date);
            givenDate.setHours(0, 0, 0, 0);
            if (givenDate <= currentDate) {
                return true;
            } else {
                return false;
            }
        }


        // async function getCourse() {
        //     if (user) {
        //         try {
        //             let { data: courses, error } = await supabase
        //                 .from('courses')
        //                 .select("*")
        //                 .eq("folder_name", lastSegment)
        //             if (error) throw error;
        //             if (courses && courses.length > 0) {
        //                 // console.log(groups);
        //                 const tempGroups = JSON.stringify(groups)
        //                 const jsonGroups = JSON.parse(tempGroups)
        //                 let { data: courses, error } = await supabase
        //                     .from('group_course')
        //                     .select(`*,courses(*)`)
        //                     .eq('group_id', jsonGroups[0].groups.id)
        //                     .eq('user_id', user.id)
        //                 if (error) throw error;
        //                 if (courses && courses.length > 0) {
        //                     const tempCourses = JSON.stringify(courses)
        //                     const jsonCourses = JSON.parse(tempCourses)
        //                     console.log(jsonCourses);


        //                 }
        //             }
        //         } catch (error) {

        //         }
        //     }
        // }



        async function getCourse() {
            if (user) {
                try {
                    let { data: courses, error } = await supabase
                        .from('courses')
                        .select("*")
                        .eq("folder_name", lastSegment)
                    if (error) throw error;
                    if (courses && courses.length > 0) {
                        const dataCourses: typeCourses[] = courses

                        let { data: user_group, error } = await supabase
                            .from('user_group')
                            .select("*")
                            .eq("user_id", user.id)
                        if (error) throw error;
                        if (user_group && user_group.length > 0) {
                            const dataUserGroup: typeUserGroup[] = user_group
                            if (dataUserGroup[0].group_id) {
                                let { data: group_course, error } = await supabase
                                    .from('group_course')
                                    .select("*")
                                    .eq("group_id", dataUserGroup[0].group_id)
                                    .eq("course_id", dataCourses[0].id)
                                if (error) throw error;
                                if (group_course && group_course.length > 0) {
                                    const dataGroupCourse: typeGroupCourse[] = group_course
                                    console.log(dataGroupCourse);


                                    if (dataCourses[0].name && dataCourses[0].sessions && dataGroupCourse[0].sessions_date) {
                                       
                                        const nameCourse = dataCourses[0].name
                                        const check_date = dataGroupCourse[0].check_date
                                        const sessions = JSON.parse(dataCourses[0].sessions)
                                        const sessions_date: string[] = JSON.parse(dataGroupCourse[0].sessions_date)
                                        setNameCourse(nameCourse)
                                        if (check_date) {
                                            let dataMenu: string[] = []
                                            for (let index = 0; index < sessions.length; index++) {
                                                const testDate = sessions_date[index]
                                                const res = isValidDate(testDate)
                                                if (res) {
                                                    dataMenu.push(sessions[index])
                                                    console.log(sessions[index]);
                                                }
                                            }
                                            const MENU: typeLeftSidebarLink = {
                                                name: nameCourse,
                                                links: dataMenu
                                            }
                                            dispatch(reduxSetLeftSidebarLink(MENU));
                                            dispatch(reduxSetSelectLink(0))
                                        }
                                        else {
                                            const MENU: typeLeftSidebarLink = {
                                                name: nameCourse,
                                                links: JSON.parse(dataCourses[0].sessions)
                                            }
                                            dispatch(reduxSetLeftSidebarLink(MENU));
                                            dispatch(reduxSetSelectLink(0))
                                        }
                                    }

                                }
                            }

                        }

                    }
                } catch (error) {

                }
            }
        }



        // async function getMenu() {
        //     if (user) {
        //         try {
        //             let { data: courses, error } = await supabase
        //                 .from('courses')
        //                 .select("*")
        //                 .eq("folder_name", lastSegment)
        //             if (error) throw error;
        //             if (courses && courses.length > 0) {
        //                 const dataCourses: typeCourses[] = courses
        //                 if (dataCourses[0].name && dataCourses[0].sessions) {
        //                     let { data: data, error } = await supabase
        //                         .from('user_courses')
        //                         .select(`*,courses(*)`)
        //                         .eq("profile_id", user.id)
        //                         .eq("course_id", dataCourses[0].id)
        //                     if (error) throw error;
        //                     if (data && data.length > 0) {
        //                         const temp: typeJoin[] = data
        //                         const jsonData = temp[0]
        //                         if (jsonData.courses?.name && jsonData.courses?.sessions) {
        //                             setNameCourse(jsonData.courses?.name)
        //                             if (jsonData.check_date) {
        //                                 let dataMenu: string[] = []
        //                                 if (jsonData.sessions_date) {
        //                                     const sessions: string[] = JSON.parse(jsonData.courses?.sessions)
        //                                     const sessions_date: string[] = JSON.parse(jsonData.sessions_date)
        //                                     for (let index = 0; index < sessions.length; index++) {
        //                                         const testDate = sessions_date[index]
        //                                         const res = isValidDate(testDate)
        //                                         if (res) {
        //                                             dataMenu.push(sessions[index])
        //                                             console.log(sessions[index]);
        //                                         }
        //                                     }
        //                                 }
        //                                 const MENU: typeLeftSidebarLink = {
        //                                     name: jsonData.courses?.name,
        //                                     links: dataMenu
        //                                 }
        //                                 dispatch(reduxSetLeftSidebarLink(MENU));
        //                                 dispatch(reduxSetSelectLink(0))
        //                             }
        //                             else {
        //                                 const MENU: typeLeftSidebarLink = {
        //                                     name: jsonData.courses?.name,
        //                                     links: JSON.parse(jsonData.courses?.sessions)
        //                                 }
        //                                 dispatch(reduxSetLeftSidebarLink(MENU));
        //                                 dispatch(reduxSetSelectLink(0))
        //                             }
        //                         }
        //                     }
        //                 }
        //             }
        //         } catch (error) {

        //         }
        //     }
        // }
        getCourse();
    }, [])


    const selectPage = useSelector((state: RootState) => state.SelectLink.value)
    const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(reduxSetLeftSidebarLink(MENU));
    //     dispatch(reduxSetSelectLink(0))
    // }, [dispatch]);
    const page = PAGES[selectPage];
    const { width } = useViewportSize();

    const scrollToTop = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        window.scrollTo(0, 0);
    };

    return (
        <MDXProvider components={components}>
            <Paper w={{ base: '100%', md: `${width - 564}px` }} className={classes.toolBar} >
                {/* Tus elementos de navegación van aquí */}
                <Group justify="space-between" h="100%">
                    <Group justify="center" ml={'lg'}>
                        <Text size="md" fw={700} variant="gradient"
                            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                            style={{ maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {nameCourse}
                        </Text>
                    </Group>
                    <Group justify="flex-end" pr={'md'}>
                        <Tooltip
                            label={"Ir al inicio"}
                            position="right"
                            withArrow
                            transitionProps={{ duration: 0 }}
                        >
                            <ActionIcon
                                size="sm"
                                radius="sm"
                                variant="default"
                                color="blue"
                                onClick={scrollToTop}
                            // style={{ position: 'fixed', top: '80px', right: '280px', zIndex: 200 }}
                            >
                                <IconCaretUpFilled size={12} />
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                </Group>
            </Paper>
            <Paper pl={'md'} pr={'md'} pb={'md'} pt={'xl'}>
                {page}
            </Paper>
        </MDXProvider>
    );
}












