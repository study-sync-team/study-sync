"use client"
import DesktopWarning from "@/app/components/section/desktopWarning"
import { useMediaQuery } from 'react-responsive'
import WaitlistSection from "@/app/components/section/waitlistSection"

export default function Page() {

    const Desktop = ({ children }) => {
        const isDesktop = useMediaQuery({ minWidth: 992 })
        return isDesktop ? children : null
    }

    const Mobile = ({ children }) => {
        const isMobile = useMediaQuery({ maxWidth: 767 })
        return isMobile ? children : null
    }

    return (

        <>
            <Desktop>
                <DesktopWarning />
            </Desktop>
            <Mobile>
                <WaitlistSection />
            </Mobile>


        </>

    )

}