import { DashboardHeader } from "../components/header/dashboard"
import Dashboard from "../components/section/dashboardSection"

export default function Page(){

    return (

        <>

            <DashboardHeader title="Dashboard" icon="bi-list"/>
            <Dashboard />

        </>

    )

}