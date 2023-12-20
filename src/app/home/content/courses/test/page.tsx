'use client'

import { MDXProvider } from "@mdx-js/react";
import { ClassAttributes, HTMLAttributes, useEffect } from "react";
import { PAGES, MENU } from './setting '
import { useDispatch, useSelector } from "react-redux";
import { reduxUpdateLinkList } from "@/app/features/links/links";
import { RootState } from "@/app/store";
import { FabButton } from "@/app/home/components/FabButton/FabButton";
import { reduxUpdateSelectItem } from "@/app/features/selectItem/selectItem";
import { HeaderMegaMenu } from "@/app/home/components/HeaderMegaMenu/HeaderMegaMenu/HeaderMegaMenu";


/** @type {import('mdx/types.js').MDXComponents} */
const components = {
    em(props: JSX.IntrinsicAttributes & ClassAttributes<HTMLElement> & HTMLAttributes<HTMLElement>) {
        return <i {...props} />
    }
}

export default function Page() {
    const selectPage = useSelector((state: RootState) => state.selectItem.status)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(reduxUpdateLinkList(MENU));
        dispatch(reduxUpdateSelectItem(0))
    }, [dispatch]);
    const page = PAGES[selectPage];

    return (
        <MDXProvider components={components}>            
            {page}
            {/* <FabButton /> */}
        </MDXProvider>
    );
}












