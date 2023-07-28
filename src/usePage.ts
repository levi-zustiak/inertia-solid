import { Page, PageProps } from '@inertiajs/core'
import { useContext } from 'solid-js'
import PageContext from './PageContext'

export function usePage<TPageProps extends PageProps = PageProps>(): Page<TPageProps> {
    const page = useContext(PageContext)

    // if (!page) {
    //     throw new Error('usePage must be used within the Inertia component.')
    // }

    return page as Page<TPageProps>;
}